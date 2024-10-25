import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TenderTable from "./TenderTable";

const TenderResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenders, state, district, organization } = location.state || {
    tenders: [],
    state: "",
    district: "",
    organization: "",
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Search Results</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/tenders")}
        >
          New Search
        </button>
      </div>
      {tenders.length > 0 ? (
        <TenderTable
          tenders={tenders}
          state={state}
          district={district}
          organization={organization}
        />
      ) : (
        <div className="alert alert-info">
          No Active tenders found matching your criteria.
          <button className="btn btn-link" onClick={() => navigate("/tenders")}>
            Try a different search
          </button>
        </div>
      )}
    </div>
  );
};

export default TenderResults;
