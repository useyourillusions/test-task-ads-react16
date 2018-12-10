const Users = require('../../database/models/User');
const responseSender = require('../../helpers/response-sender');

const registerHandlerPost = async (req, res) => {

    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
    ) {
        return responseSender(res, 422, 'You\'ve lost something important...');
    }

    const user = new Users(req.body);
    const isUserExist = await Users.findOne({email: req.body.email});

    if (isUserExist) {
        return responseSender(res, 409, 'Email is already registered!');
    }

    try {
        await user.save();
        responseSender(res, 200, 'User has been registered!');

    } catch (err) {
        responseSender(res, 500, err.message);
    }
};

module.exports = registerHandlerPost;
