const Users = require('../database/models/User');
const responseSender = require('./response-sender');

const loginRequired = async (req, res, next) => {
    if (!req.userId) {
        return responseSender(res, 401, 'Authentication failed.')
    }

    const user = await Users.findOne({_id: req.userId});
    if (!user) {
        return responseSender(res, 422, 'User doesn\'t exist!');
    }

    next();
};

module.exports = loginRequired;