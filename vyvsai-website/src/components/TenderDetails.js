import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TenderDetails = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const response = await fetch(`/tenders/${id}`);
        const data = await response.json();
        setTender(data.tender);
      } catch (error) {
        console.error('Error fetching tender details:', error);
      }
    };

    fetchTenderDetails();
  }, [id]);

  if (!tender) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5 pt-4">
      <h2 className="text-center mb-4"><strong>Tender Details</strong></h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Field</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Tender ID</th>
                <td>{tender.tender_id}</td>
              </tr>
              <tr>
                <th scope="row">Title</th>
                <td>{tender.title}</td>
              </tr>
              <tr>
                <th scope="row">Organization Name</th>
                <td>{tender.org_name}</td>
              </tr>
              <tr>
                <th scope="row">Category</th>
                <td>{tender.category}</td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>{tender.price}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{tender.address}</td>
              </tr>
              <tr>
                <th scope="row">Closing Date</th>
                <td>{tender.closing_date}</td>
              </tr>
              <tr>
                <th scope="row">BOQ</th>
                <td>
                  {tender.boq && tender.boq.length ? (
                    <a href={tender.boq} className="btn btn-primary" download>
                      Download BOQ
                    </a>
                  ) : (
                    <span className="btn btn-primary">No BOQ Found</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;