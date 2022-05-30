const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');

let Question = require('./models/questions');
let Tag = require('./models/tags');
let Answer = require('./models/answers');
let User = require('./models/users');
const { compare } = require('bcrypt');

const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'fake_so';

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const app = express();

const routes_requiring_login = [
    '/postQuestion',
    '/postAnswer',
    '/pushQuestionUpdate',
    '/pushAnswerUpdate',
    '/pushTagUpdate',
    '/pushDeleteQuestion',
    '/pushDeleteAnswer',
    '/pushDeleteTag',
    '/pushRemoveTagFromQuestion',
    '/pushComment',
    'vote'
]
const verifyDBConnection = (req, res, next) => {
    req.dbConnected = (mongoose.connection.readyState === 1);
    if (!req.dbConnected) {
        res.status(500);
        res.send('db error');
    }
    else {
        next();
    }
}
const verifyIdentiy = (req, res, next) => {
    req.loggedIn = (req.session && req.session.user);
    if (!req.loggedIn && routes_requiring_login.includes(req.path)) {
        res.status(401);
        res.send('session error');
    }
    else {
        next();
    }
        
}

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("/var/www/fake_stackoverflow/client"));
app.use(express.static("/var/www/fake_stackoverflow/client/build"));
app.use(verifyDBConnection);
app.use(
    session({
        secret: "secret to sign session cookie",
        cookie: {secure: false},
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: url})
    })
    )
app.use(verifyIdentiy);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


app.get('/', (req, res) => {
	res.sendFile("/var/www/fake_stackoverflow/client/build/index.html");
});

app.post('/postQuestion', async (req, res) => {
    console.log('pushQuestion');
    if (req.dbConnected && req.loggedIn) {
        console.log('user', req.session.user, 'id', req.session.id);

        const entry = new Question(req.body.question);
        const question = await entry.save();
        // add all the tags to the user which the user doesn't already have
        // get all of the tags of the question
        const all_tags = [...req.body.tags_already_added.map(tag => tag._id), ...req.body.tags_to_be_added.map(tag => tag._id)];
        // subtract tags which the user already has
        const user = await User.findById(req.body._id);
        // if the user tags includes the tag, get it out of the list
        const tags_to_add_to_user = all_tags.filter(tag => !user.tags.includes(tag));
        User.findByIdAndUpdate(req.body._id,
            {
                $push: {
                    questions: {
                        $each: [req.body.question._id],
                        $position: 0
                    },
                    tags: {
                        $each: tags_to_add_to_user
                    }
                }
            }).exec();
        for (let tag of req.body.tags_to_be_added)
            await new Tag(tag).save();
        res.send(question);
    }
    else {
        // res.status(500);
        // res.send({});
    }
});
app.post('/postAnswer', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        const entry = new Answer(req.body.answer);
        const answer = await entry.save();
        Question.findOneAndUpdate(
            {
                _id: req.body.q_id
            }, 
            {
                $push: {
                    answers: {
                        $each: [req.body.answer._id],
                        $position: 0
                    }
                }
            }).exec();
        // psst it's actually the ID
        User.findOneAndUpdate(
            {
                _id: req.body.email
            }, 
            {
                $push: {
                    answers: {
                        $each: [req.body.answer._id],
                        $position: 0
                    }
                }
            }).exec();
        res.send(answer);
    }
    else {
        res.status(500);
        res.send({});
    }
});
app.post('/incrementViewCount', (req, res) => {
    if (req.dbConnected) {
        const qid = Object.keys(req.body)[0];
        Question.findOneAndUpdate({_id: qid}, {$inc: {'views': 1}}).exec();
    }
})
app.get('/getQuestions', async (req, res) => {
    if (req.dbConnected) {
        res.send(await Question.find());
    }
    else {
        res.send([]);
    }
});
app.get('/getTags', async (req, res) => {
    if (req.dbConnected) {
        res.send(await Tag.find());
    }
    else {
        res.send([]);
    }
});
app.get('/getAnswers', async (req, res) => {
    if (req.dbConnected) {
        res.send(await Answer.find());
    }
    else {
        res.send([]);
    }
});
app.post('/getUser', async (req, res) => {
    if (req.dbConnected) {
        res.send(await User.findById(req.body._id));
    }
    else {
        res.send([]);
    }
});
app.post('/isUnique', async (req, res) => {
    if (req.dbConnected) {
        const users = await User.find({email: req.body.email});
        res.send(users.length === 0);
    }
    else {
        res.status(500);
        res.send(false)
    }
});
app.post('/postUser', async (req, res) => {
    if (req.dbConnected) {
        req.body.password = await bcrypt.hash(req.body.password, 6);
        const entry = new User(req.body);
        await entry.save();
    }
    else {
        res.status(500);
        res.send("request failed!");
    }
});
app.post('/verifyUser', async (req, res) => {
    if (req.dbConnected) {
        const users = await User.find({email: req.body.email});
        if (users.length === 0) {
            res.send({err: "User does not exist!", username: ""});
            return;
        }
        const user = users[0];
        const passwordsMatch = await compare(req.body.password, user.password);
        if (!passwordsMatch) {
            res.send({err: "Password does not match!", username: ""});
            return;
        }
        req.session.user = user._id;
        req.session.save(() => {
            res.send({err: '', user: user});
            })
        }
    else {
        res.status(500);
        res.send("network error!");
    }
});
app.get('/logout', async (req, res) => {
    if (req.dbConnected) {
        req.session.destroy(() => {
            res.send('');

        });
    }
})
app.post('/pushQuestionUpdate', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        if (req.body.tagid) {
            // if there is a tagId but was no change in tags, then don't push the question update. Related to Profile.js 
            // handler specifics
            if (req.body.newname === (await Tag.findById(req.body.tagid)).name) {
                res.send('');
                return;
            }
            // 1. create the new tag and save it
            const new_tid = 't' + Date.now() + Math.random();
            const newtag = {
                _id: new_tid,
                _uid: req.body.question._uid,
                name: req.body.newname
            }
            await new Tag(newtag).save();

            // 2. update the tag of the question
            const question = await Question.findById(req.body.question._id);
            const new_question_tags = question.tags.map(tag => (tag === req.body.tagid) ? new_tid : tag);
            Question.findOneAndUpdate({_id: req.body.question._id}, {tags: new_question_tags}).exec();
            
            // 3. remove the old tag from the user and add the new tag to the user
            const user = await User.findById(req.body.question._uid);
            let user_questions_with_old_tag = 0;
            for (let qid of user.questions) {
                const question = await Question.findById(qid);
                if (question.tags.includes(req.body.tagid)) {
                    user_questions_with_old_tag++;
                }
            }
            // if there are no other questions with the tag, remove that tag
            if (user_questions_with_old_tag === 0) {
                user.tags = user.tags.filter(tag => tag !== req.body.tagid);
            }
            user.tags.push(new_tid);
            // const new_user_tags = user.tags.filter(tag => tag !== tagid);
            // const new_user_tags = user.tags.map(tag => (tag === req.body._id) ? new_tid : tag);
            await User.findByIdAndUpdate(req.body.question._uid, {tags: user.tags});
        }

        await Question.findByIdAndUpdate(req.body.question._id, {
            title: req.body.question.title, 
            summary: req.body.question.summary, 
            text: req.body.question.text
        });

        res.send('');
    }
});
app.post('/pushAnswerUpdate', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        await Answer.findOneAndUpdate({_id: req.body.id}, {text: req.body.newtext})
        res.send('');
    }
});
app.post('/pushTagUpdate', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        // 1. create the new tag and save it
        const new_tid = 't' + Date.now() + Math.random();
        const newtag = {
            _id: new_tid,
            _uid: req.body._uid,
            name: req.body.name
        }
        await new Tag(newtag).save();
        // 2. update all of that user's questions with the new tid
        const user = await User.findById(req.body._uid);
        for (let qid of user.questions) {
            const question = await Question.findById(qid);
            // if the question has the old tag
            if (question.tags.includes(req.body._id)) {
                // replace old tid with new tid
                const newtags = question.tags.map(tag => (tag === req.body._id) ? new_tid : tag);
                Question.findOneAndUpdate({_id: qid}, {tags: newtags}).exec()
            }
        }
        // 3. remove the old tag from the user and add the new tag to the user
        const newtags = user.tags.map(tag => (tag === req.body._id) ? new_tid : tag);
        await User.findByIdAndUpdate(req.body._uid, {tags: newtags});
        res.send('');
    }
});
app.post('/pushDeleteQuestion', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        const question = await Question.findById(req.body.qid);
        // 1. remove from question document
        await Question.findByIdAndDelete(req.body.qid);
        // 2. remove tag from the user
        const user = await User.findById(req.body.uid);
        const questions = user.questions.filter(q => q !== req.body.qid);
        await User.findByIdAndUpdate(req.body.uid, {questions: questions});

        // 3. if any user tags now have 0 entries, remove those as well
        for (let tag of question.tags) {
            // constantly re-fetch user since we are constantly re-updating
            // would be better to avoid DB calls, but it's 10pm and I am tired..
            const user = await User.findById(req.body.uid);
            let tag_count = 0;
            // for each tag, check if it is in any of the users' questions
            for (let qid of user.questions) {
                const question = await Question.findById(qid);
                // if this question includes the tag
                if (question && question.tags.includes(tag)) {
                    tag_count++;
                }
            }
            // if the user no longer has any questions with the tag, remove the tag from the user
            if (tag_count == 0) {
                const tags = user.tags.filter(usertag => usertag != tag);
                await User.findByIdAndUpdate(req.body.uid, {tags: tags});
            }
        }
        // 4. for each answer of the question, get its user and delete the answer from that user
        for (let aid of question.answers) {
            const answer = await Answer.findById(aid);
            const answer_poster = await User.findById(answer._uid);
            answer_poster.answers = answer_poster.answers.filter(answer => answer !== aid);
            await User.findByIdAndUpdate(answer._uid, {answers: answer_poster.answers});
        }
        res.send('');
    }

});
app.post('/pushDeleteAnswer', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        // 1. remove from Answer document
        await Answer.findByIdAndDelete(req.body.aid);
        // 2. find the question that it is a part of and remove it
        const questions = await Question.find();
        for (let question of questions) {
            if (question.answers.includes(req.body.aid)) {
                const answers = question.answers.filter(answer => answer !== req.body.aid)
                await Question.findByIdAndUpdate(question._id, {answers: answers});
            }
        }
        const user = await User.findById(req.body.uid);
        user.answers = user.answers.filter(answer => answer !== req.body.aid);
        await User.findByIdAndUpdate(req.body.uid, {answers: user.answers});
        res.send('');

    }

});
app.post('/pushDeleteTag', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        const user = await User.findById(req.body.uid);
        const tags = user.tags.filter(tag => tag !== req.body.tid);
        await User.findByIdAndUpdate(req.body.uid, {tags: tags});

        for (let qid of user.questions) {
            const question = await Question.findById(qid);
            const q_tags = question.tags.filter(tag => tag !== req.body.tid);
            await Question.findByIdAndUpdate(qid, {tags: q_tags});
        }
        res.send('');
    }

});
app.post('/pushRemoveTagFromQuestion', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        const question = await Question.findById(req.body.qid);
        const tags = question.tags.filter(tag => tag !== req.body.tid);
        await Question.findByIdAndUpdate(req.body.qid, {tags: tags});

        const user = await User.findById(req.body.uid);
        let user_questions_with_old_tag = 0;
        for (let qid of user.questions) {
            // console.log(qid);
            const question = await Question.findById(qid);
            if (question.tags.includes(req.body.tid)) {
                user_questions_with_old_tag++;
            }
        }
        // if there are no other questions with the tag, remove that tag
        if (user_questions_with_old_tag === 0) {
            console.log('old tags', user.tags);
            const tags = user.tags.filter(tag => tag !== req.body.tid);
            console.log('new tags', tags);
            await User.findByIdAndUpdate(req.body.uid, {tags: tags});
        }
    }
    res.send('');
});
app.post('/pushComment', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        if (req.body.id[0] === 'q') {
            await Question.findByIdAndUpdate(req.body.id,
                {
                    $push: {
                        comments: {
                            $each: [{text: req.body.text, comment_by: req.body.user}],
                        }
                    }
                })
        }
        else if (req.body.id[0] === 'a') {
            await Answer.findByIdAndUpdate(req.body.id,
                {
                    $push: {
                        comments: {
                            $each: [{text: req.body.text, comment_by: req.body.user}],
                        }
                    }
                })
        }
        res.send('');
    }
});
app.post('/vote', async (req, res) => {
    if (req.dbConnected && req.loggedIn) {
        let increment = (req.body.upvote) ? 1 : -1;

        const user = await User.findById(req.body.uid);
        let already_present = false;
        for (let i = 0; i < user.voted_on.length; i++) {
            if (user.voted_on[i].id === req.body.id) {
                already_present = true;
                // undo what was done
                increment = (user.voted_on[i].upvote) ? increment - 1 : increment + 1;
                user.voted_on[i].upvote = req.body.upvote;
            }
        }
        if (!already_present) {
            user.voted_on.push({id: req.body.id, upvote: req.body.upvote})
        };
        await User.findByIdAndUpdate(req.body.uid, {voted_on: user.voted_on});

        if (req.body.id[0] === 'q') {
            const question = await Question.findById(req.body.id);
            await User.findByIdAndUpdate(question._uid,
                {$inc: {reputation: increment}})
            await Question.findByIdAndUpdate(req.body.id, 
                {$inc: {votes: increment}})
        }
    
        else if (req.body.id[0] === 'a') {
            const answer = await Answer.findById(req.body.id);
            await User.findByIdAndUpdate(answer._uid,
                {
                    $inc: {reputation: increment}
                })
            await Answer.findByIdAndUpdate(req.body.id, 
                {
                    $inc: {votes: increment}
                })
        }
        res.send('');
    }
})


process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('Server closed. Database instance disconnected');
    process.exit();
});

