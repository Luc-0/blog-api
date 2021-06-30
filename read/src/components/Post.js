import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  return (
    <div className="post">
      {post ? (
        <article>
          <header>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
          </header>

          <div className="detail">
            <p>{new Date(post.timestamp).toLocaleDateString()}</p>
            <Link
              to={{
                pathname: `/${post._id}`,
                state: { post },
              }}
            >
              Read more
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
