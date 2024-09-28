import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by checking the cookie
    const user = Cookies.get('UUID');
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('UUID');
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-3 border-primary-subtle fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/images/logo-2.png" alt="vyvsai" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/tenders">Tenders</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/upload-documents">Filing</Link>
            </li> */}
          </ul>
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout" onClick={handleLogout}>Log-Out</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/subscriptions">Subscriptions</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;