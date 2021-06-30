import React from 'react';

export default function Comment({ comment }) {
  return (
    <div>
      {comment ? (
        <div className="m2-x comment">
          <div className="author">
            <p className="">Name: {comment.name}</p>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
          </div>

          <p>{comment.text}</p>
        </div>
      ) : null}
    </div>
  );
}
