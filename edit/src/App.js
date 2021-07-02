import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" component={() => <PostList posts={posts} />} />
          <Route exact path="/comments" component="" />
          <Route exact path="/posts/new" component="" />
          <Route exact path="/login" component="" />
        </Switch>
      </Router>
    </div>
  );

  async function loadPosts() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/posts`;

    const postsData = await fetch(apiUrl).then((res) => res.json());
    setPosts(postsData);
  }
}

export default App;
