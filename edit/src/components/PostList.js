import React from 'react';
import Post from './PostCard';

export default function PostList({ posts, postUpdate }) {
  return (
    <div>
      {posts
        ? posts.map((post) => (
            <Post postUpdate={postUpdate} key={post._id} post={post} />
          ))
        : null}
    </div>
  );
}
