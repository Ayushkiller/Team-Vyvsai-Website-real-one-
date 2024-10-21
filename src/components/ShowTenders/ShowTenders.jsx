import React from "react";
import { useLocation, Link } from "react-router-dom";

const ShowTenders = () => {
  const location = useLocation();
  const { tenders, department, district } = location.state || { tenders: [] };

  console.log("Department:", department);
  console.log("District:", district);

  return (
    <div>
      <h1 className="text-center">
        <strong>
          Latest {department} Tenders in {district}
        </strong>
      </h1>
      <hr />

      <div className="table-responsive">
        {tenders.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="text-center align-middle">
                  <i className="bi bi-file-earmark-text"></i> Title
                </th>
                <th
                  scope="col"
                  className="text-center align-middle"
                  style={{ maxWidth: "150px" }}
                >
                  <i className="bi bi-geo-alt"></i> Location
                </th>
                <th scope="col" className="text-center align-middle">
                  <i className="bi bi-currency-rupee"></i> Price
                </th>
                <th scope="col" className="text-center align-middle">
                  <i className="bi bi-calendar-event"></i> Closing Date
                </th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender._id}>
                  <td>
                    <Link to={`/tenders/${tender._id}`}>{tender.title}</Link>
                  </td>
                  <td style={{ maxWidth: "200px" }}>{tender.district}</td>
                  <td>
                    <strong>₹{tender.price}</strong>
                  </td>
                  <td>{new Date(tender.closing_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">
            No tenders found for {department} in {district}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowTenders;
