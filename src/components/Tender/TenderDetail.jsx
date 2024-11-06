import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

const TenderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tender } = location.state || {};

  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (tender?.closing_date) {
      const closingDate = new Date(tender.closing_date);
      const now = new Date();
      const days = differenceInDays(closingDate, now);
      const hours = differenceInHours(closingDate, now) % 24;
      const minutes = differenceInMinutes(closingDate, now) % 60;

      setTimeRemaining(`${days} days left`);
    }
  }, [tender]);

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
      <div className="mb-4 d-flex align-items-center">
        <FaFileAlt className="text-primary me-2" size={28} />
        <h2 className="mb-0">Tender Details</h2>
        <span className="badge bg-success ms-auto">{timeRemaining}</span>
      </div>

      <p>
        <strong>Title:</strong> {tender.title}
      </p>
      <p>
        <strong>Organization:</strong> {tender.org_name}
      </p>
      <p>
        <strong>Category:</strong> {tender.category}
      </p>
      <p>
        <strong>Price:</strong> {tender.price}
      </p>
      <p>
        <strong>Address:</strong> {tender.address}
      </p>
      <p>
        <strong>State:</strong> {tender.state}
      </p>
      <p>
        <strong>District:</strong> {tender.district}
      </p>
      <p>
        <strong>Closing Date:</strong>{" "}
        {format(new Date(tender.closing_date), "dd-MMM-yyyy hh:mm a")}
      </p>
      <p>
        <strong>BOQ:</strong>
        {tender.boq && tender.boq.trim().toLowerCase() !== "none" ? (
          <a href={tender.boq} className="btn btn-primary ms-2" download>
            Download BOQ
          </a>
        ) : (
          <span className="ms-2">No BOQ available</span>
        )}
      </p>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back to Results
      </button>
    </div>
  );
};

export default TenderDetail;
