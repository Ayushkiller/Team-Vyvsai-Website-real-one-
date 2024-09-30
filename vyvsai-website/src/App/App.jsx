// src/App/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import HomePage from "../components/Home/Home";
import TenderList from "../components/TenderList";
import TenderDetails from "../components/TenderDetails";
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
import "../styles.css";
import connect from "../Database/connect.js";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); 
    connect();
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Animation />
      ) : (
        <ErrorBoundary>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tenders" element={<TenderList />} />
              <Route path="/tenders/:id" element={<TenderDetails />} />
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
