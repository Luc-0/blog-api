const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', postController.getPosts);
router.post('/', postController.newPost);

router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePostById);

router.get('/:postId/comments', commentController.getAllComments);
router.post('/:postId/comments', commentController.newComment);

router.get('/:postId/comments/:commentId', commentController.getComment);
router.put('/:postId/comments/:commentId', commentController.updateComment);
router.delete('/:postId/comments/:commentId', commentController.deleteComment);

module.exports = router;
