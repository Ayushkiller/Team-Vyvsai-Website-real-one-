import React, { useState, useEffect } from 'react';
import axios from 'axios';
import currentData from '../current.json'; // Import the JSON data

axios.defaults.baseURL = 'https://dbbackend.something.vyvsai.com/api';

const Tenders = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [department, setDepartment] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState({
    states: [],
    districts: [],
    departments: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tenderDetails, setTenderDetails] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    setLoading(true);
    try {
      const states = currentData.states.map(stateObj => stateObj.state);
      setDropdownOptions(prev => ({ ...prev, states }));
    } catch (err) {
      console.error('Error fetching states:', err);
      setError(`Error fetching states: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setDistrict('');
    setDepartment('');
    if (selectedState) {
      try {
        const stateObj = currentData.states.find(stateObj => stateObj.state === selectedState);
        const districts = stateObj.districts;
        const departments = stateObj.departments;
        setDropdownOptions(prev => ({
          ...prev,
          districts,
          departments
        }));
      } catch (err) {
        setError('Error fetching districts or departments');
        console.error('Error fetching districts or departments:', err);
      }
    } else {
      setDropdownOptions(prev => ({ ...prev, districts: [], departments: [] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/tenders', {
        params: { state, district, department }
      });
      const filteredTenders = response.data.tenders.filter(tender => !tender.expired);
      setTenderDetails(filteredTenders);
    } catch (err) {
      setError('Error fetching tender details');
      console.error('Error fetching tender details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">Tender Search</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="state" className="form-label">State:</label>
              <select
                id="state"
                name="state"
                className="form-select"
                required
                value={state}
                onChange={handleStateChange}
              >
                <option value="">Select a State</option>
                {dropdownOptions.states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="district" className="form-label">District:</label>
              <select
                id="district"
                name="district"
                className="form-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select a District</option>
                {dropdownOptions.districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="department" className="form-label">Department:</label>
              <select
                id="department"
                name="department"
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select a Department</option>
                {dropdownOptions.departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Search Tenders</button>
      </form>

      {tenderDetails && tenderDetails.length > 0 && (
        <div className="mt-5">
          <h2 className="mb-4">Tender Details</h2>
          {tenderDetails.map((tender, index) => (
            <div key={index} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{tender.title}</h5>
                <p className="card-text"><strong>Tender ID:</strong> {tender.tender_id}</p>
                <p className="card-text"><strong>Organization:</strong> {tender.org_name}</p>
                <p className="card-text"><strong>Category:</strong> {tender.category}</p>
                <p className="card-text"><strong>Price:</strong> {tender.price}</p>
                <p className="card-text"><strong>Address:</strong> {tender.address}</p>
                <p className="card-text"><strong>Closing Date:</strong> {tender.closing_date}</p>
                {tender.boq && tender.boq.length ? (
                  <a href={tender.boq} className="btn btn-primary" download>Download BOQ</a>
                ) : (
                  <span className="text-muted">No BOQ available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tenders;