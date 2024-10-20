import React from "react";
import "./Subscription.css"; // Minimal custom styles for specific tweaks

const Subscriptions = () => (
  <div className="container mt-2 rounded-3">
    <div className="text-center mb-4">
      <h3 className="display-6">
        Choose Your Plan
        <img src="images/vip.png" className="ms-2" alt="VIP" />
      </h3>
      <p className="lead">Select the membership plan that suits your needs.</p>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {/* Basic Plan */}
      <div className="col col-md-6 col-lg-4 plans">
        <div className="card h-100 text-center shadow border-dark">
          <div className="card-body">
            <h5 className="card-title">Basic Plan</h5>
            <p className="fs-4 fw-semibold">₹2799/year</p>
            <ul className="list-unstyled">
              <li className="text-primary fw-bold">
                ✓ Unlimited Notifications
              </li>
              <li className="text-primary fw-bold">✓ Email Alerts</li>
              <li className="text-muted">✗ Priority Support</li>
              <li className="text-muted">✗ Unlimited Tender Filing</li>
              <li className="text-muted">✗ No-cost Consultancy</li>
            </ul>
            <button className="btn btn-outline-primary w-100 mt-3">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="col col-md-6 col-lg-4 plans">
        <div className="card h-100 text-center shadow border-primary">
          <div className="card-body">
            <h5 className="card-title">Pro Plan</h5>
            <p className="fs-4 fw-semibold">₹5899/year</p>
            <ul className="list-unstyled">
              <li className="text-primary fw-bold">
                ✓ Unlimited Notifications
              </li>
              <li className="text-primary fw-bold">✓ Email & SMS Alerts</li>
              <li className="text-primary fw-bold">✓ Priority Support</li>
              <li className="text-primary fw-bold">✓ 1 Tender Filing</li>
              <li className="text-muted">✗ No-cost Consultancy</li>
            </ul>
            <button className="btn btn-primary text-white w-100 mt-3">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise Plan */}
      <div className="col col-md-6 col-lg-4 plans">
        <div className="card h-100 text-center shadow border-dark">
          <div className="card-body">
            <h5 className="card-title">Enterprise Plan</h5>
            <p className="fs-4 fw-semibold">₹14999/year</p>
            <ul className="list-unstyled">
              <li className="text-primary fw-bold">
                ✓ Unlimited Notifications
              </li>
              <li className="text-primary fw-bold">✓ Email & Phone Alerts</li>
              <li className="text-primary fw-bold">✓ AI Based Bid Support</li>
              <li className="text-primary fw-bold">✓ 3 Tender Filing</li>
              <li className="text-primary fw-bold">✓ No-Cost Consultation</li>
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

export default Subscriptions;