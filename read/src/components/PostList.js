import React from 'react';
import Post from './Post';

export default function PostList({ posts }) {
  return (
    <div>
      {posts ? posts.map((post) => <Post key={post._id} post={post} />) : null}
    </div>
  );
}
