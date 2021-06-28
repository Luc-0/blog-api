const middlewares = require('../middlewares');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');
const Post = require('../models/post');

exports.getAllComments = [
  middlewares.isValidIdFormat('postId'),
  middlewares.verifyToken,
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_JWT, (jwtErr) => {
      Post.findById(req.params.postId, (postErr, post) => {
        if (postErr) {
          return next(postErr);
        }

        if (jwtErr) {
          if (post.status == 'private') {
            return res.sendStatus(403);
          }
        }

        Comment.find({ post: req.params.postId }, (err, comments) => {
          if (err) {
            return next(err);
          }
          return res.json(comments);
        });
      });
    });
  },
];

exports.newComment = [
  ...commentValidation(),
  (req, res, next) => {
    new Comment({
      name: req.body.name,
      text: req.body.text,
      post: req.params.postId,
    }).save((err, comment) => {
      if (err) {
        return next(err);
      }
      return res.json({
        code: 200,
        message: 'Comment created',
        comment: comment,
      });
    });
  },
];

function commentValidation() {
  return [
    middlewares.isValidIdFormat('postId'),
    body('name', 'Name should be in the range of 3-30 characters length.')
      .trim()
      .escape()
      .isLength({ min: 3, max: 30 }),
    body('text', 'Text should be in the range of 3-300 characters length.')
      .trim()
      .escape()
      .isLength({ min: 3, max: 300 }),
    handleInputError,
  ];

  function handleInputError(req, res, next) {
    const errorResult = validationResult(req);
    const hasErrors = !errorResult.isEmpty();

    if (hasErrors) {
      return res.json({
        code: 400,
        message: 'Invalid comment input',
        errors: errorResult.errors,
      });
    }

    next();
  }
}

exports.getComment = [
  middlewares.isValidIdFormat('postId'),
  middlewares.isValidIdFormat('commentId'),
  (req, res, next) => {
    Comment.findById(req.params.commentId, (err, comment) => {
      if (err) {
        return next(err);
      }

      if (!comment) {
        return res.json({
          message: 'Comment does not exist.',
        });
      }

      return res.json(comment);
    });
  },
];

exports.updateComment = [
  middlewares.isValidIdFormat('commentId'),
  middlewares.verifyToken,
  middlewares.tokenFailRes,
  ...commentValidation(),
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_JWT, (jwtErr) => {
      if (jwtErr) {
        return res.json({
          code: 401,
          message: 'Invalid token',
        });
      }

      const commentId = req.params.commentId;
      const updateComment = new Comment({
        name: req.body.name,
        text: req.body.text,
        _id: commentId,
      });

      Comment.findByIdAndUpdate(
        commentId,
        updateComment,
        { new: true },
        (err, updatedComment) => {
          if (err) {
            return next(err);
          }

          if (!updatedComment) {
            return res.json({
              message: 'Comment does not exist.',
            });
          }

          return res.json({
            code: 200,
            message: 'Comment updated',
            comment: updatedComment,
          });
        }
      );
    });
  },
];

exports.deleteComment = [
  middlewares.isValidIdFormat('commentId'),
  middlewares.verifyToken,
  middlewares.tokenFailRes,
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_JWT, (jwtErr) => {
      if (jwtErr) {
        return res.json({
          code: 401,
          message: 'Invalid token',
        });
      }

      Comment.findByIdAndDelete(req.params.commentId, (err, deletedComment) => {
        if (err) {
          return next(err);
        }

        if (!deletedComment) {
          return res.json({
            message: 'Comment does not exist.',
          });
        }

        return res.json({
          code: 200,
          message: 'Comment deleted',
          comment: deletedComment,
        });
      });
    });
  },
];
