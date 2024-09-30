import React, {useState} from 'react';
import connect from '../../Database/connect.js';
import mongoose from 'mongoose';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobileNo: '',
    email: '',
    password: '',
    preferences: ''
  });

  const [errorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connect(); 
      const collection = mongoose.connection.collection('Credentials');
      await collection.insertOne(formData);
      console.log('Data submitted successfully:', formData);
    } catch (err) {
      console.error('Error submitting data:', err);
    }
  };

  return (
    <div className="container mt-5 py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Register</h1>
          {errorMessages.length > 0 && (
            <div className="alert alert-danger" role="alert">
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${errorMessages.find(e => e.includes('Username')) ? 'is-invalid' : ''}`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errorMessages.find(e => e.includes('Username')) && (
                <div className="invalid-feedback">
                  {errorMessages.find(e => e.includes('Username'))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNo" className="form-label">Contact Number:</label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                className={`form-control ${errorMessages.find(e => e.includes('Mobile')) ? 'is-invalid' : ''}`}
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
              {errorMessages.find(e => e.includes('Mobile')) && (
                <div className="invalid-feedback">
                  {errorMessages.find(e => e.includes('Mobile'))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errorMessages.find(e => e.includes('Email')) ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errorMessages.find(e => e.includes('Email')) && (
                <div className="invalid-feedback">
                  {errorMessages.find(e => e.includes('Email'))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errorMessages.find(e => e.includes('Password')) ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errorMessages.find(e => e.includes('Password')) && (
                <div className="invalid-feedback">
                  {errorMessages.find(e => e.includes('Password'))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="preferences" className="form-label">Notification Preferences:</label>
              <select
                id="preferences"
                name="preferences"
                className={`form-select ${errorMessages.find(e => e.includes('Preferences')) ? 'is-invalid' : ''}`}
                value={formData.preferences}
                onChange={handleChange}
                required
              >
                <option value="">Select preference</option>
                <option value="government-tenders">Government Tenders</option>
              </select>
              {errorMessages.find(e => e.includes('Preferences')) && (
                <div className="invalid-feedback">
                  {errorMessages.find(e => e.includes('Preferences'))}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;