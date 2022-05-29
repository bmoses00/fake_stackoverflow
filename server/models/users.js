const mongoose = require('mongoose');

let voteSchema = mongoose.Schema({
    id: {type: String, required: true},
    upvote: {type: Boolean, required: true}
});

let userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    reputation: {type: Number, default: 0},
    date_joined: {type: Date, default: Date.now},
    questions: {type: [String], default: []},
    answers: {type: [String], default: []},
    voted_on: {type: [voteSchema], default: []},
    tags: {type: [String], default: []},
});


module.exports =  mongoose.model('User', userSchema);