import React from 'react';
import { useNavigate } from 'react-router-dom';

const TenderTable = ({ tenders }) => {
  const navigate = useNavigate();

  const handleViewDetails = (tender) => {
    navigate('/tender-detail', { state: { tender } });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tender ID</th>
            <th>Title</th>
            <th>Organization</th>
            <th>Price</th>
            <th>Closing Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender, index) => (
            <tr key={index}>
              <td>{tender.tender_id}</td>
              <td>{tender.title}</td>
              <td>{tender.org_name}</td>
              <td>{tender.price}</td>
              <td>{tender.closing_date}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewDetails(tender)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenderTable;
