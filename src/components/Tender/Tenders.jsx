import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import data from "./data.json"; // Assuming your JSON file is named 'data.json' and is in the same directory

const Tenders = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [department, setDepartment] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState({
    states: [],
    districts: [],
    departments: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Load states from the local JSON file
    const states = data.states.map((stateObj) => stateObj.state);
    setDropdownOptions((prev) => ({ ...prev, states }));
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setDistrict("");
    setDepartment("");

    if (selectedState) {
      const selectedStateData = data.states.find(
        (s) => s.state === selectedState
      );
      if (selectedStateData) {
        setDropdownOptions((prev) => ({
          ...prev,
          districts: selectedStateData.districts,
          departments: selectedStateData.departments,
        }));
      }
    } else {
      setDropdownOptions((prev) => ({
        ...prev,
        districts: [],
        departments: [],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/tenders", {
        params: { state, district, department },
      });
      const tenders = response.data.tenders;

      // Navigate to ShowTenders component and pass the tenders
      navigate("/show-tenders", { state: { tenders } });
    } catch (err) {
      setError("Error fetching tender details");
      console.error("Error fetching tender details:", err);
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
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="state" className="form-label">
                State:
              </label>
              <select
                id="state"
                name="state"
                className="form-select"
                required
                value={state}
                onChange={handleStateChange}
              >
                <option value="">Select a State</option>
                {dropdownOptions.states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="district" className="form-label">
                District:
              </label>
              <select
                id="district"
                name="district"
                className="form-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!state} // Disable if no state is selected
              >
                <option value="">Select a District</option>
                {dropdownOptions.districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="department" className="form-label">
                Department:
              </label>
              <select
                id="department"
                name="department"
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={!state} // Disable if no state is selected
              >
                <option value="">Select a Department</option>
                {dropdownOptions.departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Search Tenders
        </button>
      </form>
    </div>
  );
};

export default Tenders;
