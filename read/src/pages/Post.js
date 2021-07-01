import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

export default function Post() {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    async function loadPost() {
      const fetchPost = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${params.postId}`
      ).then((res) => res.json());

      setPost(fetchPost.post);
    }

    if (location.state) {
      const locationPost = location.state.post;
      setPost(locationPost);
    } else {
      loadPost();
    }
  }, [location]);

  useEffect(() => {
    async function loadComments() {
      const fetchComments = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${params.postId}/comments`
      ).then((res) => res.json());

      setComments(fetchComments);
    }
    if (post) {
      loadComments();
    }
  }, [post]);

  return (
    <div>
      {post ? (
        <div className="post-page">
          <header>
            <h2>{post.title}</h2>
            <div className="author">
              <p>Author: {post.user.name}</p>
              <time>{new Date(post.timestamp).toLocaleString()}</time>
            </div>
          </header>

          <div>{post.text}</div>
          <CommentForm
            path={`${process.env.REACT_APP_API_URL}/posts/${params.postId}/comments`}
            handleNewComment={handleNewComment}
          />
          <div>{comments ? <CommentList comments={comments} /> : null}</div>
        </div>
      ) : (
        <div className="text-center">Loading</div>
      )}
    </div>
  );

  function handleNewComment(comment) {
    setComments([...comments, { ...comment }]);
  }
}
