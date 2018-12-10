const mongoose = require('mongoose');
const responseSender = require('../../helpers/response-sender');
const Advertisement = require('../../database/models/Advertisement');
const Comment = require('../../database/models/Comment');

const commentsHandlerPost = async (req, res) => {

    if (
        !req.body.text ||
        !req.body.adId ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve lost something important...');
    }

    try {
        const adToWriteComment = await Advertisement.findOne({_id: req.body.adId});

        if (!adToWriteComment) {
            throw new Error('Advertisement not exist!');
        }

    } catch (err) {
        return responseSender(res, 500, err.message);
    }

    const _id = new mongoose.Types.ObjectId;
    const commentToSave = new Comment({
        _id,
        text: req.body.text,
        adId: req.body.adId,
        userId: req.userId
    });

    try {
        await commentToSave.save();
        responseSender(res, 200, 'Your comment has been added!', {_id, text: req.body.text});

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = commentsHandlerPost;
