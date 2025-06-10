import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isAuthenticated, setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">NewsPortal</Link>
      <div className="nav-links">
        {isAuthenticated && (
          <>
            <Link to="/profile">Profile</Link>
            {userRole === 'admin' && <Link to="/create-news">Create News</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!isAuthenticated && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;