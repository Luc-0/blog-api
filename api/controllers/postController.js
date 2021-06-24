const middlewares = require('../middlewares');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getPosts = [
  middlewares.verifyToken,
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_JWT, (err) => {
      if (err) {
        Post.find({ status: 'public' }, (err, posts) => {
          if (err) {
            return next(err);
          }

          return res.json(posts);
        });
      } else {
        Post.find({}, (err, posts) => {
          if (err) {
            return next(err);
          }

          return res.json(posts);
        });
      }
    });
  },
];

exports.newPost = [
  ...postValidation(),
  (req, res, next) => {
    const newPost = new Post({
      ...req.postInput,
      user: req.authData.user[0]._id,
    });

    newPost.save((err) => {
      if (err) {
        return next(err);
      }

      res.json({
        code: 200,
        message: 'Post created',
        post: newPost,
      });
    });
  },
];

exports.updatePost = [
  middlewares.isValidIdFormat('postId'),
  ...postValidation(),
  (req, res, next) => {
    const inputPost = new Post({
      _id: req.params.postId,
      ...req.postInput,
    });

    Post.findByIdAndUpdate(
      req.params.postId,
      inputPost,
      {
        new: true,
        fields: {
          user: 0,
        },
      },
      (err, updatedPost) => {
        if (err) {
          return next(err);
        }

        if (!updatedPost) {
          return res.json({
            error: {
              code: 400,
              message: 'Invalid post id',
            },
          });
        }

        res.json({
          code: 200,
          message: 'Post updated',
          post: updatedPost,
        });
      }
    );
  },
];

function postValidation() {
  return [
    middlewares.verifyToken,
    middlewares.tokenFailRes,
    body('title').trim().escape().isLength({ min: 3, max: 50 }),
    body('text').trim().escape().isLength({ min: 3, max: 300 }),
    postFormCheck,
  ];
}

function postFormCheck(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_JWT, (err, authData) => {
    if (err) {
      return res.json({
        error: {
          code: 401,
          message: 'Invalid token',
        },
      });
    }

    const postInput = {
      title: req.body.title,
      text: req.body.text,
      status: req.body.status ? 'public' : 'private',
    };
    const hasErrors = !validationResult(req).isEmpty();

    if (hasErrors) {
      return res.json({
        error: {
          code: 400,
          message: 'Invalid form input',
          data: postInput,
        },
      });
    }

    req.authData = authData;
    req.postInput = postInput;
    next();
  });
}

exports.getPostById = [
  middlewares.isValidIdFormat('postId'),
  middlewares.verifyToken,
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_JWT, (tokenErr) => {
      Post.findById(req.params.postId)
        .populate('user', 'name')
        .exec((err, post) => {
          if (err) {
            return next(err);
          }
          if (!post) {
            return res.json({
              error: {
                code: 400,
                message: 'Invalid post id',
              },
            });
          }
          if (post.status == 'private' && tokenErr) {
            return res.sendStatus(403);
          }

          res.json({
            code: 200,
            post: post,
          });
        });
    });
  },
];

exports.deletePostById = [
  middlewares.isValidIdFormat('postId'),
  middlewares.verifyToken,
  middlewares.tokenFailRes,
  (req, res, next) => {
    Comment.deleteMany({ post: req.params.postId }, (err, postComments) => {
      if (err) {
        return next(err);
      }

      Post.findByIdAndRemove(req.params.postId, (err) => {
        if (err) {
          return next(err);
        }

        res.json({
          code: 200,
          message: 'Post and comments deleted.',
        });
      });
    });
  },
];
