const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
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
        ref: 'User',
        required: true
    }
});

const Advertisement = mongoose.model('Advertisement', AdvertisementSchema);

module.exports = Advertisement;
