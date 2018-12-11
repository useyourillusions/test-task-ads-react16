const responseSender = require('../../helpers/response-sender');
const Advertisement = require('../../database/models/Advertisement');

const adHandlerPut = async (req, res) => {

    const dataToUpdate = {};

    if (
        !req.body.id ||
        !req.body.title ||
        !req.body.text ||
        !req.userId
    ) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    if (req.body.title.newValue) {
        dataToUpdate['title'] = req.body.title.newValue;
    }

    if (req.body.text.newValue) {
        dataToUpdate['text'] = req.body.text.newValue;
    }

    if (Object.keys(dataToUpdate).length) {
        try {
            await Advertisement
                .findOneAndUpdate({ _id: req.body.id }, dataToUpdate);
            responseSender(res, 200, 'Your advertisement has been edited!');

        } catch (err) {
            responseSender(res, 500, err.message);
        }

    } else {
        responseSender(res, 200, 'Nothing came — nothing changed...');
    }
};

module.exports = adHandlerPut;
