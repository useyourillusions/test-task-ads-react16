const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    text: String,
    img: {
        type: String,
        default: 'https://dummyimage.com/600x400/000/00ffd5.png'
    },
    created: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Advertisement = mongoose.model('Comment', AdvertisementSchema);

module.exports = Advertisement;
