import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ auth, handleLogout }) => {
  const navigate = useNavigate();

  const handleTendersClick = (e) => {
    if (!auth) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Vyvsai</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
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
            <Link className="nav-link" aria-current="page" to="/tenders" onClick={handleTendersClick}>Tenders</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/upload-documents">Filing</Link>
          </li> */}
        </ul>
        <ul className="navbar-nav ml-auto">
          {auth ? (
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
    </nav>
  );
};

export default Navbar;