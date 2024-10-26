import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../components/Layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import "../styles.css";

// Directly imported components
import HomePage from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import PasswordReset from "../components/Login/PasswordReset";
import RequestOtp from "../components/Login/RequestOtp";
import VerifyOtp from "../components/Login/VerifyOtp";
import Subscriptions from "../components/Subscriptions";
import Mission from "../components/Mission/Mission";
import Services from "../components/Services/ServicesSection";
import CoreValues from "../components/CoreValues/CoreValues";
import Reviews from "../components/Reviews";
import PrivacyPolicy from "../components/Policy/PrivacyPolicy";
import UploadDocuments from "../components/UploadDocuments";
import ContactUs from "../components/ContactUs/ContactUs";
import ProtectedComponent from "./ProtectedComponent";
import Tenders from "../components/Tender/Tenders";
import TenderDetail from "../components/Tender/TenderDetail";
import TenderResults from "../components/Tender/TenderResults";
import RefundPolicy from "../components/Policy/RefundPolicy";
import TermsAndConditions from "../components/Policy/TermsAndConditions";

function App() {
  const [auth, setAuth] = useState(Cookies.get("auth") === "true");

  useEffect(() => {
    Cookies.set("auth", auth);
  }, [auth]);

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove("auth");
  };

  return (
    <Router>
      <ErrorBoundary>
        <Layout auth={auth} handleLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route
              path="/password-reset/request-otp"
              element={<RequestOtp />}
            />
            <Route path="/password-reset/verify-otp" element={<VerifyOtp />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tender-results" element={<TenderResults />} />
            <Route path="/tender-detail" element={<TenderDetail />} />
            <Route path="/core-values" element={<CoreValues />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/upload-documents" element={<UploadDocuments />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/protected"
              element={
                <PrivateRoute auth={auth}>
                  <ProtectedComponent />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
