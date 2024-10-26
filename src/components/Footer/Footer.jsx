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
    <footer className="footer mt-auto bg-dark text-white">
      <div className="container-fluid py-4">
        <div className="row align-items-center">
          {/* Logo and Business Name on the Left */}
          <div className="col-md-6 d-flex align-items-center justify-content-md-start justify-content-center mb-2 mb-md-0">
            <img
              src="logo-2.png"
              alt="Vyvsai Logo"
              className="footer-logo me-3"
              style={{ maxHeight: "40px" }}
            />
            <div>
              <p
                className="mb-0"
                style={{ fontSize: "1.1rem", fontWeight: "bold" }}
              >
                MONOXOS VYVSAI OPC PVT LTD
              </p>
              <p
                className="mb-0"
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "#bbb",
                }}
              >
                Empowering tender notifications
              </p>
            </div>
          </div>

          {/* Copyright on the Right */}
          <div className="col-md-6 text-md-end text-center mb-2 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} vyvsai.com. All rights reserved.
            </p>
          </div>
        </div>

        {/* Links Section Centered Below */}
        <div className="row justify-content-center mt-3">
          <div className="col-12 text-center">
            <div className="d-flex flex-column flex-md-row justify-content-center">
              <a href="/terms-and-conditions" className="text-white mx-2 mb-2">
                Terms & Conditions
              </a>
              <a href="/privacy-policy" className="text-white mx-2 mb-2">
                Privacy Policy
              </a>
              <a href="/refund-policy" className="text-white mx-2 mb-2">
                Refund Policy
              </a>
              <a href="/contact" className="text-white mx-2 mb-2">
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
