import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ auth, handleLogout }) => {
  const navigate = useNavigate();

  // Function to handle link clicks and collapse the off-canvas menu
  const handleLinkClick = () => {
    const offcanvasToggle = document.getElementById("offcanvasNavbar");
    if (offcanvasToggle) {
      offcanvasToggle.classList.remove("show");
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.classList.remove("show");
        backdrop.style.display = "none";
      }
    }
  };

  // Toggle the offcanvas menu
  const handleToggleClick = () => {
    const offcanvasToggle = document.getElementById("offcanvasNavbar");
    if (offcanvasToggle) {
      offcanvasToggle.classList.toggle("show");
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.classList.toggle("show");
        backdrop.style.display = backdrop.classList.contains("show")
          ? "block"
          : "none";
      }
    }
  };

  // Close the offcanvas if clicked outside
  const handleClickOutside = (event) => {
    const offcanvasToggle = document.getElementById("offcanvasNavbar");
    if (
      offcanvasToggle &&
      !offcanvasToggle.contains(event.target) &&
      !event.target.closest(".navbar-toggler")
    ) {
      handleLinkClick();
    }
  };

  // Use effect to add the click event listener on mount and clean up on unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="logo-2.png" alt="" className="logo" />
        </Link>
        <Link className="nav-link" to="/tender-file" onClick={handleLinkClick}>
          <i className="bi bi-file-earmark-check text-primary me-2"></i>
          <span>Tender File</span>
        </Link>
        {/* New External Link next to the logo */}

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleClick}
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Offcanvas for mobile screens */}
        <div
          className="offcanvas offcanvas-end custom-offcanvas"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          data-bs-backdrop="true"
          data-bs-keyboard="true"
        >
          <div className="offcanvas-header">
            {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Links
            </h5> */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleLinkClick}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-house-door-fill text-primary me-2"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/tenders"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-file-earmark-text-fill text-primary me-2"></i>
                  Tenders
                </Link>
              </li>
              {!auth && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={handleLinkClick}
                  >
                    <i className="bi bi-box-arrow-in-right text-primary me-2"></i>
                    Login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/subscriptions"
                  onClick={handleLinkClick}
                >
                  <i className="bi bi-credit-card-fill text-primary me-2"></i>
                  Subscriptions
                </Link>
              </li>
              {auth && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right text-primary me-2"></i>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
