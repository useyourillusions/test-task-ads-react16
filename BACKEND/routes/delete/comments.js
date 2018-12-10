const Comment = require('../../database/models/Comment');
const responseSender = require('../../helpers/response-sender');
const mongoose = require('mongoose');

const commentsHandlerDelete = async (req, res) => {

    if (!req.query.id || !req.userId) {
        return responseSender(res, 422, 'You\'ve lost something important...');
    }

    try {
        const deletedComment = await Comment
            .findOneAndRemove({_id: req.query.id, userId: req.userId});

        if (!deletedComment) {
            throw new Error('Comment hasn\'t been deleted!');
        }

        responseSender(res, 200, 'Comment has been deleted!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = commentsHandlerDelete;
