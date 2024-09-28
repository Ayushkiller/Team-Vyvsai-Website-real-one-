import React, { useState, useEffect } from 'react';

const StateDistrictDepartmentSelector = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    // Fetch and populate states
    fetch('/tenders/states')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
      })
      .catch((error) => console.error('Error fetching states:', error));
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Fetch districts for the selected state
      fetch(`/tenders/districts/${selectedState}`)
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.districts);
        })
        .catch((error) => console.error('Error fetching districts:', error));

      // Fetch departments for the selected state
      fetch(`/tenders/departments/${selectedState}`)
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data.departments);
        })
        .catch((error) => console.error('Error fetching departments:', error));
    } else {
      setDistricts([]);
      setDepartments([]);
    }
  }, [selectedState]);

  return (
    <div className="container mt-5 pt-4">
      <h1 className="mb-4">Select State</h1>
      <form action="/tenders/list" method="GET">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="state" className="form-label">State:</label>
              <select
                id="state"
                name="state"
                className="form-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                required
              >
                <option value="">Select a State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedState && (
            <div className="col-md-6" id="district-container">
              <div className="form-group">
                <label htmlFor="district" className="form-label">District:</label>
                <select
                  id="district"
                  name="district"
                  className="form-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Select a District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {selectedState && (
            <div className="col-md-6" id="department-container">
              <div className="form-group">
                <label htmlFor="department" className="form-label">Department:</label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  required
                >
                  <option value="">Select a Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default StateDistrictDepartmentSelector;