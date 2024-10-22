import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TenderTable from './TenderTable';

const TenderResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tenders } = location.state || { tenders: [] };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Search Results</h2>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          New Search
        </button>
      </div>
      {tenders.length > 0 ? (
        <TenderTable tenders={tenders} />
      ) : (
        <div className="alert alert-info">
          No tenders found matching your criteria.
          <button 
            className="btn btn-link"
            onClick={() => navigate('/')}
          >
            Try a different search
          </button>
        </div>
      )}
    </div>
  );
};

export default TenderResults;
