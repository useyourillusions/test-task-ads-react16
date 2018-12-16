const isObjectIdValid = require('mongoose').Types.ObjectId.isValid;
const responseSender = require('./response-sender');
const User = require('../database/models/User');

const loginRequired = async (req, res, next) => {

    if (!req.userId || !isObjectIdValid(req.userId)) {
        return responseSender(res, 401, 'Authentication failed.')
    }

    try {
        const user = await User.findOne({_id: req.userId});

        if (!user) {
            return responseSender(res, 422, 'User doesn\'t exist!');
        }

        req['user'] = user.toJSON();

    } catch (err) {
        return responseSender(res, 500, err.message);
    }

    next();
};

module.exports = loginRequired;
