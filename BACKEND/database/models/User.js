const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    img: {
        type: String,
        default: 'https://dummyimage.com/300x300/000/ff7800.png'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
