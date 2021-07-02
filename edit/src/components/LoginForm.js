import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginForm({ getAuth, path }) {
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });
  const [isTrying, setIsTrying] = useState();
  const history = useHistory();

  return (
    <form className="Loginform form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formInput.username}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {isInvalidCredentials && !isTrying ? (
        <div className="form-group">
          <small className="form-error">Invalid credentials</small>
        </div>
      ) : null}

      {isTrying ? (
        <div className="text-center">Loggin in...</div>
      ) : (
        <button className="btn">Login</button>
      )}
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();

    login(formInput.username, formInput.password);
  }

  function login(username, password) {
    if (isTrying) {
      return;
    }
    setIsTrying(true);

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      const authRes = JSON.parse(this.responseText);

      console.log(authRes);
      if (authRes && !authRes.error) {
        getAuth(authRes);
        history.push('/');
        return;
      }

      setIsInvalidCredentials(true);
      setIsTrying(false);
    };
    xhr.open('POST', path, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(
      JSON.stringify({
        username,
        password,
      })
    );
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setFormInput({
      ...formInput,
      [name]: value,
    });
  }
}
