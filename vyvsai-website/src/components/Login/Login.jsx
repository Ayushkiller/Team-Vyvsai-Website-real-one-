import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO Add form submission logic here
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="mobileNo" className="form-label">Mobile Number:</label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                className="form-control"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <a href="/password-reset/request-otp">Forgot Password?</a>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;