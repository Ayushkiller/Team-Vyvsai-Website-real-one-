import React, { useState, useEffect } from 'react';

const StateDistrictSelector = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    // Fetch and populate states
    fetch('/states')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
      })
      .catch((error) => console.error('Error fetching states:', error));
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Fetch districts for the selected state
      fetch(`/districts/${selectedState}`)
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.districts);
        })
        .catch((error) => console.error('Error fetching districts:', error));
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  return (
    <div>
      <h1>Select Your State and District</h1>
      <form>
        {/* State Selection */}
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
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

        {/* District Selection */}
        {selectedState && (
          <div id="district-container">
            <label htmlFor="district">District:</label>
            <select
              id="district"
              name="district"
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
        )}
      </form>
    </div>
  );
};

export default StateDistrictSelector;