import axios from 'axios';

let url = 'http://localhost:4000';

export function incrementViewCount(qid) {
    
    axios.post(
        `${url}/incrementViewCount`,
        qid,
        {withCredentials: true}
    )
};

export async function getQuestions() {
    return (await axios.get(`${url}/getQuestions`)).data.reverse().map(question => {return {...question, current_page: 1, current_comment_page: 1}});
};

export async function getAnswers() {
    return (await axios.get(`${url}/getAnswers`)).data.reverse().map(answer => {return {...answer, current_comment_page: 1}});
};

export async function getTags() {
    return (await axios.get(`${url}/getTags`)).data;
};

export async function getUser(id) {
    const user = (await axios.post(`${url}/getUser`, {_id: id}, {withCredentials: true})).data;
    if (user !== '') {
        user.email = '';
        user.password = '';
    }
    return user;
};

export async function postAnswer(answer, q_id, email) {
    const datetime = (await axios.post(
        `${url}/postAnswer`,
        { 
            answer,
            q_id,
            email
        },
        {withCredentials: true}
    )).data.ans_date_time;
    return datetime;
};

export async function postQuestion(question, tags_already_added, tags_to_be_added, _id) {
    const datetime = (await axios.post(
        `${url}/postQuestion`,
        {
            question,
            tags_already_added,
            tags_to_be_added,
            _id
        },
        {withCredentials: true}
    )).data.ask_date_time;
    return datetime;
};

export async function isUnique(email) {
    const isUnique = (await axios.post(
        `${url}/isUnique`,
        {
            email: email
        },
        {withCredentials: true}
    )).data;
    return isUnique;
};

export async function postUser(user) {
    await axios.post(
        `${url}/postUser`,
        user,
        {withCredentials: true}
    )
};

export async function verifyUser(email, password) {
    const user = (await axios.post(
        `${url}/verifyUser`,
        {
            email: email,
            password: password
        },
        {withCredentials: true}

    )).data;
    return user;
};

export async function pushQuestionUpdate(question, newname, tagid) {
    await axios.post(
        `localhost:8000/pushQuestionUpdate`,
        {
            question,
            newname,
            tagid
        },
        {withCredentials: true}
    )
};

export async function pushAnswerUpdate(id, newtext) {
    await axios.post(
        `${url}/pushAnswerUpdate`,
        {
            id,
            newtext
        },
        {withCredentials: true}
    )
};

export async function pushTagUpdate(tag) {
    await axios.post(
        `localhost:8000/pushTagUpdate`,
        tag,
        {withCredentials: true}
    );
};

export async function pushDeleteQuestion(qid, tid, uid) {
    await axios.post(
        `${url}/pushDeleteQuestion`,
        {
            qid: qid,
            tid: tid,
            uid: uid
        },
        {withCredentials: true}
    )
};

export async function pushDeleteAnswer(aid, uid) {
    await axios.post(
        `${url}/pushDeleteAnswer`,
        {
            aid: aid,
            uid: uid
        },
        {withCredentials: true}
    )
};

export async function pushDeleteTag(tid, uid) {
    await axios.post(
        `${url}/pushDeleteTag`,
        {
            tid: tid,
            uid: uid
        },
        {withCredentials: true}
    )
};

export async function pushRemoveTagFromQuestion(qid, tid, uid) {
    await axios.post(
        `${url}/pushRemoveTagFromQuestion`,
        {
            qid: qid,
            tid: tid,
            uid: uid
        },
        {withCredentials: true}
    )
};

export async function pushComment(text, id, user) {
    await axios.post(
        `${url}pushComment`,
        {
            text: text,
            id: id,
            user: user
        },
        {withCredentials: true}
    )
};

export async function voteOnContent(id, upvote, uid) {
    await axios.post(
        `${url}/vote`,
        {
            id: id,
            upvote: upvote,
            uid: uid
        },
        {withCredentials: true}
    )
}

export async function pushLogout() {
    await axios.get(`${url}/logout`);
}

// import axios from 'axios';


// export async function incrementViewCount(qid) {
//     try {
//         await axios.post(
//             'http://localhost:8000/incrementViewCount',
//             qid,
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }  
// };

// export async function getQuestions() {
//     try {

//         return (await axios.get('http://localhost:8000/getQuestions')).data.reverse().map(question => {return {...question, current_page: 1}});
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function getAnswers() {
//     try {

//         return (await axios.get('http://localhost:8000/getAnswers')).data.reverse().map(answer => {return {...answer, current_page: 1}});
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function getTags() {
//     try {

//         return (await axios.get('http://localhost:8000/getTags')).data;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function getUser(id) {
//     try {

//         return (await axios.post('http://localhost:8000/getUser', {_id: id}, {withCredentials: true})).data;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function postAnswer(answer, q_id, email) {
//     try {

//         const datetime = (await axios.post(
//             'http://localhost:8000/postAnswer',
//             { 
//                 answer,
//                 q_id,
//                 email
//             },
//             {withCredentials: true}
//         )).data.ans_date_time;
//         return datetime;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function postQuestion(question, tags_already_added, tags_to_be_added, _id) {
//     try {

//         const datetime = (await axios.post(
//             'http://localhost:8000/postQuestion',
//             {
//                 question,
//                 tags_already_added,
//                 tags_to_be_added,
//                 _id
//             },
//             {withCredentials: true}
//         )).data.ask_date_time;
//         return datetime;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function isUnique(email) {
//     try {

//         const isUnique = (await axios.post(
//             'http://localhost:8000/isUnique',
//             {
//                 email: email
//             },
//             {withCredentials: true}
//         )).data;
//         return isUnique;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function postUser(user) {
//     try {

//         await axios.post(
//             'http://localhost:8000/postUser',
//             user,
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function verifyUser(email, password) {
//     try {

//         const user = (await axios.post(
//             'http://localhost:8000/verifyUser',
//             {
//                 email: email,
//                 password: password
//             },
//             {withCredentials: true}
    
//         )).data;
//         return user;
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushQuestionUpdate(question, newname, tagid) {
//     try {
//         await axios.post(
//             'http://localhost:8000/pushQuestionUpdate',
//             {
//                 question,
//                 newname,
//                 tagid
//             },
//             {withCredentials: true}
//         )

//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushAnswerUpdate(id, newtext) {
//     try {

//         await axios.post(
//             'http://localhost:8000/pushAnswerUpdate',
//             {
//                 id,
//                 newtext
//             },
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushTagUpdate(tag) {
//     try {

//         await axios.post(
//             'http://localhost:8000/pushTagUpdate',
//             tag,
//             {withCredentials: true}
//         );
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushDeleteQuestion(qid, tid, uid) {
//     try {

//         await axios.post(
//             'http://localhost:8000/pushDeleteQuestion',
//             {
//                 qid: qid,
//                 tid: tid,
//                 uid: uid
//             },
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushDeleteAnswer(aid, uid) {
//     try {

//         await axios.post(
//             'http://localhost:8000/pushDeleteAnswer',
//             {
//                 aid: aid,
//                 uid: uid
//             },
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushDeleteTag(tid, uid) {
//     try {
//         await axios.post(
//             'http://localhost:8000/pushDeleteTag',
//             {
//                 tid: tid,
//                 uid: uid
//             },
//             {withCredentials: true}
//         )

//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushRemoveTagFromQuestion(qid, tid, uid) {
//     try {
//         await axios.post(
//             'http://localhost:8000/pushRemoveTagFromQuestion',
//             {
//                 qid: qid,
//                 tid: tid,
//                 uid: uid
//             },
//             {withCredentials: true}
//         )

//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function pushComment(text, id, user) {
//     try {
//         await axios.post(
//             'http://localhost:8000/pushComment',
//             {
//                 text: text,
//                 id: id,
//                 user: user
//             },
//             {withCredentials: true}
//         )

//     }
//     catch (error) {
//         return error.response.status;
//     }
// };

// export async function voteOnContent(id, upvote, uid) {
//     try {

//         await axios.post(
//             'http://localhost:8000/vote',
//             {
//                 id: id,
//                 upvote: upvote,
//                 uid: uid
//             },
//             {withCredentials: true}
//         )
//     }
//     catch (error) {
//         return error.response.status;
//     }
// }

// export async function pushLogout() {
//     try {
//         await axios.get('http://localhost:8000/logout');

//     }
//     catch (error) {
//         return error.response.status;
//     }
// }

