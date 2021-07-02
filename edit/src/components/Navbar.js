import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="App-nav">
      <header className="App-header">
        <Link to="/">
          <h2>Edit - Blog API</h2>
        </Link>
      </header>

      <ul>
        <li>
          <Link to="/posts/new">New Post</Link>
        </li>
        <li>
          <Link to="/">Posts</Link>
        </li>
        <li>
          <Link to="/comments">Comments</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}