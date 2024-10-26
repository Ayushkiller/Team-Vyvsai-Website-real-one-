import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TenderDetail.css"; // Import CSS here

const TenderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tender } = location.state || {};

  if (!tender) {
    return (
      <div className="tender-detail__container mt-5">
        <div className="tender-detail__alert alert-warning d-flex justify-content-between align-items-center">
          No tender details available.
          <button
            className="tender-detail__return-btn btn btn-link"
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
    <div className="mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Tender Details</h3>
          <button
            className="tender-detail__back-btn btn btn-light"
            onClick={() => navigate(-1)}
            aria-label="Go back to Tender Results"
          >
            Back to Results
          </button>
        </div>
        <div className="tender-detail__body card-body">
          <div className="tender-detail__row row">
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Tender ID:</strong> {tender_id}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Organization:</strong> {org_name}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Title:</strong> {title}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Category:</strong> {category}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Price:</strong> {price}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Address:</strong> {address}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">Closing Date:</strong>{" "}
              {closing_date}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">State:</strong> {state}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">District:</strong> {district}
            </div>
            <div className="tender-detail__info col-md-6 mb-3">
              <strong className="text-muted">BOQ:</strong>{" "}
              {boq && boq.trim().toLowerCase() !== "none" ? (
                <a
                  href={boq}
                  className="tender-detail__boq-btn btn btn-primary btn-sm"
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
