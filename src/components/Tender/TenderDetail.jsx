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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Tender Details</h3>
          <button className="btn btn-light" onClick={() => navigate(-1)}>
            Back to Results
          </button>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="text-muted">Tender ID</h5>
              <p className="lead">{tender.tender_id}</p>
            </div>
            <div className="col-md-6">
              <h5 className="text-muted">Organization</h5>
              <p className="lead">{tender.org_name}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="text-muted">Title</h5>
              <p className="lead">{tender.title}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="text-muted">Category</h5>
              <p className="lead">{tender.category}</p>
            </div>
            <div className="col-md-6">
              <h5 className="text-muted">Price</h5>
              <p className="lead">{tender.price}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="text-muted">Address</h5>
              <p className="lead">{tender.address}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5 className="text-muted">Closing Date</h5>
              <p className="lead">{tender.closing_date}</p>
            </div>

            <div className="col-md-6">
              <h5 className="text-muted">BOQ</h5>
              {tender.boq ? (
                <a href={tender.boq} className="btn btn-primary" download>
                  Download BOQ
                </a>
              ) : (
                <p className="lead">No BOQ available</p>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="text-muted">State</h5>
              <p className="lead">{tender.state}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="text-muted">District</h5>
              <p className="lead">{tender.district}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
