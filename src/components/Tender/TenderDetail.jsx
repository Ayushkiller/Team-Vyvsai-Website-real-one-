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

  return (
    <div className="container vh-100 mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Tender Details</h2>
          <button className="btn btn-light" onClick={() => navigate(-1)}>
            Back to Results
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Tender ID</h5>
              <p className="fs-5">{tender.tender_id}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Organization</h5>
              <p className="fs-5">{tender.org_name}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Title</h5>
              <p className="fs-5">{tender.title}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Category</h5>
              <p className="fs-5">{tender.category}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Price</h5>
              <p className="fs-5">{tender.price}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">State</h5>
              <p className="fs-5">{tender.state}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">District</h5>
              <p className="fs-5">{tender.district}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-muted">Closing Date</h5>
              <p className="fs-5">{tender.closing_date}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5 className="text-muted">Address</h5>
              <p className="fs-5">{tender.address}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <h5 className="text-muted">BOQ</h5>
              {tender.boq && tender.boq.trim().toLowerCase() !== "none" ? (
                <a
                  href={tender.boq}
                  className="btn btn-outline-primary"
                  download
                  target="_self"
                >
                  Download BOQ
                </a>
              ) : (
                <span className="text-secondary">No BOQ available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
