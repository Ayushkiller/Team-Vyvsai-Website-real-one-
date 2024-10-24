import React from "react";
import "./Mission.css"; // Import your CSS file for custom styles

const Mission = () => (
  <section className="mission-section bg-light rounded-3 mb-3 p-4 mt-4">
    <div className="text-primary-emphasis">
      <h2 className="text-center d-flex align-items-center">
        <i
          className="bi bi-bullseye me-2 text-primary"
          style={{ fontSize: "2rem" }}
        ></i>
        Our Mission
      </h2>
      <p className="text-justify">
        Our mission is to revolutionize the construction industry by providing
        cutting-edge AI-powered solutions that ensure project compliance,
        enhance operational efficiency, and foster transparency. We are
        committed to empowering construction companies with intelligent
        monitoring tools, comprehensive data integration, and a robust
        marketplace. By integrating fintech solutions, we aim to streamline
        financial processes, improve access to capital, and enable seamless
        transactions, driving sustainable growth and innovation across
        government and private sector projects.
      </p>
    </div>
  </section>
);

export default Mission;
