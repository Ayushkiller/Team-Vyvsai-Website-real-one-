import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobileNo: "",
    email: "",
    password: "",
    preferences: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    error: "",
    success: false,
  });

  const validateForm = useCallback(() => {
    const newErrors = {};
    const { username, mobileNo, email, password, preferences } = formData;

    if (!username.trim()) newErrors.username = "Username is required.";
    if (!mobileNo.trim()) newErrors.mobileNo = "Contact number is required.";
    else if (!/^\d{10}$/.test(mobileNo))
      newErrors.mobileNo = "Contact number must be 10 digits.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!preferences)
      newErrors.preferences = "Select a notification preference.";

    return newErrors;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ error: "", success: false });

    try {
      await axios.post(
        "https://dbbackend.something.vyvsai.com/api/register",
        formData
      );
      setSubmitStatus({ error: "", success: true });
      setFormData({
        username: "",
        mobileNo: "",
        email: "",
        password: "",
        preferences: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setSubmitStatus({
        error: error.response?.data?.message || "Registration failed.",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                {/* Contact Number */}
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    className={`form-control ${
                      errors.mobileNo ? "is-invalid" : ""
                    }`}
                    value={formData.mobileNo}
                    onChange={handleChange}
                  />
                  {errors.mobileNo && (
                    <div className="invalid-feedback">{errors.mobileNo}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                {/* Notification Preferences */}
                <div className="mb-3">
                  <label htmlFor="preferences" className="form-label">
                    Notification Preferences
                  </label>
                  <select
                    id="preferences"
                    name="preferences"
                    className={`form-select ${
                      errors.preferences ? "is-invalid" : ""
                    }`}
                    value={formData.preferences}
                    onChange={handleChange}
                  >
                    <option value="">Select preference</option>
                    <option value="government-tenders">
                      Government Tenders
                    </option>
                  </select>
                  {errors.preferences && (
                    <div className="invalid-feedback">{errors.preferences}</div>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus.error && (
                  <div className="alert alert-danger">{submitStatus.error}</div>
                )}
                {submitStatus.success && (
                  <div className="alert alert-success">
                    Registration successful!
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
