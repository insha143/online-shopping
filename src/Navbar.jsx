import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Create and link to a CSS file for custom styles
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="admin-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="">
            <img 
              src="/path-to-logo/logo.png" 
              alt="Logo" 
              className="logo" 
            />
            Admin Dashboard
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="stats">
                  STATIONARY
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="nbook">
                  NOTEBOOKS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="books">
                  BOOKS
                </Link>
              </li>
            </ul>

            {/* User Profile Icon */}
            <div className="user-profile ms-3">
              <FaUserCircle size={40} className="text-white" />
              <span className="text-white ms-2">
                <Link className='text-deceration-none' to="/admindis">
                Admin
                </Link>
                </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;