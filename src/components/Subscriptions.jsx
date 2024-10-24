import React, { useEffect, useState } from "react";
import "./Subscription.css"; // Minimal custom styles for specific tweaks

const Subscriptions = () => {
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateMiddle, setAnimateMiddle] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const [showCards, setShowCards] = useState(false); // New state for visibility

  useEffect(() => {
    // Delay showing cards to allow for animation
    setTimeout(() => {
      setShowCards(true);
      setAnimateLeft(true);
      setAnimateMiddle(true);
      setAnimateRight(true);
    }, 100); // Delay for better effect
  }, []);

  return (
    <div className="mt-2 rounded-3">
      <div className="text-center mb-4">
        <h3 className="display-6">
          Choose Your Plan
          <img src="images/vip.png" className="ms-2" alt="VIP" />
        </h3>
        <p className="lead">
          Select the membership plan that suits your needs.
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Basic Plan */}
        <div
          className={`col plans ${animateLeft ? "animate-left" : ""} ${
            showCards ? "" : "hidden"
          }`}
        >
          <div className="card h-100 text-center shadow border-info rounded-4 p-3">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-person-circle text-primary"></i>{" "}
                {/* Bootstrap icon */}
                Basic Plan
              </h5>
              <p className="fs-4 fw-semibold">₹2799/year</p>
              <ul className="list-unstyled">
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i> {/* Check icon */}
                  Unlimited Notifications
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Email Alerts
                </li>
                <li className="text-muted">
                  <i className="bi bi-x-circle-fill"></i> {/* Cross icon */}
                  Priority Support
                </li>
                <li className="text-muted">
                  <i className="bi bi-x-circle-fill"></i>
                  Unlimited Tender Filing
                </li>
                <li className="text-muted">
                  <i className="bi bi-x-circle-fill"></i>
                  No-cost Consultancy
                </li>
              </ul>
              <button className="btn btn-outline-primary w-100 mt-3">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div
          className={`col plans ${animateMiddle ? "animate-middle" : ""} ${
            showCards ? "" : "hidden"
          }`}
        >
          <div className="card h-100 text-center shadow border-primary rounded-4 p-3">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-star-fill text-warning"></i>{" "}
                {/* Star icon */}
                Pro Plan
              </h5>
              <p className="fs-4 fw-semibold">₹5899/year</p>
              <ul className="list-unstyled">
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Unlimited Notifications
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Email & SMS Alerts
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Priority Support
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>1 Tender Filing
                </li>
                <li className="text-muted">
                  <i className="bi bi-x-circle-fill"></i>
                  No-cost Consultancy
                </li>
              </ul>
              <button className="btn btn-primary text-white w-100 mt-3">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div
          className={`col plans ${animateRight ? "animate-right" : ""} ${
            showCards ? "" : "hidden"
          }`}
        >
          <div className="card h-100 text-center shadow border-info rounded-4 p-3">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-building text-success"></i>{" "}
                {/* Building icon */}
                Enterprise Plan
              </h5>
              <p className="fs-4 fw-semibold">₹14999/year</p>
              <ul className="list-unstyled">
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Unlimited Notifications
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  Email & Phone Alerts
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  AI Based Bid Support
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>3 Tender Filing
                </li>
                <li className="text-primary fw-bold">
                  <i className="bi bi-check-circle-fill"></i>
                  No-Cost Consultation
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
  );
};

export default Subscriptions;
