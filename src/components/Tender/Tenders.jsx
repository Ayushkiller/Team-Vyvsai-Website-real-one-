import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import currentData from '../current.json';

axios.defaults.baseURL = 'https://dbbackend.something.vyvsai.com/api';

const Tenders = () => {
  const navigate = useNavigate();
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
      if (response.data.tenders.length > 0) {
        navigate('/tender-results', { state: { tenders: response.data.tenders } });
      } else {
        setError('No tenders found matching your criteria.');
      }
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
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-3">
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
          <div className="col-md-3">
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
          <div className="col-md-3">
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
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Tenders'}
        </button>
      </form>
    </div>
  );
};

export default Tenders;