import React, { useContext } from 'react';

import AuthContext from '../AuthContext';
import { loginAlert } from '../helpers/auth';
import { updatePost } from '../helpers/api';

export default function Publish({ post, postUpdate }) {
  const auth = useContext(AuthContext);

  return (
    <div>
      {post.status.toLowerCase() === 'public' ? (
        <button className="btn" onClick={unpublish}>
          Unpublish
        </button>
      ) : (
        <button className="btn" onClick={publish}>
          Publish
        </button>
      )}
    </div>
  );

  function publish() {
    if (loginAlert(auth) || !post) {
      return;
    }

    updatePost(auth.token, post, true, (updatedPost) => {
      if (updatedPost) {
        postUpdate(updatedPost);
        return;
      }

      return alert('Error to publish');
    });
  }

  function unpublish() {
    if (loginAlert(auth) || !post) {
      return;
    }

    updatePost(auth.token, post, false, (updatedPost) => {
      if (updatedPost) {
        postUpdate(updatedPost);
        return;
      }

      return alert('Error to unpublish');
    });
  }
}
