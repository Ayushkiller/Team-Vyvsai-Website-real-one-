import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TenderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const response = await fetch(`/api/tenders/${id}`); // Make API call to fetch tender by ID
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTender(data); // Set the fetched tender data
      } catch (err) {
        setError(err.message); // Set error if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchTender();
  }, [id]); // Run the effect when ID changes

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message
  if (!tender) return <div>No tender found</div>; // Handle case where no tender is found

  return (
    <div className="tender-details">
      <h2>Tender Details</h2>
      <table className="table table-bordered table-hover">
        <tbody>
          <tr>
            <td>
              <strong>Tender ID:</strong>
            </td>
            <td>{tender.tender_id}</td>
          </tr>
          <tr>
            <td>
              <strong>Title:</strong>
            </td>
            <td>{tender.title}</td>
          </tr>
          <tr>
            <td>
              <strong>Organization:</strong>
            </td>
            <td>{tender.org_name}</td>
          </tr>
          <tr>
            <td>
              <strong>Category:</strong>
            </td>
            <td>{tender.category}</td>
          </tr>
          <tr>
            <td>
              <strong>District:</strong>
            </td>
            <td>{tender.district}</td>
          </tr>
          <tr>
            <td>
              <strong>Price:</strong>
            </td>
            <td>{tender.price}</td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
            </td>
            <td>{tender.address}</td>
          </tr>
          <tr>
            <td>
              <strong>Closing Date:</strong>
            </td>
            <td>{new Date(tender.closing_date).toLocaleString()}</td>
          </tr>
          <tr>
            <td>
              <strong>Published Date:</strong>
            </td>
            <td>{new Date(tender.published_date).toLocaleString()}</td>
          </tr>
          <tr>
            <td>
              <strong>BOQ:</strong>
            </td>
            <td>{tender.boq}</td>
          </tr>
          <tr>
            <td>
              <strong>State:</strong>
            </td>
            <td>{tender.state}</td>
          </tr>
          <tr>
            <td>
              <strong>Expired:</strong>
            </td>
            <td>{tender.expired ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TenderDetails;
