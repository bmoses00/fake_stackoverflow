const mongoose = require('mongoose');

// virtual method?
let tagSchema = mongoose.Schema({
    _id: {type: String, required: true},
    _uid: {type: String, required: true},
    name: {type: String, required: true}
});

tagSchema.virtual('url').get(() => {
    return 'posts/answer/_id';
});

module.exports =  mongoose.model('Tag', tagSchema);