const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertisement'
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
