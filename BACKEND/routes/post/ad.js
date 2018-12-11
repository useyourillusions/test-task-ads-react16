const responseSender = require('../../helpers/response-sender');
const Advertisement = require('../../database/models/Advertisement');

const adHandlerPost = async (req, res) => {

    if (
        !req.body.title ||
        !req.body.text ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const adToSave = new Advertisement({
        title: req.body.title,
        text: req.body.text,
        userId: req.userId
    });

    try {
        const savedAd = await adToSave.save();

        responseSender(res, 200, 'Advertisement has been created!', {
            _id: savedAd._id,
            title: savedAd.title,
            text: savedAd.text,
            img: savedAd.img,
            created: savedAd.created
        });

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = adHandlerPost;
