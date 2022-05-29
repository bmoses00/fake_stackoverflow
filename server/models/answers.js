const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    text: {type: String, required: true},
    comment_by: {type: String, required: true}
});

let answerSchema = mongoose.Schema({
    _id: {type: String, required: true},
    _uid: {type: String, required: true},
    text: {type: String, required: true},
    comments: {type: [commentSchema], default: []},
    ans_by: {type: String, required: true},
    ans_date_time: {type: Date, default: Date.now},
    votes: {type: Number, default: 0}
});


module.exports =  mongoose.model('Answer', answerSchema);