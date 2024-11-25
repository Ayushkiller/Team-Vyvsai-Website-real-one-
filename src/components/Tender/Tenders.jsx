import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import currentData from "../current.json";
import "./Tenders.css"; // Ensure you have this CSS file imported

axios.defaults.baseURL = "https://dbbackend.something.vyvsai.com/api";

const Tenders = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    setLoading(true);
    try {
      const states = currentData.states.map((stateObj) => stateObj.state);
      setDropdownOptions((prev) => ({ ...prev, states }));
    } catch (err) {
      console.error("Error fetching states:", err);
      setError(`Error fetching states: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setDistrict("");
    setDepartment("");
    if (selectedState) {
      try {
        const stateObj = currentData.states.find(
          (stateObj) => stateObj.state === selectedState
        );
        const districts = stateObj.districts;
        const departments = stateObj.departments;
        setDropdownOptions((prev) => ({
          ...prev,
          districts,
          departments,
        }));
      } catch (err) {
        setError("Error fetching districts or departments");
        console.error("Error fetching districts or departments:", err);
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
      const response = await axios.get("/tenders", {
        params: { state, district, department },
      });
      if (response.data.tenders.length > 0) {
        navigate("/tender-results", {
          state: { tenders: response.data.tenders },
        });
      } else {
        setError("No tenders found matching your criteria.");
      }
    } catch (err) {
      setError("Error fetching tender details");
      console.error("Error fetching tender details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 mt-1">
      <div className="d-flex justify-content-center align-items-center meraPyaratenderForm pb-2 mt-4">
        <div
          className="form-container container p-3 shadow-lg rounded border border-primary"
          style={{ marginTop: "20px" }}
        >
          <h1 className="mb-4 text-center">Tender Search</h1>
          {loading && (
            <div className="loading-animation">
              <div className="loading-circle"></div>
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 col-12 justify-content-center">
              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  <i className="bi bi-map text-primary fs-5 me-2"></i>
                  State <span className="text-danger">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  className="form-select form-control-lg cursor-pointer"
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
            <div className="mb-3 col-12">
              <div className="form-group">
                <label htmlFor="district" className="form-label">
                  <i className="bi bi-geo-alt text-primary fs-5 me-2"></i>
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  className={`form-select form-control-lg ${
                    state ? "cursor-pointer" : "disabled cursor-disabled"
                  }`}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!state}
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
            <div className="mb-3 col-12">
              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  <i className="bi bi-building text-primary fs-5 me-2"></i>
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-select form-control-lg ${
                    state ? "cursor-pointer" : "disabled cursor-disabled"
                  }`}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={!state}
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
            <div className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-primary w-50"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Tenders"}
              </button>
            </div>
          </form>
          <div className="mt-2" style={{ minHeight: "20px" }}></div>{" "}
          {/* Optional space if needed */}
        </div>
      </div>
    </div>
  );
};

export default Tenders;
