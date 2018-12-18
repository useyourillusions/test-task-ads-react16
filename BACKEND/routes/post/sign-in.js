const jwt = require('jsonwebtoken');
const env = require('../../environment.json');
const Users = require('../../database/models/User');
const responseSender = require('../../helpers/response-sender');

const signInHandlerPost = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return responseSender(res, 422, 'You\'ve missed something important...');
    }

    const user = await Users.findOne({email: req.body.email});

    if (!user) {
        return responseSender(res, 401, 'Authentication failed. User not found!');
    }

    if (!user.comparePassword(req.body.password)) {
        return responseSender(res, 401, 'Authentication failed. Wrong password!');
    }

    const token = jwt.sign(
        { userId: user._id },
        env[env.mode]['jwtKey'],
        { expiresIn: '1h' }
    );

    responseSender(res, 200, 'Authentication succeeded!', {
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            photo: user.photo,
            email: user.email
        },
        token
    });
};

module.exports = signInHandlerPost;
