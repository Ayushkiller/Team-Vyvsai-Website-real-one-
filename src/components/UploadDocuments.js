import React, { useState } from 'react';

const UploadDocuments = () => {
  const [formData, setFormData] = useState({
    tenderId: '',
    mobileNo: '',
    files: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'files') {
      setFormData({
        ...formData,
        files: files
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="container my-5 pt-4">
      <h2 className="text-center mb-4"><strong>Upload Your Documents</strong></h2>
      <div className="card">
        <div className="card-body">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Tender ID */}
            <div className="mb-3">
              <label htmlFor="tenderId" className="form-label"><strong>Tender ID</strong></label>
              <input
                type="text"
                className="form-control"
                id="tenderId"
                name="tenderId"
                required
                placeholder="Enter Tender ID"
                value={formData.tenderId}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-3">
              <label htmlFor="mobileNo" className="form-label"><strong>Mobile Number</strong></label>
              <input
                type="text"
                className="form-control"
                id="mobileNo"
                name="mobileNo"
                required
                placeholder="Enter Mobile Number"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>

            {/* File Upload */}
            <div className="mb-3">
              <label htmlFor="files" className="form-label"><strong>Choose Files</strong></label>
              <input
                type="file"
                className="form-control"
                id="files"
                name="files"
                multiple
                required
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-block">
                <strong>Upload Documents</strong>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;