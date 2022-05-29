const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    text: {type: String, required: true},
    comment_by: {type: String, required: true}
});

let questionSchema = mongoose.Schema({
    _id: {type: String, required: true},
    _uid: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, default: ''},
    summary: {type: String, default: ''},
    tags: {type: [String], required: true},
    answers: {type: [String], default: []},
    comments: {type: [commentSchema], default: []},
    asked_by: {type: String, required: true},
    ask_date_time: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    votes: {type: Number, default: 0}
});

module.exports =  mongoose.model('Question', questionSchema);