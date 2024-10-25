import React from "react";

const RefundTerms = () => {
  return (
    <div className="container my-5 rounded-3">
      <div className="text-center mb-4">
        <h2>Refund Terms</h2>
        <p className="text-muted">
          Conditions under which a refund may be issued
        </p>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-file-earmark-text me-2"></i>
            Initial Subscription Only
          </h5>
          <p className="card-text">
            Refunds apply only to new subscriptions and do not cover renewals or
            previously active subscriptions.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-clock-history me-2"></i>
            7-Day Refund Window
          </h5>
          <p className="card-text">
            Refunds are eligible only <strong>within the first 7 days</strong>{" "}
            of the subscription purchase. Requests outside of this period are
            not accepted.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-shield-check me-2"></i>
            Usage Limitations
          </h5>
          <p className="card-text">
            Refunds are processed if service usage is minimal{" "}
            <strong>(e.g., no more than three notifications accessed)</strong> .
            High usage indicates acceptance of the service and may disqualify
            refund eligibility.
          </p>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-flag me-2"></i>
            Support Contact
          </h5>
          <p className="card-text">
            To request a refund, contact support with your account and
            subscription details. Refund approvals are subject to verification
            of the above terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundTerms;
