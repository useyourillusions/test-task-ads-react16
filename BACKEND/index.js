'use strict';

const mode = 'dev';
const env = require('./environment.json');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Post = require('./database/models/Comment');
const User = require('./database/models/User');

const app = express();

mongoose.connect(env[mode]['dbUri'] + env[mode]['dbName'], {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(
    () => {
        console.log('Connected!');

        /*const u = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Y.',
            lastName: 'A.',
            email: 'aaa',
            password: '123'
        });

        u.save(res => console.log(res));*/
    },
    err => {
        console.log(err.name);
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

/*Post.find({
    title: 'Title'
})
.then(post => post[0].author)
.then(authorId => User.findById(authorId))
.then(author => console.log(author));*/


//findByIdAndUpdate
//findByIdAndRemove
//findByIdAndDelete

app.use(express.static('_public'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extend: true }));

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

app.listen(env[mode].appPort, () => console.log(`Server started at port ${env[mode].appPort}`));
