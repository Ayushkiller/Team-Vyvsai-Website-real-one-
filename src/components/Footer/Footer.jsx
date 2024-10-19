import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-auto">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <p>
              &copy; {new Date().getFullYear()} vyvsai.com All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-right">
            <a href="/privacy-policy" className="text-white mx-1">Privacy Policy</a>
            <a href="/contact" className="text-white mx-1">Contact us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;