import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container my-5 rounded-3">
      <div className="text-center mb-4">
        <h2>Refund Policy</h2>
        <p className="text-muted">
          Understanding our refund policy and eligibility
        </p>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-info-circle me-2"></i>
            General Refund Policy
          </h5>
          <p className="card-text">
            We prioritize customer satisfaction and ensure our SaaS product
            meets your needs. Refunds are available if you are not fully
            satisfied, under{" "}
            <a href="/refund-terms-and-conditions">specific terms</a>.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-check2-circle me-2"></i>
            Eligibility for Refund
          </h5>
          <p className="card-text">
            Refunds are applicable within the first 7 days of your subscription
            start date. Refund requests apply only to initial subscriptions, not
            renewals or ongoing services.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refund Process
          </h5>
          <p className="card-text">
            To initiate a refund, please contact our support team with your
            subscription details. Approved refunds will be processed within 7-10
            business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
