import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PostList from './components/PostList';
import PostPage from './pages/Post';
import { useEffect, useState } from 'react';
import './App.css';

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
          <Route exact path="/:postId" component={PostPage} />
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
