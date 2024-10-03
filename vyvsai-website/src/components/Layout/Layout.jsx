import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children, auth, handleLogout }) => {
  return (
    <div className="d-flex flex-column vh-100 bg-primary-subtle">
      <Navbar auth={auth} handleLogout={handleLogout} />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;