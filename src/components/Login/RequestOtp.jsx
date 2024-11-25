import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestOtp = () => {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/password-reset/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessages(data.errors);
      } else {
        history.push("/password-reset/verify-otp"); // Redirect to OTP verification page
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setErrorMessages([{ msg: "An error occurred. Please try again." }]);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Reset Password</h1>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your registered Email or Phone Number:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMessages.length > 0 && (
                <div className="invalid-feedback d-block">
                  {errorMessages[0].msg}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Get OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestOtp;


