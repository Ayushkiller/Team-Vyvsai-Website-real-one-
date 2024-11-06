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
      <header className="text-center mb-5">
        <h1 className="display-5">Tender Details</h1>
        <button
          className="btn btn-outline-secondary mt-3"
          onClick={() => navigate(-1)}
        >
          Back to Results
        </button>
      </header>

      <section className="mb-5">
        <h2 className="h5 text-muted">Tender ID</h2>
        <p className="lead">{tender.tender_id}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Organization</h2>
        <p className="lead">{tender.org_name}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Title</h2>
        <p className="lead">{tender.title}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Category</h2>
        <p className="lead">{tender.category}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Price</h2>
        <p className="lead">{tender.price}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Address</h2>
        <p className="lead">{tender.address}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">Closing Date</h2>
        <p className="lead">{tender.closing_date}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">State</h2>
        <p className="lead">{tender.state}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">District</h2>
        <p className="lead">{tender.district}</p>
      </section>

      <section className="mb-5">
        <h2 className="h5 text-muted">BOQ</h2>
        {tender.boq && tender.boq.trim().toLowerCase() !== "none" ? (
          <a
            href={tender.boq}
            className="btn btn-primary"
            download
            target="_self"
          >
            Download BOQ
          </a>
        ) : (
          <p className="text-secondary">No BOQ available</p>
        )}
      </section>
    </div>
  );
};

export default TenderDetail;
