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
    <div className="mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Tender Details</h3>
          <button className="btn btn-light" onClick={() => navigate(-1)}>
            Back to Results
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th className="text-muted">Tender ID</th>
                <td>{tender.tender_id}</td>
              </tr>
              <tr>
                <th className="text-muted">Organization</th>
                <td>{tender.org_name}</td>
              </tr>
              <tr>
                <th className="text-muted">Title</th>
                <td>{tender.title}</td>
              </tr>
              <tr>
                <th className="text-muted">Category</th>
                <td>{tender.category}</td>
              </tr>
              <tr>
                <th className="text-muted">Price</th>
                <td>{tender.price}</td>
              </tr>
              <tr>
                <th className="text-muted">Address</th>
                <td>{tender.address}</td>
              </tr>
              <tr>
                <th className="text-muted">Closing Date</th>
                <td>
                  {new Date(tender.closing_date).toLocaleDateString("en-IN")}
                </td>
              </tr>
              <tr>
                <th className="text-muted">BOQ</th>
                <td>
                  {tender.boq ? (
                    <a href={tender.boq} className="btn btn-primary" download target="_self">
                    Download BOQ
                  </a>
                  ) : (
                    <span>No BOQ available</span>
                  )}
                </td>
              </tr>
              <tr>
                <th className="text-muted">State</th>
                <td>{tender.state}</td>
              </tr>
              <tr>
                <th className="text-muted">District</th>
                <td>{tender.district}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
