import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';

export default function Post() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (location.state && location.state.post) {
      setPost(location.state.post);
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
          <div>
            {comments ? (
              <CommentList
                updateDeletedComment={updateDeletedComment}
                comments={comments}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="text-center">Loading</div>
      )}
    </div>
  );

  function updateDeletedComment(deletedComment) {
    if (!comments) {
      return;
    }
    const newComments = comments.filter(
      (comment) => comment._id !== deletedComment._id
    );

    setComments(newComments);
  }
}
