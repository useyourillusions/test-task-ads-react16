const responseSender = require('../../helpers/response-sender');
const Advertisement = require('../../database/models/Advertisement');
const Comment = require('../../database/models/Comment');
const User = require('../../database/models/User');

const commentsHandlerPost = async (req, res) => {

    if (
        !req.body.text ||
        !req.body.adId ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    try {
        const adToWriteComment = await Advertisement.findOne({_id: req.body.adId});

        if (!adToWriteComment) {
            throw new Error('Advertisement not exist!');
        }

    } catch (err) {
        return responseSender(res, 500, err.message);
    }

    const commentToSave = new Comment({
        text: req.body.text,
        adId: req.body.adId,
        userId: req.userId
    });

    try {
        const savedComment = await commentToSave.save();
        const author = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            photo: req.user.photo
        };

        responseSender(res, 200, 'Your comment has been added!', {
            _id: savedComment._id,
            text: savedComment.text,
            created: savedComment.created,
            author
        });

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = commentsHandlerPost;
