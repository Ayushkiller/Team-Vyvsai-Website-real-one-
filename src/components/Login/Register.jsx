import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import currentData from "../current.json"; // Assuming the updated JSON is correctly placed in this location

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobileNo: "",
    email: "",
    password: "",
    notificationPreferences: "",
    state: "", // Single state selection
    districts: [], // Multiple districts
    departments: [], // Multiple departments
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    error: "",
    success: false,
  });

  const [statesData, setStatesData] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Load state data from currentData JSON
  useEffect(() => {
    setStatesData(currentData.states);
  }, []);

  // Form validation logic
  const validateForm = useCallback(() => {
    const newErrors = {};
    const {
      username,
      mobileNo,
      email,
      password,
      notificationPreferences,
      state,
      districts,
      departments,
    } = formData;

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
    if (!notificationPreferences)
      newErrors.notificationPreferences =
        "Please select a notification preference.";
    if (!state) newErrors.state = "Please select a state."; // state is now a single value
    if (!districts.length)
      newErrors.districts = "Please select at least one district.";
    if (!departments.length)
      newErrors.departments = "Please select at least one department.";

    return newErrors;
  }, [formData]);

  // Handle changes to text inputs and dropdowns
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // Handle state selection
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({ ...prev, state: selectedState }));

    const selectedStateData = statesData.find(
      (stateData) => stateData.state === selectedState
    );
    if (selectedStateData) {
      setFilteredDistricts(selectedStateData.districts);
      setFilteredDepartments(selectedStateData.departments);
    }

    // Clear districts and departments as the state has changed
    setFormData((prev) => ({
      ...prev,
      districts: [],
      departments: [],
    }));
  };

  // Handle checkbox changes for districts and departments
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const updatedField = checked
      ? [...formData[field], value]
      : formData[field].filter((item) => item !== value);

    setFormData((prev) => ({ ...prev, [field]: updatedField }));
  };

  // Handle form submission
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
        notificationPreferences: "",
        state: "", // Reset state to empty string
        districts: [],
        departments: [],
      });
    } catch (error) {
      setSubmitStatus({
        error: error.response?.data?.message || "Registration failed.",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card p-4 shadow-sm border-0 rounded-3">
        <h2 className="text-center mb-4">
          <i className="bi bi-person-plus-fill me-2 text-primary"></i>User
          Registration
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="bi bi-person-fill me-2 text-primary"></i> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope-fill me-2 text-primary"></i> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* Mobile Number */}
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label">
              <i className="bi bi-telephone-fill me-2 text-primary"></i> Mobile
              Number
            </label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              className={`form-control ${errors.mobileNo ? "is-invalid" : ""}`}
              value={formData.mobileNo}
              onChange={handleChange}
            />
            {errors.mobileNo && (
              <div className="invalid-feedback">{errors.mobileNo}</div>
            )}
          </div>
          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock-fill me-2 text-primary"></i>Set Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="mb-3">
            <label htmlFor="notificationPreferences" className="form-label">
              <i className="bi bi-bell-fill me-2 text-primary"></i> Notification
              Preferences
            </label>
            <select
              id="notificationPreferences"
              name="notificationPreferences"
              className={`form-select ${
                errors.notificationPreferences ? "is-invalid" : ""
              }`}
              value={formData.notificationPreferences}
              onChange={handleChange}
            >
              <option value="">Select Preference</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="both">Both</option>
            </select>
            {errors.notificationPreferences && (
              <div className="invalid-feedback">
                {errors.notificationPreferences}
              </div>
            )}
          </div>
          {/* State */}
          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-geo-alt-fill me-2 text-primary"></i> Select
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className="form-select"
            >
              <option value="" disabled>
                Select a State
              </option>
              {statesData.map((stateData) => (
                <option key={stateData.state} value={stateData.state}>
                  {stateData.state}
                </option>
              ))}
            </select>
            {errors.state && <div className="text-danger">{errors.state}</div>}
          </div>

          {/* Districts */}
          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-map-fill me-2 text-primary"></i> Select
              District(s)
            </label>
            <div className="d-flex flex-wrap">
              {filteredDistricts.map((district) => (
                <div className="me-3 mb-2" key={district}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id={`district-${district}`}
                      name="districts"
                      value={district}
                      checked={formData.districts.includes(district)}
                      onChange={(e) => handleCheckboxChange(e, "districts")}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`district-${district}`}
                      className="form-check-label"
                    >
                      {district}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {errors.districts && (
              <div className="text-danger">{errors.districts}</div>
            )}
          </div>

          {/* Departments */}
          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-briefcase-fill me-2 text-primary"></i> Select
              Department(s)
            </label>
            <div className="d-flex flex-wrap">
              {filteredDepartments.map((department) => (
                <div className="me-3 mb-2" key={department}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id={`department-${department}`}
                      name="departments"
                      value={department}
                      checked={formData.departments.includes(department)}
                      onChange={(e) => handleCheckboxChange(e, "departments")}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`department-${department}`}
                      className="form-check-label"
                    >
                      {department}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {errors.departments && (
              <div className="text-danger">{errors.departments}</div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </div>

          {submitStatus.success && (
            <div className="alert alert-success mt-3">
              Registration Successful!
            </div>
          )}
          {submitStatus.error && (
            <div className="alert alert-danger mt-3">{submitStatus.error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
