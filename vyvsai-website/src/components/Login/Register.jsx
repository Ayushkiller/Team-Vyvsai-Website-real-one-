import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
  const [submitStatus, setSubmitStatus] = useState({ error: "", success: false });

  const validateForm = useCallback(() => {
    const newErrors = {};
    const { username, mobileNo, email, password, preferences } = formData;

    if (!username.trim()) newErrors.username = "Username is required";
    if (!mobileNo.trim()) newErrors.mobileNo = "Contact number is required";
    else if (!/^\d{10}$/.test(mobileNo)) newErrors.mobileNo = "Invalid contact number";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!preferences) newErrors.preferences = "Please select a preference";

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
      await registerService.register(formData);
      setSubmitStatus({ error: "", success: true });
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus({ error: error.response?.data?.message || 'Registration failed', success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (name, label, type = "text") => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        aria-invalid={errors[name] ? "true" : "false"}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && <p id={`${name}-error`} className="error">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        {renderFormField("username", "Username")}
        {renderFormField("mobileNo", "Contact Number", "tel")}
        {renderFormField("email", "Email", "email")}
        {renderFormField("password", "Password", "password")}

        <div className="form-group">
          <label htmlFor="preferences">Notification Preferences</label>
          <select
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            aria-invalid={errors.preferences ? "true" : "false"}
            aria-describedby={errors.preferences ? "preferences-error" : undefined}
          >
            <option value="">Select preference</option>
            <option value="government-tenders">Government Tenders</option>
          </select>
          {errors.preferences && <p id="preferences-error" className="error">{errors.preferences}</p>}
        </div>

        {submitStatus.error && <div className="alert error"><p>{submitStatus.error}</p></div>}
        {submitStatus.success && <div className="alert success"><p>Registration successful!</p></div>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;