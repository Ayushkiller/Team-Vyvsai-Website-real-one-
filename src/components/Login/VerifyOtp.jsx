import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/password-reset/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessages(data.errors);
      } else {
        const data = await response.json();
        setSuccessMessage(data.message);
        history.push('/password-reset/new-password'); // Redirect to new password page
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessages([{ msg: 'An error occurred. Please try again.' }]);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Verify OTP</h1>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter the OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {errorMessages.length > 0 && (
                <div className="invalid-feedback d-block">
                  {errorMessages[0].msg}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;