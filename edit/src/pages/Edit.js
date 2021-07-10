import React, { useEffect, useState } from 'react';

import PostForm from '../components/PostForm';

export default function Edit({ location, history, updatePost, postsUpdate }) {
  const [post, setPost] = useState();

  useEffect(() => {
    if (location.state && location.state.post) {
      setPost(location.state.post);
    } else {
      history.push('/');
    }
  }, [location.state, history]);

  return (
    <div>
      {post ? (
        <PostForm getPostData={handlePostInput} post={post} />
      ) : (
        <div className="text-center">Loading</div>
      )}
    </div>
  );

  function handlePostInput(postInput) {
    updatePost(postInput, post, (updatedPost) => {
      if (!updatedPost) {
        return;
      }

      update(updatedPost);
      redirect(updatedPost);
    });
  }

  function update(updatedPost) {
    postsUpdate(updatedPost);
  }

  function redirect(updatedPost) {
    history.push(`/posts/${updatedPost._id}`, {
      post: updatedPost,
    });
  }
}
