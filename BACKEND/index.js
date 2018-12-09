'use strict';

const env = require('./environment.json');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const checkForAuthToken = require('./helpers/check-for-auth-token');
const wrongRouteHandler = require('./helpers/wrong-route');

const registerHandlerPost = require('./routes/post/register');
const signInHandlerPost = require('./routes/post/sign-in');

const app = express();

mongoose.connect(env[env.mode]['dbUri'] + env[env.mode]['dbName'], {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(
    () => console.log('Connected!'),
    err => {
        console.log(err.name);
    }
);


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
app.use(checkForAuthToken);


// Registration route
app
    .route('/api/register')
    .post(registerHandlerPost);

// Authentication route
app
    .route('/api/sign-in')
    .post(signInHandlerPost);


app.use(wrongRouteHandler);
app.listen(env[env.mode]['appPort'], () => console.log(`Server started at port ${env[env.mode]['appPort']}`));
