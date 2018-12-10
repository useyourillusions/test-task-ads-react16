const Ad = require('../../database/models/Advertisement');
const User = require('../../database/models/User');
const Comment = require('../../database/models/Comment');
const responseSender = require('../../helpers/response-sender');

const extendCommentsWithAuthor = comments =>
    comments.map(async item => {
        const commentJson = item.toJSON();

        try {
            const author = await User
                .findOne({_id: item.userId})
                .select('firstName lastName photo -_id');

            commentJson['author'] = author.toJSON();

        } catch (err) {
            commentJson['author'] = null;
        }

        delete commentJson['userId'];

        return commentJson;
    });


const adHandlerGet = async (req, res) => {

    if (req.query.id) {
        try {
            const ads = await Ad
                .findOne({_id: req.query.id})
                .select('-_id -userId -__v');

            const dataToSend = ads.toJSON();
            const relatedComments = await Comment
                .find({adId: req.query.id})
                .select('-adId -__v');

            dataToSend['comments'] = await Promise.all(
                extendCommentsWithAuthor(relatedComments)
            );

            res
                .status(200)
                .json(dataToSend);

        } catch (err) {
            responseSender(res, 404, 'Advertisement not found!');
        }

    } else {
        const dataToSend = await Ad
            .find()
            .select('-userId -__v');

            res
                .status(200)
                .json(dataToSend);
    }
};

module.exports = adHandlerGet;
