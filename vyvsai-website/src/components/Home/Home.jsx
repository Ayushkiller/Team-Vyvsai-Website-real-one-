import React from "react";
import Mission from "../Mission/Mission";
import Services from "../Services/ServicesSection";
import CoreValues from "../CoreValues/CoreValues";
import Reviews from "../Reviews";

const HomePage = ({ success, error }) => (
  <div className="home-page">
    {success && success.length > 0 && (
      <div className="alert alert-success mt-5 pt-4">{success}</div>
    )}
    {error && error.length > 0 && (
      <div className="alert alert-danger mt-5 pt-4">{error}</div>
    )}
    <section className="hero-section mb-3 rounded-3">
      <div className="container text-white-subtle text-center">
        <h1>Welcome to Vyvsai</h1>
        <p className="text-justify text-center">
          We provide an AI-powered SaaS platform that automates tender
          management, integrates marketplace for construction materials, and
          introduces fintech solutions to streamline and optimize the
          construction industry’s procurement process.
        </p>
      </div>
    </section>

    <Mission />
    <Services />
    <CoreValues />
    <Reviews />
  </div>
);

export default HomePage;
