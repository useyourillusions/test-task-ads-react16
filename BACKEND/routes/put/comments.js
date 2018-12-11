const Comment = require('../../database/models/Comment');
const responseSender = require('../../helpers/response-sender');

const commentsHandlerPut = async (req, res) => {

    if (
        !req.body.id ||
        !req.body.text ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    try {
        const editedComment = await Comment
            .findOneAndUpdate(
                { _id: req.body.id, userId: req.userId },
                { text: req.body.text }
            );

        if (!editedComment) {
            throw new Error('Comment were unchanged!');
        }

        responseSender(res, 200, 'Comment has been edited!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = commentsHandlerPut;
