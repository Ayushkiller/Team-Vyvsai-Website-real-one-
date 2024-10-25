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
        <div className="row justify-content-center">
          {/* Centered Copyright Text */}
          <div className="col-12 text-center mb-3">
            <p className="mb-0 border-bottom">
              &copy; {new Date().getFullYear()} vyvsai.com. All rights reserved.
            </p>
          </div>

          {/* Links Section */}
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
