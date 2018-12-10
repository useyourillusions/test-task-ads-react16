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
        await Advertisement.findOne({_id: req.body.adId});

    } catch (err) {
        return responseSender(res, 422, 'Advertisement not exist!');
    }

    const commentToSave = new Comment({
        text: req.body.text,
        adId: req.body.adId,
        userId: req.userId
    });

    try {
        await commentToSave.save();
        responseSender(res, 422, 'Your comment has been added!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = commentsHandlerPost;
