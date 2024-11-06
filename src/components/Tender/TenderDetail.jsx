import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

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

  // Format for date and time calculations
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
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="text-primary d-flex align-items-center">
          <i className="bi bi-clipboard-check me-2"></i> Tender Details
        </h2>
        <span className="text-muted">Closing in: {timeRemaining}</span>
      </div>

      <div className="border-bottom pb-3 mb-4">
        <h3 className="text-dark">{tender.title}</h3>
        <p className="text-secondary mb-1">
          <strong>Organization:</strong> {tender.org_name}
        </p>
        <p className="text-secondary mb-1">
          <strong>Category:</strong> {tender.category}
        </p>
        <p className="text-secondary mb-1">
          <strong>Price:</strong> {tender.price}
        </p>
        <p className="text-secondary mb-1">
          <strong>State:</strong> {tender.state}
        </p>
        <p className="text-secondary mb-1">
          <strong>District:</strong> {tender.district}
        </p>
        <p className="text-secondary mb-1">
          <strong>Address:</strong> {tender.address}
        </p>
        <p className="text-secondary">
          <strong>Closing Date:</strong> {tender.closing_date}
        </p>

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
      </div>

      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back to Results
      </button>
    </div>
  );
};

export default TenderDetail;
