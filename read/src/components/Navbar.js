import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <header>
        <h2>Blog Api Project</h2>
      </header>
      <ul>
        <li>
          <Link to="/">Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
