import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Layout from "../components/Layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import "../styles.css";
import AnimatedLoading from "./AnimatedLoading";

// Lazy-loaded components
const HomePage = lazy(() => import("../components/Home/Home"));
const Login = lazy(() => import("../components/Login/Login"));
const Register = lazy(() => import("../components/Login/Register"));
const PasswordReset = lazy(() => import("../components/Login/PasswordReset"));
const RequestOtp = lazy(() => import("../components/Login/RequestOtp"));
const VerifyOtp = lazy(() => import("../components/Login/VerifyOtp"));
const Subscriptions = lazy(() => import("../components/Subscriptions"));
const Mission = lazy(() => import("../components/Mission/Mission"));
const Services = lazy(() => import("../components/Services/ServicesSection"));
const CoreValues = lazy(() => import("../components/CoreValues/CoreValues"));
const Reviews = lazy(() => import("../components/Reviews"));
const PrivacyPolicy = lazy(() => import("../components/Policy/PrivacyPolicy"));
const UploadDocuments = lazy(() => import("../components/UploadDocuments"));
const ContactUs = lazy(() => import("../components/ContactUs/ContactUs"));
const ProtectedComponent = lazy(() => import("./ProtectedComponent"));
const Tenders =lazy(() => import("../components/Tender/Tenders"));
function App() {
  const [auth, setAuth] = useState(Cookies.get('auth') === 'true');

  useEffect(() => {
    Cookies.set('auth', auth);
  }, [auth]);

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove('auth');
  };

  return (
    <Router>
      <ErrorBoundary>
        <Layout auth={auth} handleLogout={handleLogout}>
          <Suspense fallback={<AnimatedLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login setAuth={setAuth} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/password-reset/request-otp" element={<RequestOtp />} />
              <Route path="/password-reset/verify-otp" element={<VerifyOtp />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/services" element={<Services />} />
              <Route path="/core-values" element={<CoreValues />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/upload-documents" element={<UploadDocuments />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/protected" element={<PrivateRoute auth={auth}><ProtectedComponent /></PrivateRoute>} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;