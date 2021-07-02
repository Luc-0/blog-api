import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  return (
    <div className="Postcard">
      {post ? (
        <article>
          <header className="Postcard-header">
            <h3>{post.title}</h3>
            <button>Unpublish</button>
          </header>

          <p className="Postcard-text">{post.text}</p>

          <div className="Postcard-detail">
            <p>{new Date(post.timestamp).toLocaleDateString()}</p>
            <div>
              <Link
                to={{
                  pathname: `/posts/${post._id}/edit`,
                  state: {
                    post,
                  },
                }}
              >
                Edit
              </Link>
              <Link
                to={{
                  pathname: `/posts/${post._id}`,
                  state: { post },
                }}
              >
                Read more
              </Link>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}
