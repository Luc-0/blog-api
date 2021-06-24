#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var User = require('./models/user');
var Post = require('./models/post');
var Comment = require('./models/comment');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = [];
const posts = [];

function createUsers(cb) {
  console.log('Creating users...');
  async.parallel(
    [
      function (callback) {
        createUser('luc-0', 'nop', 'Lucas', callback);
      },
      function (callback) {
        createUser('lucas', '123', 'Luke', callback);
      },
      function (callback) {
        createUser('lucius', 'yes', 'Lucius', callback);
      },
    ],
    function (err, results) {
      if (err) {
        console.log('Error creating users: ' + err);
        cb(err, null);
        return;
      }
      console.log('Done creating users');
      cb(null, results);
    }
  );
}

function createUser(username, password, name, cb) {
  const newUser = new User({
    username: username,
    password: password,
    name: name,
  });

  newUser.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + newUser);
    users.push(newUser);
    cb(null, newUser);
  });
}

function createPosts(cb) {
  console.log('Creating posts...');
  async.parallel(
    [
      function (callback) {
        createPost(
          'First title',
          'this is the first text',
          users[0]._id,
          'private',
          callback
        );
      },
      function (callback) {
        createPost('Second title', 'Second', users[1]._id, 'private', callback);
      },
      function (callback) {
        createPost(
          'Third',
          "I'm the third I guess",
          users[2]._id,
          'private',
          callback
        );
      },
    ],
    function (err, results) {
      if (err) {
        console.log('Error creating posts: ' + err);
        cb(err, null);
        return;
      }
      console.log('Done creating posts.');
      cb(null, results);
    }
  );
}

function createPost(title, message, userId, status = 'private', cb) {
  const newPost = new Post({
    title: title,
    text: message,
    user: userId,
    status,
  });

  newPost.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Post: ' + newPost);
    posts.push(newPost);
    cb(null, newPost);
  });
}

function createComments(cb) {
  async.parallel(
    [
      function (callback) {
        createComment(posts[0]._id, 'Kenny', 'Cool', callback);
      },
      function (callback) {
        createComment(posts[1]._id, 'Nice123', 'Very nice', callback);
      },
      function (callback) {
        createComment(posts[2]._id, 'Nice', 'nice', callback);
      },
      function (callback) {
        createComment(posts[2]._id, 'Nice2', 'nice?', callback);
      },
    ],
    function (err, results) {
      if (err) {
        console.log('Error creating comments: ' + err);
        cb(err, null);
        return;
      }
      console.log('Done creating comments.');
      cb(null, results);
    }
  );
}

function createComment(postId, name, text, callback) {
  const newComment = new Comment({
    post: postId,
    name,
    text,
  });

  newComment.save(function (err) {
    if (err) {
      console.log('error creating comment');
      return callback(err, null);
    }

    console.log('New comment', newComment);
    return callback(null, newComment);
  });
}

async.series([createUsers, createPosts, createComments], function (err) {
  if (err) {
    console.log('Error populating database: ' + err);
    return;
  }
  console.log('Done populating database.');

  mongoose.connection.close();
});
