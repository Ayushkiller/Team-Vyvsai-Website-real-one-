import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css"; 

const Layout = ({ children, auth, handleLogout }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar auth={auth} handleLogout={handleLogout} />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
