import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessages([{ msg: 'Passwords do not match' }]);
      return;
    }

    try {
      const response = await fetch('/password-reset/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessages(data.errors);
      } else {
        history.push('/login'); // Redirect to login page after successful password reset
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessages([{ msg: 'An error occurred. Please try again.' }]);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Set New Password</h1>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {errorMessages.length > 0 && (
                <div className="invalid-feedback d-block">
                  {errorMessages[0].msg}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorMessages.length > 0 && (
                <div className="invalid-feedback d-block">
                  {errorMessages[0].msg}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;