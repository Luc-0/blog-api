import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import PostList from './components/PostList';
import Login from './pages/Login';
import Post from './pages/Post';

import AuthContext from './AuthContext';

function App() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useState();

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (auth === null) {
      loadPosts();
    }
    if (!auth) {
      return;
    }
    loadPosts();
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      <div className="App">
        <Router>
          <Navbar signOut={signOut} />

          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <PostList postUpdate={postUpdate} posts={posts} />
              )}
            />
            <Route exact path="/comments" component="" />
            <Route exact path="/posts/new" component="" />
            <Route
              exact
              path="/login"
              component={() => <Login getAuth={getAuth} />}
            />
            <Route exact path="/posts/:postId" component={Post} />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );

  async function loadPosts() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/posts`;

    const postsData = await fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        Authorization: auth ? `Bearer ${auth.token}` : null,
      }),
    }).then((res) => res.json());
    setPosts(postsData);
  }

  function getAuth(authData) {
    setAuth(authData);
  }

  function signOut() {
    setAuth(null);
  }

  function postUpdate(updatedPost) {
    if (!updatedPost) {
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      }
      return post;
    });

    setPosts(updatedPosts);
  }
}

export default App;
