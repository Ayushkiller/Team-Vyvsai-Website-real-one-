import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container my-5 rounded-3">
      <div className="text-center mb-4">
        <h2>Terms and Conditions</h2>
        <p className="text-muted">
          Please read these terms carefully before using our service
        </p>
      </div>

      {/* Introduction */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-file-earmark-text me-2"></i>
            Introduction
          </h5>
          <p className="card-text">
            Welcome to our platform. By accessing or using our services, you
            agree to comply with these Terms and Conditions. Please read them
            carefully to understand your rights and obligations when using our
            SaaS notifications for government tenders.
          </p>
        </div>
      </div>

      {/* Account Responsibility */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-person-circle me-2"></i>
            Account Responsibility
          </h5>
          <p className="card-text">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. Notify us immediately of any unauthorized access or use of
            your account.
          </p>
        </div>
      </div>

      {/* Service Usage */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-check2-square me-2"></i>
            Service Usage
          </h5>
          <p className="card-text">
            Our service provides notifications for government tenders as part of
            a subscription-based SaaS model. You agree to use the service only
            for lawful purposes and to refrain from any activity that disrupts
            or negatively affects other users.
          </p>
        </div>
      </div>

      {/* Subscription and Payment */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-wallet2 me-2"></i>
            Subscription and Payment
          </h5>
          <p className="card-text">
            By subscribing to our service, you agree to pay the specified fees
            for the duration of the subscription. All payments are
            non-refundable, and your subscription will automatically renew
            unless canceled before the renewal date.
          </p>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-shield-lock me-2"></i>
            Intellectual Property
          </h5>
          <p className="card-text">
            All content, trademarks, and materials associated with our service
            are the intellectual property of our company. You are prohibited
            from reproducing or distributing any content from our platform
            without explicit permission.
          </p>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-exclamation-circle me-2"></i>
            Limitation of Liability
          </h5>
          <p className="card-text">
            We strive to ensure the accuracy and reliability of our
            notifications. However, we are not liable for any damages arising
            from the use of our service, including any missed opportunities due
            to delayed or inaccurate notifications.
          </p>
        </div>
      </div>

      {/* Changes to Terms */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">
            <i className="bi bi-pencil-square me-2"></i>
            Changes to Terms
          </h5>
          <p className="card-text">
            We reserve the right to modify these Terms and Conditions at any
            time. Any updates will be posted on this page, and it is your
            responsibility to review the terms periodically to stay informed of
            any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
