import React, { useContext, useState } from 'react';

import AuthContext from '../AuthContext';
import { loginAlert } from '../helpers/auth';

export default function PostForm({ getPostData }) {
  const auth = useContext(AuthContext);
  const [postInput, setPostInput] = useState({
    title: '',
    text: '',
    status: 'private',
  });
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <form className="post-form form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Title
          <input
            name="title"
            value={postInput.title}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Title
          <textarea
            name="text"
            value={postInput.text}
            onChange={handleInputChange}
          ></textarea>
        </label>
      </div>

      <div className="form-group">
        <label>
          Public
          <input
            name="status"
            type="checkbox"
            checked={postInput.status == 'public' ? true : false}
            onChange={handleInputChange}
          />
        </label>
      </div>
      {isInvalidInput ? (
        <div>
          <ul>
            <li>Title must be in the range of 3-30 characters</li>
            <li>Text must be in the range of 3-300 characters</li>
          </ul>
        </div>
      ) : null}
      {isCreating ? (
        <div className="text-center">Creating post...</div>
      ) : (
        <button className="btn">Create new post</button>
      )}
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!validationCheck()) {
      setIsInvalidInput(true);
      return;
    }
    setIsInvalidInput(false);

    if (loginAlert(auth)) {
      return;
    }

    setIsCreating(true);
    getPostData(postInput);
  }

  function validationCheck() {
    const isValidTitle = isValidLength(postInput.title, 3, 50);
    const isValidText = isValidLength(postInput.text, 3, 300);
    const isValidStatus = ['public', 'private'].find(
      (status) => status === postInput.status
    );

    return isValidTitle && isValidText && isValidStatus;

    function isValidLength(str, min, max) {
      return str.length >= min && str.length <= max;
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'status' && e.target.type === 'checkbox') {
      const checked = e.target.checked;

      setPostInput({
        ...postInput,
        [name]: checked ? 'public' : 'private',
      });
      return;
    }

    setPostInput({
      ...postInput,
      [name]: value,
    });
  }
}
