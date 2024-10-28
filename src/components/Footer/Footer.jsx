import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className="footer d-block bg-dark text-white mt-auto">
      <div className="container-fluid py-3 px-4">
        <div
          className={`row align-items-center ${isMobile ? "text-center" : ""}`}
        >
          {/* Logo and Business Name */}
          <div className="col-md-6 d-flex align-items-center justify-content-center mb-2 mb-md-0">
            <img
              src="logo-2.png"
              alt="Vyvsai Logo"
              className="footer-logo me-2"
              style={{ maxHeight: "40px" }}
            />
            <div>
              <p className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>
                MONOXOS VYVSAI OPC PVT LTD
              </p>
              <p
                className="mb-0 text-muted"
                style={{ fontSize: "0.85rem", fontStyle: "italic" }}
              >
                Empowering tender notifications
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="col-md-6 text-md-end text-center mb-2 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} vyvsai.com. All rights reserved.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="row justify-content-center mt-2">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-center">
              <a href="/terms-and-conditions" className="text-white mx-2 my-1">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="text-white mx-2 my-1">
                Privacy Policy
              </a>
              <a href="/refund-policy" className="text-white mx-2 my-1">
                Refund Policy
              </a>
              <a href="/contact" className="text-white mx-2 my-1">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
