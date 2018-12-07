'use strict';

const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Post = require('./database/models/Comment'),
    User = require('./database/models/User'),
    bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/testDb', {
    useNewUrlParser: true
})
    .then(
        () => {
            console.log('Connected!');
        },
        fail => {
            console.log(fail);
    });



/*const u = new User({
    _id: mongoose.Types.ObjectId(),
    firstName: 'Y.',
    lastName: 'A.'
});

const p = new Post({
    _id: mongoose.Types.ObjectId(),
    title: 'Title',
    description: 'Description',
    content: 'lalala',
    author: u.id
});

u.save(() => {
   p.save();
});*/


/*Post.create({
    title: 'Title_1',
    description: 'Description_1',
    content: 'Content_1'
}, (error, data) => {
    //console.log(error, data);
});*/

Post.find({
    title: 'Title'
})
.then(post => post[0].author)
.then(authorId => User.findById(authorId))
.then(author => console.log(author));


//findByIdAndUpdate
//findByIdAndRemove
//findByIdAndDelete

app.use(express.static('_public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

app.get('/api/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    setTimeout(() => res.send('200'), 1000);
});

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.type('application/json');
    res.status(404);
    res.send({
        hasError: true,
        errorCode: 404,
        errorMessage: 'Resource not found...'
    });
});

app.listen(5000, () => {
    console.log('Server started at port 5000')
});
