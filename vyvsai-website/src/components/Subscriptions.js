import React from 'react';

const Subscriptions = () => (
  <div className="container py-5 mt-5">
    <div className="pricing-header text-center">
      <h3 className="display-5">
        Choose Your Plan
        <img src="images/vip.png" className="membership" alt="" />
      </h3>
      <p className="lead">Select the membership plan that suits your needs.</p>
    </div>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {/* Basic Plan */}
      <div className="col subscription">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Basic Plan</h5>
            <p className="card-price">₹2799/year</p>
            <p className="card-feature">✓ Unlimited Notifications</p>
            <p className="card-feature">✓ Email Alerts</p>
            <p className="card-feature"><s>Priority Support</s></p>
            <p className="card-feature"><s>Unlimited Tender Filing</s></p>
            <p className="card-feature"><s>No-cost Consultancy</s></p>
            <button className="btn btn-primary btn-plan">Get Started</button>
          </div>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="col subscription">
        <div className="card text-center border-primary">
          <div className="card-body">
            <h5 className="card-title">Pro Plan</h5>
            <p className="card-price">₹5899/year</p>
            <p className="card-feature">✓ Unlimited Notifications</p>
            <p className="card-feature">✓ Email & SMS Alerts</p>
            <p className="card-feature">✓ Priority Support</p>
            <p className="card-feature">✓ 1 Tender Filing</p>
            <p className="card-feature"><s>No-cost Consultancy</s></p>
            <button className="btn btn-primary btn-plan">Get Started</button>
          </div>
        </div>
      </div>

      {/* Enterprise Plan */}
      <div className="col">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Enterprise Plan</h5>
            <p className="card-price">
              ₹14999/<span className="text-muted">year</span>
            </p>
            <p className="card-feature">✓ Unlimited Notifications</p>
            <p className="card-feature">✓ Email, SMS & Phone Alerts</p>
            <p className="card-feature">✓ AI Based Bid Support</p>
            <p className="card-feature">✓ 3 Tender Filing</p>
            <p className="card-feature">✓ No-Cost Consultation</p>
            <button className="btn btn-primary btn-plan">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Subscriptions;