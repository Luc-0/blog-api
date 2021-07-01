import React, { useState } from 'react';

export default function CommentForm({ handleNewComment, path }) {
  const [formInput, setFormInput] = useState({
    name: '',
    text: '',
  });

  const [hasInputError, setHasInputError] = useState({
    name: false,
    text: false,
  });

  const [isCreatingNewComment, setIsCreatingNewComment] = useState(false);
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Name
            <input
              name="name"
              type="text"
              value={formInput.name}
              onChange={handleInputChange}
            />
            {hasInputError.name ? (
              <small>Name must be in the range of 3-30 characters</small>
            ) : null}
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Comment
            <textarea
              name="text"
              value={formInput.text}
              onChange={handleInputChange}
            />
            {hasInputError.text ? (
              <small>Text must be in the range of 3-300 characters</small>
            ) : null}
          </label>
        </div>

        <div className="m2-y">
          {isCreatingNewComment ? (
            <div>Creating comment</div>
          ) : (
            <button type="submit">Send comment</button>
          )}
        </div>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!checkInput()) {
      return;
    }

    handleNewCommentRequest(path, formInput);
  }

  function checkInput() {
    const isValidName = isValidLength(formInput.name, 3, 30);
    const isValidText = isValidLength(formInput.text, 3, 300);

    if (!isValidName) {
      setInputError('name', true);
    } else {
      setInputError('name', false);
    }

    if (!isValidText) {
      setInputError('text', true);
    } else {
      setInputError('text', false);
    }

    return isValidName && isValidText;

    function isValidLength(str, min, max) {
      return str.length >= min && str.length <= max;
    }

    function setInputError(name, value) {
      setHasInputError((oldInputError) => ({
        ...oldInputError,
        [name]: value,
      }));
    }
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  function handleNewCommentRequest(path, commentInput) {
    if (isCreatingNewComment) {
      return;
    }
    setIsCreatingNewComment(true);

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const res = JSON.parse(this.responseText);

      if (res && res.code === 200) {
        handleNewComment(res.comment);
      }

      setIsCreatingNewComment(false);
    };
    xhr.open('POST', path, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(commentInput));
  }
}
