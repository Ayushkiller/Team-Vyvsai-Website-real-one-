import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import HomePage from "../components/Home/Home";
import PasswordReset from "../components/Login/PasswordReset";
import RequestOtp from "../components/Login/RequestOtp";
import VerifyOtp from "../components/Login/VerifyOtp";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Subscriptions from "../components/Subscriptions";
import Mission from "../components/Mission/Mission";
import Services from "../components/Services/ServicesSection";
import CoreValues from "../components/CoreValues/CoreValues";
import Reviews from "../components/Reviews";
import PrivacyPolicy from "../components/Policy/PrivacyPolicy";
import UploadDocuments from "../components/UploadDocuments";
import ContactUs from "../components/ContactUs/ContactUs";
import Animation from "./Animation";
import { isAuthenticated, logout } from "../services/authService";
import "../styles.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
    window.location.href = '/';
  };

  return (
    <Router>
      {loading ? (
        <Animation />
      ) : (
        <ErrorBoundary>
          <Layout>
            <nav>
              <Link to="/">Home</Link>
              {auth ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/request-otp" element={<RequestOtp />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/services" element={<Services />} />
              <Route path="/core-values" element={<CoreValues />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/upload-documents" element={<UploadDocuments />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </Layout>
        </ErrorBoundary>
      )}
    </Router>
  );
}

export default App;