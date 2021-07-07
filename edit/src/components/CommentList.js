import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments, updateDeletedComment }) {
  return (
    <div className="m2-y">
      {comments && comments.length > 0 ? (
        <div>
          <h5>Comments:</h5>
          <div>
            {comments.map((comment) => (
              <Comment
                updateDeletedComment={updateDeletedComment}
                key={comment._id}
                comment={comment}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
