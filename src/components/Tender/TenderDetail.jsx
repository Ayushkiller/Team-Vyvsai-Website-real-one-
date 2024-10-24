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
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="text-muted">
                  <strong>Tender ID</strong>
                </td>
                <td>{tender.tender_id}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Organization</strong>
                </td>
                <td>{tender.org_name}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Title</strong>
                </td>
                <td>{tender.title}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Category</strong>
                </td>
                <td>{tender.category}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Price</strong>
                </td>
                <td>{tender.price}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Address</strong>
                </td>
                <td>{tender.address}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>Closing Date</strong>
                </td>
                <td>
                  {new Date(tender.closing_date).toLocaleDateString("en-IN")}
                </td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>BOQ</strong>
                </td>
                <td>
                  {tender.boq ? (
                    <a href={tender.boq} className="btn btn-primary" download>
                      Download BOQ
                    </a>
                  ) : (
                    <span>No BOQ available</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>State</strong>
                </td>
                <td>{tender.state}</td>
              </tr>
              <tr>
                <td className="text-muted">
                  <strong>District</strong>
                </td>
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
