import React, { useState } from "react";
import axios from "axios";

function TenderFile() {
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    mobileNo: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, mobileNo, email } = userDetails;

    if (!username || !mobileNo || !email) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://dbbackend.something.vyvsai.com/api/notify-tender-file",
        {
          username,
          mobileNo,
          email,
        }
      );

      // Check if the response status is success
      if (response.status === 200) {
        alert("Thank you! You will be notified on launch.");
        setShowModal(false);
        setUserDetails({ username: "", mobileNo: "", email: "" });
      } else {
        // Handle unexpected status codes from the server
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      // Handle error during request
      if (err.response) {
        setError(
          err.response.data.message ||
            "Failed to submit details. Please try again."
        );
      } else {
        setError("Failed to submit details. Please try again.");
      }
    }
  };

  return (
    <div className="container py-1">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          {/* Title Section */}
          <section className="text-center mb-5">
            <h1 className="text-primary fw-bold mb-3">
              <i className="bi bi-pencil-fill me-2"></i>
              Coming Soon: Tender Filing Services by vyvsai
            </h1>
            <p className="lead">
              At <strong>vyvsai.com</strong>, we’re excited to offer a
              fully-managed Tender Filing Service that ensures your tenders are
              filed with precision and care. Our service is designed to help
              organizations prepare, manage, and submit tenders in a hassle-free
              manner.
            </p>
          </section>

          {/* Service Details Section */}
          <section className="text-center mb-2">
            <h2 className="text-primary mb-4">
              Why Choose Our Tender Filing Services?
            </h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-0 p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <i
                      className="bi bi-check-circle-fill text-success"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <p className="lead">
                    <strong>Accuracy</strong>: Ensure error-free tender filings
                    with our experienced team.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-0 p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <i
                      className="bi bi-clock-fill text-warning"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <p className="lead">
                    <strong>Timeliness</strong>: We understand deadlines and
                    guarantee timely submissions.
                  </p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card shadow-sm border-0 p-4">
                  <div className="d-flex justify-content-center mb-3">
                    <i
                      className="bi bi-shield-lock-fill text-info"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <p className="lead">
                    <strong>Security</strong>: All your tender documents are
                    handled with the highest level of confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Notification Button */}
          <div className="text-center my-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-bell-fill me-2"></i>Notify Me on Launch
            </button>
          </div>

          {/* Modal */}
          {showModal && (
            <div
              className="modal-backdrop d-flex align-items-center justify-content-center"
              onClick={() => setShowModal(false)} // Close modal on backdrop click
            >
              <div
                className="modal-dialog"
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the backdrop
              >
                <div className="modal-content shadow-lg">
                  {/* Modal Header */}
                  <div className="modal-header d-flex justify-content-between align-items-center">
                    <h5 className="modal-title mx-auto fw-bold">
                      <i className="bi bi-envelope-fill text-primary me-2"></i>
                      Notify on Launch
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-dark"
                      aria-label="Close"
                      onClick={() => setShowModal(false)}
                      style={{ position: "absolute", right: "15px" }}
                    ></button>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="alert alert-danger text-center">
                          {error}
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          <i className="bi bi-person-fill text-primary me-2"></i>
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={userDetails.username}
                          onChange={handleChange}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mobileNo" className="form-label">
                          <i className="bi bi-phone-fill text-primary me-2"></i>
                          Mobile (WhatsApp)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobileNo"
                          name="mobileNo"
                          value={userDetails.mobileNo}
                          onChange={handleChange}
                          placeholder="Enter your WhatsApp number"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope-fill text-primary me-2"></i>
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={userDetails.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        <i className="bi bi-check-circle me-2"></i>Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Message */}
          <p className="text-center text-muted mt-5">
            <i className="bi bi-info-circle-fill me-2"></i>
            Stay tuned for an efficient, hassle-free tender filing experience
            with vyvsai.com – Simplifying Success.
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1050;
        }

        .modal-dialog {
          background-color: white;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          padding: 15px;
          animation: fadeIn 0.3s ease-in-out;
        }

        .modal-content {
          border: none;
          border-radius: 8px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom modal icon adjustments */
        .modal-header .bi {
          font-size: 1.25rem;
        }

        .modal-body .bi {
          font-size: 1.1rem;
        }

        .modal-footer .bi {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export default TenderFile;
