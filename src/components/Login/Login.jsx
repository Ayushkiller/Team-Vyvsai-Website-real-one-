import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.css";

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ mobileNo: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState({
    error: "",
    isLoading: false,
  });
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ error: "", isLoading: true });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );

      if (response.data.success) {
        Cookies.set("auth", "true");
        setAuth(true);
        navigate("/");
      } else {
        setSubmitStatus({
          error:
            response.data.message ||
            "An unexpected error occurred during login",
          isLoading: false,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setSubmitStatus({
        error: "An error occurred during login. Please try again.",
        isLoading: false,
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        {submitStatus.error && <p className="error">{submitStatus.error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={submitStatus.isLoading}>
            {submitStatus.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default Login;
