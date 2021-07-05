import React, { useContext, useState } from 'react';

import AuthContext from '../AuthContext';
import { loginAlert } from '../helpers/auth';
import { updateComment } from '../helpers/api';
import { useParams } from 'react-router-dom';

export default function Comment({ comment }) {
  const auth = useContext(AuthContext);
  const params = useParams();

  const [input, setInput] = useState({
    name: comment.name,
    text: comment.text,
  });
  const [hasInputError, setHasInputError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div>
      {comment ? (
        <form className="m2-x comment" onSubmit={handleSubmit}>
          <div className="author">
            <label className="">
              Name
              <input
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
            </label>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
          </div>

          <textarea
            name="text"
            className="comment-text"
            value={input.text}
            onChange={handleInputChange}
          ></textarea>

          {hasInputError ? (
            <div>
              <ul>
                <li>Name must be in the range of 3-30 characters</li>
                <li>Text must be in the range of 3-300 characters</li>
              </ul>
            </div>
          ) : null}

          {isUpdating ? (
            <div>Updating...</div>
          ) : (
            <div>
              <button type="submit" className="btn m2-y">
                Update
              </button>
            </div>
          )}
        </form>
      ) : null}
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (loginAlert(auth)) {
      return;
    }

    if (!isValidInput()) {
      setHasInputError(true);
    } else {
      setHasInputError(false);
    }

    updateComment(
      auth.token,
      params.postId,
      { _id: comment._id, name: input.name, text: input.text },
      () => {
        setIsUpdating(false);
        return;
      }
    );
    setIsUpdating(true);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setInput({
      ...input,
      [name]: value,
    });
  }

  function isValidInput() {
    const isValidName = isValidLength(input.name, 3, 30);
    const isValidText = isValidLength(input.text, 3, 300);

    return isValidName && isValidText;

    function isValidLength(str, min, max) {
      return str.length >= min && str.length <= max;
    }
  }
}
