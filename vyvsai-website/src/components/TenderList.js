import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can change the limit as needed

  const location = useLocation();
  const { state, district, department } = queryString.parse(location.search);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch(
          `/tenders/list?state=${state}&district=${district}&department=${department}&page=${page}&limit=${limit}`
        );
        const data = await response.json();
        setTenders(data.tenders);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };

    fetchTenders();
  }, [state, district, department, page, limit]);

  return (
    <div className="mt-5 pt-4">
      <h1 className="my-4 text-center">
        Latest {department} Tenders in {district}
      </h1>
      <hr />

      <div className="table-responsive">
        {tenders.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col" style={{ maxWidth: '150px' }}>Location</th>
                <th scope="col">Price</th>
                <th scope="col">Closing Date</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender._id}>
                  <td>
                    <a href={`/tenders/${tender._id}`}>{tender.title}</a>
                  </td>
                  <td style={{ maxWidth: '200px' }}>{tender.district}</td>
                  <td>₹{tender.price}</td>
                  <td>{tender.closing_date}</td>
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

      {tenders.length > 0 && totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
              <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(i)}
                >
                  {i}
                </button>
              </li>
            ))}

            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TenderList;