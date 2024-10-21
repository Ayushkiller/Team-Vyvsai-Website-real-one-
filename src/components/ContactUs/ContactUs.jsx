import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically handle form submission (e.g., send a request to your API)
    // For demonstration, we'll simulate a successful submission
    setSuccess("Your message has been sent successfully!");

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="mt-5 py-5">
      {success && (
        <div className="alert alert-success w-75 mx-auto mt-5 pt-4">
          {success}
        </div>
      )}

      {/* Heading Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
        <p className="lead text-muted mb-4">
          We’re here to assist you. Reach out to us through any of the methods
          below!
        </p>
      </div>

      {/* Contact Information and Office Hours Section */}
      <div className="row g-4">
        {/* Contact Information */}
        <div className="col-lg-6">
          <div className="card border-dark shadow-sm rounded-3 ">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                Contact Information
              </h3>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope-fill fs-4 me-3"></i>
                <div>
                  <strong>Email:</strong>
                  <a href="mailto:support@vyvsai.com">support@vyvsai.com</a>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-phone-fill fs-4 me-3"></i>
                <div>
                  <strong>Phone:</strong>
                  <a href="tel:+919773988392">+91 9773988392</a>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-geo-alt-fill fs-4 me-3"></i>
                <div>
                  <strong>Address:</strong>
                  <p className="mb-0">
                    IIF Centre of Incubation, 8th Floor, Bawana, Delhi (110042)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="col-lg-6">
          <div className="card border-dark shadow-sm rounded-3 ">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Office Hours</h3>
              <p className="mb-3 d-flex align-items-center">
                <i className="bi bi-clock-fill fs-4 me-3"></i>
                <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM IST
              </p>
              <p className="mb-0 d-flex align-items-center">
                <i className="bi bi-clock-history fs-4 me-3"></i>
                We aim to respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mt-5 border border-dark rounded-3 p-3 w-75">
        <h3 className="text-center fw-bold mb-4">Get in Touch</h3>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="text-center mt-5">
        <h3 className="fw-bold text-primary mb-3">Follow Us</h3>
        <p className="lead text-muted mb-4">
          Stay connected with us on social media:
        </p>
        <a
          href="https://www.linkedin.com/company/monoxosvyvsai-pvt-lmt/"
          className="btn btn-outline-primary btn-lg d-inline-flex align-items-center"
          style={{ transition: "background-color 0.3s, color 0.3s" }}
        >
          <img
            src="linkdin-logo.svg"
            alt="LinkedIn"
            className="me-2"
            style={{ maxWidth: "40px" }}
          />
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
