const mongoose = require('mongoose');
const responseSender = require('../../helpers/response-sender');
const Advertisement = require('../../database/models/Advertisement');

const adHandlerPost = async (req, res) => {

    if (
        !req.body.title ||
        !req.body.text ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve lost something important...');
    }

    const _id = new mongoose.Types.ObjectId;
    const adToCreate = new Advertisement({
        _id,
        title: req.body.title,
        text: req.body.text,
        userId: req.userId
    });

    try {
        await adToCreate.save();
        responseSender(res, 200, 'Advertisement has been created!', {
            _id,
            title: req.body.title,
            text: req.body.text
        });

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = adHandlerPost;
