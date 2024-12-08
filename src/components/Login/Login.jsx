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
        "https://vvysaibackend.something.vyvsai.com/api/login",
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
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-container bg-white shadow-sm p-4 rounded w-50 w-md-50 w-lg-40">
        <h2 className="text-center text-primary mb-4">Login</h2>
        {submitStatus.error && (
          <p className="text-danger">{submitStatus.error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={submitStatus.isLoading}
          >
            {submitStatus.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/register" className="text-primary">
            Don't have an account? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
