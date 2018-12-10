'use strict';

const env = require('./environment.json');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const checkForAuthToken = require('./helpers/check-for-auth-token');
const wrongRouteHandler = require('./helpers/wrong-route');
const loginRequired = require('./helpers/login-required');

const registerHandlerPost = require('./routes/post/register');
const signInHandlerPost = require('./routes/post/sign-in');

const adHandlerGet = require('./routes/get/ad');
const adHandlerPost = require('./routes/post/ad');
const adHandlerPut = require('./routes/put/ad');

const commentsHandlerPost = require('./routes/post/comments');
const commentsHandlerPut = require('./routes/put/comments');
const commentsHandlerDelete = require('./routes/delete/comments');

const app = express();

mongoose.connect(env[env.mode]['dbUri'] + env[env.mode]['dbName'], {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(
    () => console.log('Database connection established'),
    err => console.log(`Database connection error: ${err.name}`)
);


app.use(express.static('_public'));
app.use(bodyParser.json());
app.use(checkForAuthToken);


// Registration route
app.post('/api/register', registerHandlerPost);

// Authentication route
app.post('/api/sign-in', signInHandlerPost);

// Advertisement route
app
    .route('/api/ad')
    .get(adHandlerGet)
    .post(loginRequired, adHandlerPost)
    .put(loginRequired, adHandlerPut);

// Comments route
app
    .route('/api/comments')
    .post(loginRequired, commentsHandlerPost)
    .put(loginRequired, commentsHandlerPut)
    .delete(loginRequired, commentsHandlerDelete);


app.use(wrongRouteHandler);
app.listen(
    env[env.mode]['appPort'],
    () => console.log(`Server started at port ${env[env.mode]['appPort']}`)
);
