import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCards(true);
    }, 100);
  }, []);

  return (
    <div className="mt-5 px-3">
      <div className="container">
        <div className="text-center mb-5">
          <h3 className="display-5 fw-bold text-primary">
            <i className="bi bi-card-checklist me-2"></i> Choose Your Plan
          </h3>
          <p className="text-muted fs-5">
            Select the best plan to unlock premium benefits and achieve your
            goals.
          </p>
        </div>
        <div className="row g-4">
          {/* Basic Plan */}
          <div className={`col-lg-4 col-md-6 ${showCards ? "" : "d-none"}`}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title text-primary fw-bold mb-3">
                  <i className="bi bi-person-circle me-2"></i> Basic Plan
                </h5>
                <p className="fs-4 fw-bold text-dark">₹5,899/year</p>
                <ul className="list-unstyled my-3 text-start">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Unlimited Notifications
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Email Alerts
                  </li>
                  <li className="mb-2 text-muted">
                    <i className="bi bi-x-circle-fill me-2"></i> Priority
                    Support
                  </li>
                  <li className="mb-2 text-muted">
                    <i className="bi bi-x-circle-fill me-2"></i> No-cost
                    Consultancy
                  </li>
                </ul>
                <button className="btn btn-outline-primary mt-auto">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className={`col-lg-4 col-md-6 ${showCards ? "" : "d-none"}`}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title text-warning fw-bold mb-3">
                  <i className="bi bi-star-fill me-2"></i> Pro Plan
                </h5>
                <p className="fs-4 fw-bold text-dark">₹10,899/year</p>
                <ul className="list-unstyled my-3 text-start">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Unlimited Notifications
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Email & WhatsApp Alerts
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Priority Support
                  </li>
                  <li className="mb-2 text-muted">
                    <i className="bi bi-x-circle-fill me-2"></i> No-cost
                    Consultancy
                  </li>
                </ul>
                <button className="btn btn-warning text-white mt-auto">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className={`col-lg-4 col-md-6 ${showCards ? "" : "d-none"}`}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title text-success fw-bold mb-3">
                  <i className="bi bi-building me-2"></i> Enterprise Plan
                </h5>
                <p className="fs-4 fw-bold text-dark">₹14,999/year</p>
                <ul className="list-unstyled my-3 text-start">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Unlimited Notifications
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    Email & Phone Alerts
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    AI-Based Bid Support
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>{" "}
                    No-cost Consultancy
                  </li>
                </ul>
                <button className="btn btn-outline-success mt-auto">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
