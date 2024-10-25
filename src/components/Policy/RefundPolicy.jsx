import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container my-5 rounded-3">
      <div className="text-center mb-4">
        <h2>Refund Policy</h2>
        <p className="text-muted">
          Our policy regarding refunds and cancellations
        </p>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-info-circle me-2"></i>
            Policy Overview
          </h5>
          <p className="card-text">
            As a subscription-based SaaS provider, our service incurs ongoing
            resources and costs to deliver accurate and timely notifications for
            government tenders. Due to the nature of our service, we currently
            do not offer refunds.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Non-Refundable Subscriptions
          </h5>
          <p className="card-text">
            Our policy applies to all subscriptions, including initial, renewal,
            and ongoing services. We encourage you to review the product details
            and ensure it meets your needs prior to purchase.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-headset me-2"></i>
            Support for Any Issues
          </h5>
          <p className="card-text">
            Your satisfaction is our priority. If you have any questions or need
            assistance, our support team is here to help. Please don’t hesitate
            to reach out for guidance on making the most of our service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
