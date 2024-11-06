import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TenderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tender } = location.state || {};

  if (!tender) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          No tender details available.
          <button className="btn btn-link" onClick={() => navigate("/tender")}>
            Return to search
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    return new Date(`${date.split("-").reverse().join("-")} ${time}`);
  };

  const calculateTimeRemaining = (closingDate) => {
    const now = new Date();
    const closeDate = formatDate(closingDate);

    const diffMinutes = Math.floor((closeDate - now) / (1000 * 60));
    const days = Math.floor(diffMinutes / (60 * 24));
    const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
    const minutes = diffMinutes % 60;

    return `${days}d ${hours}h ${minutes}m`;
  };

  const timeRemaining = calculateTimeRemaining(tender.closing_date);

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="text-primary d-flex align-items-center">
          <i className="bi bi-clipboard-check me-2"></i> Tender Details
        </h2>
        <span className="text-muted">Closing in: {timeRemaining}</span>
      </div>

      {/* Title Section */}
      <section className="border-bottom pb-4 mb-4">
        <h3 className="display-6 text-dark">{tender.title}</h3>
        <p className="text-muted mb-0">Organized by: {tender.org_name}</p>
      </section>

      {/* Details Section */}
      <section className="mb-4">
        <h5 className="text-secondary">Tender Information</h5>
        <p className="mt-3">
          <span className="fw-bold text-muted">Category: </span>
          <span>{tender.category}</span>
        </p>
        <p>
          <span className="fw-bold text-muted">Price: </span>
          <span>{tender.price}</span>
        </p>
      </section>

      {/* Location Section */}
      <section className="mb-4">
        <h5 className="text-secondary">Location</h5>
        <p className="mt-3">
          <span className="fw-bold text-muted">State: </span>
          <span>{tender.state}</span>
        </p>
        <p>
          <span className="fw-bold text-muted">District: </span>
          <span>{tender.district}</span>
        </p>
        <p>
          <span className="fw-bold text-muted">Address: </span>
          <span>{tender.address}</span>
        </p>
      </section>

      {/* Closing Information */}
      <section className="mb-4">
        <h5 className="text-secondary">Important Dates</h5>
        <p className="mt-3">
          <span className="fw-bold text-muted">Closing Date: </span>
          <span>{tender.closing_date}</span>
        </p>
      </section>

      {/* BOQ Download Button */}
      <section className="mb-4">
        <h5 className="text-secondary">BOQ Document</h5>
        {tender.boq && tender.boq.trim().toLowerCase() !== "none" ? (
          <a
            href={tender.boq}
            className="btn btn-outline-primary mt-3"
            download
          >
            Download BOQ
          </a>
        ) : (
          <p className="text-muted mt-3">No BOQ available</p>
        )}
      </section>

      {/* Back Button */}
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back to Results
      </button>
    </div>
  );
};

export default TenderDetail;
