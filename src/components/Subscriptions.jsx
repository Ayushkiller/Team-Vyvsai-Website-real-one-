import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const [showCards, setShowCards] = useState(false); // New state for visibility

  useEffect(() => {
    // Delay showing cards to allow for animation
    setTimeout(() => {
      setShowCards(true);
    }, 100); // Delay for better effect
  }, []);

  return (
    <div
      className="mt-5 pt-2"
      // style={{ marginTop: "60px" }}
    >
      <div className="rounded-3 mb-5 pb-5 pt-5">
        <div className="text-center mb-4">
          <h3 className="display-6">
            <i className="bi bi-card-checklist text-primary me-2"></i> Choose
            Your Plan
          </h3>
          <p className="lead">
            Select the membership plan that suits your needs.
          </p>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Basic Plan */}
          <div className={`col ${showCards ? "" : "d-none"}`}>
            <div className={`card h-100 shadow border-primary rounded-4`}>
              <div className="card-body d-flex flex-column align-items-center">
                <div className="w-100 border-bottom border-primary text-center mb-2">
                  <h5 className="card-title">
                    <i className="bi bi-person-circle text-primary"></i> Basic
                    Plan
                  </h5>
                </div>
                <p className="fs-4 fw-semibold text-center">₹5899/year</p>
                <ul className="list-unstyled flex-grow-1">
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Unlimited
                    Notifications
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Email Alerts
                  </li>
                  <li className="text-muted">
                    <i className="bi bi-x-circle-fill"></i> Priority Support
                  </li>
                  <li className="text-muted">
                    <i className="bi bi-x-circle-fill"></i> No-cost Consultancy
                  </li>
                </ul>
                <button className="btn btn-outline-primary w-100 mt-3">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className={`col ${showCards ? "" : "d-none"}`}>
            <div className={`card h-100 shadow border-primary rounded-4`}>
              <div className="card-body d-flex flex-column align-items-center">
                <div className="w-100 border-bottom border-warning text-center mb-2">
                  <h5 className="card-title">
                    <i className="bi bi-star-fill text-warning"></i> Pro Plan
                  </h5>
                </div>
                <p className="fs-4 fw-semibold text-center">₹10899/year</p>
                <ul className="list-unstyled flex-grow-1">
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Unlimited
                    Notifications
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Email & WhatsApp
                    Alerts
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Priority Support
                  </li>
                  <li className="text-muted">
                    <i className="bi bi-x-circle-fill"></i> No-cost Consultancy
                  </li>
                </ul>
                <button className="btn btn-primary text-white w-100 mt-3">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className={`col ${showCards ? "" : "d-none"}`}>
            <div className={`card h-100 shadow border-primary rounded-4`}>
              <div className="card-body d-flex flex-column align-items-center">
                <div className="w-100 border-bottom border-success text-center mb-2">
                  <h5 className="card-title">
                    <i className="bi bi-building text-success"></i> Enterprise
                    Plan
                  </h5>
                </div>
                <p className="fs-4 fw-semibold text-center">₹14999/year</p>
                <ul className="list-unstyled flex-grow-1">
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Unlimited
                    Notifications
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> Email & Phone
                    Alerts
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> AI Based Bid
                    Support
                  </li>
                  <li className="text-primary fw-bold">
                    <i className="bi bi-check-circle-fill"></i> No-Cost
                    Consultancy
                  </li>
                </ul>
                <button className="btn btn-outline-primary w-100 mt-3">
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
