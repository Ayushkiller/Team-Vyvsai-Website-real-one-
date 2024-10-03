//Register.jsx
import React, { useState } from "react";
import registerService from "../../services/registerService";
import "./Register.css";
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
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.mobileNo.trim())
      newErrors.mobileNo = "Contact number is required";
    if (!/^\d{10}$/.test(formData.mobileNo))
      newErrors.mobileNo = "Invalid contact number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.preferences)
      newErrors.preferences = "Please select a preference";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data before validation:', formData);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      console.log('Validation errors:', formErrors);
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await registerService.register(formData);

      console.log('API response:', response);

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <p id="username-error" className="error">
              {errors.username}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="mobileNo">Contact Number</label>
          <input
            id="mobileNo"
            name="mobileNo"
            type="tel"
            value={formData.mobileNo}
            onChange={handleChange}
            aria-invalid={errors.mobileNo ? "true" : "false"}
            aria-describedby={errors.mobileNo ? "mobileNo-error" : undefined}
          />
          {errors.mobileNo && (
            <p id="mobileNo-error" className="error">
              {errors.mobileNo}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p id="password-error" className="error">
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="preferences">Notification Preferences</label>
          <select
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            aria-invalid={errors.preferences ? "true" : "false"}
            aria-describedby={
              errors.preferences ? "preferences-error" : undefined
            }
          >
            <option value="">Select preference</option>
            <option value="government-tenders">Government Tenders</option>
          </select>
          {errors.preferences && (
            <p id="preferences-error" className="error">
              {errors.preferences}
            </p>
          )}
        </div>

        {submitError && (
          <div className="alert error">
            <p>{submitError}</p>
          </div>
        )}

        {submitSuccess && (
          <div className="alert success">
            <p>Registration successful!</p>
          </div>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
