import React from 'react';

import LoginForm from '../components/LoginForm';

export default function Login({ getAuth }) {
  return (
    <div>
      <LoginForm
        getAuth={getAuth}
        path={`${process.env.REACT_APP_API_URL}/login`}
      />
    </div>
  );
}
