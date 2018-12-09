const Ads = require('../../database/models/Advertisement');
const Comments = require('../../database/models/Comment');
const Users = require('../../database/models/User');
const responseSender = require('../../helpers/response-sender');

const extendCommentsWithAuthor = (comments) =>
    comments.map(async item => {
        const commentJson = item.toJSON();

        try {
            const author = await Users
                .findOne({_id: item.userId})
                .select('firstName lastName photo');

            commentJson['author'] = author.toJSON();

        } catch(err) {
            commentJson['author'] = null;
        }

        return commentJson;
    });

const adHandlerGet = async (req, res) => {

    if (req.query.id) {
        try {
            const ads = await Ads
                .findOne({_id: req.query.id})
                .select('-_id -userId -__v');

            const dataToSend = ads.toJSON();
            const relatedComments = await Comments
                .find({adId: req.query.id})
                .select('-userId -adId');

            dataToSend['comments'] = extendCommentsWithAuthor(relatedComments);

            res
                .status(200)
                .json(dataToSend);

        } catch (err){
            responseSender(res, 404, 'Advertisement not found!');
        }

    } else {
        const dataToSend = await Ads
            .find({})
            .select('-_id -userId -__v');

            res
                .status(200)
                .json(dataToSend);
    }
};

module.exports = adHandlerGet;