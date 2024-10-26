import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TenderDetail.css"; // Import CSS here

const TenderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tender } = location.state || {};

  if (!tender) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          No tender details available.
          <button
            className="btn btn-link"
            onClick={() => navigate("/tender")}
            aria-label="Return to Tender Search"
          >
            Return to search
          </button>
        </div>
      </div>
    );
  }

  const {
    tender_id,
    org_name,
    title,
    category,
    price,
    address,
    closing_date,
    boq,
    state,
    district,
  } = tender;

  return (
    <div className="tender-detail-container mt-5">
      <div className="tender-detail-card card">
        <div className="tender-detail-header card-header">
          <h3 className="mb-0">Tender Details</h3>
          <button
            className="btn btn-light"
            onClick={() => navigate(-1)}
            aria-label="Go back to Tender Results"
          >
            Back to Results
          </button>
        </div>
        <div className="tender-detail-body card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Tender ID:</strong> {tender_id}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Organization:</strong> {org_name}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Title:</strong> {title}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Category:</strong> {category}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Price:</strong> {price}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Address:</strong> {address}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">Closing Date:</strong>{" "}
              {closing_date}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">State:</strong> {state}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">District:</strong> {district}
            </div>
            <div className="col-md-6 mb-3">
              <strong className="text-muted">BOQ:</strong>{" "}
              {boq && boq.trim().toLowerCase() !== "none" ? (
                <a
                  href={boq}
                  className="btn btn-primary btn-sm"
                  download
                  target="_self"
                  aria-label="Download BOQ"
                >
                  Download BOQ
                </a>
              ) : (
                <span>No BOQ available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
