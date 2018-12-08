'use strict';

const mode = 'dev';
const env = require('./environment.json');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const wrongRouteHandler = require('./routes/wrongRoute');
const registerHandlerPost = require('./routes/post/register');

const app = express();

mongoose.connect(env[mode]['dbUri'] + env[mode]['dbName'], {
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


// Registration route
app
    .route('/api/register')
    .post(registerHandlerPost);


app.use(wrongRouteHandler);
app.listen(env[mode]['appPort'], () => console.log(`Server started at port ${env[mode]['appPort']}`));
