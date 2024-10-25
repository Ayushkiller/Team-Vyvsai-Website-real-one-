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
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          {/* Copyright Text */}
          <div
            className={`col-12 col-md-6 ${
              isMobile ? "text-center" : "text-md-left"
            } mb-2 mb-md-0`}
          >
            <p className="mb-0">
              &copy; {new Date().getFullYear()} vyvsai.com. All rights reserved.
            </p>
          </div>

          {/* Links Section */}
          <div
            className={`col-12 col-md-6 ${
              isMobile ? "text-center" : "text-md-right"
            }`}
          >
            <div
              className={`d-flex ${
                isMobile ? "flex-column" : "flex-row"
              } justify-content-center justify-content-md-end`}
            >
              <a
                href="/privacy-policy"
                className="text-white mx-2 mb-2 mb-md-0"
              >
                Privacy Policy
              </a>
              <a href="/contact" className="text-white mx-2 mb-2 mb-md-0">
                Contact Us
              </a>
              <a href="/refund-policy" className="text-white mx-2 mb-2 mb-md-0">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
