import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TenderTable = ({ tenders, state = '', district = '', organization = '' }) => {
  const navigate = useNavigate();
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    async function fetchExchangeRate() {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        setExchangeRate(response.data.rates.USD);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    }
    fetchExchangeRate();
  }, []);

  const handleViewDetails = (tender) => {
    navigate('/tender-detail', { state: { tender } });
  };

  const filteredTenders = tenders
    .filter(tender =>
      (tender.state?.toLowerCase().includes(state.toLowerCase()) || state === '') &&
      (tender.district?.toLowerCase().includes(district.toLowerCase()) || district === '') &&
      (tender.organization?.toLowerCase().includes(organization.toLowerCase()) || organization === '')
    )
    .sort((a, b) => {
      if (a.price === 'N/A') return 1;
      if (b.price === 'N/A') return -1;
      return parseFloat(a.price.replace(/,/g, '')) - parseFloat(b.price.replace(/,/g, ''));
    });

  const formatIndianNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Tender ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Closing Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTenders.map((tender, index) => (
            <tr key={index}>
              <td>{tender.tender_id}</td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => handleViewDetails(tender)}
                >
                  {tender.title}{' '}
                  {tender.price !== 'N/A' && exchangeRate ? (
                    <span className="badge bg-secondary ms-2">
                      $ {formatIndianNumber(parseFloat(tender.price * exchangeRate).toFixed(2))}
                    </span>
                  ) : null}
                </button>
              </td>
              <td>{tender.price === 'N/A' ? 'N/A' : `₹ ${formatIndianNumber(tender.price)}`}</td>
              <td>{tender.closing_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenderTable;