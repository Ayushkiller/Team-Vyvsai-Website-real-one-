import React from 'react';
import Mission from '../Mission/Mission';
import Services from '../Services/ServicesSection';
import CoreValues from '../CoreValues/CoreValues';
import Reviews from '../Reviews';

const HomePage = ({ success, error }) => (
  <div className="home-page">
    {success && success.length > 0 && (
      <div className="alert alert-success mt-5 pt-4">{success}</div>
    )}
    {error && error.length > 0 && (
      <div className="alert alert-danger mt-5 pt-4">{error}</div>
    )}
    <section className="hero-section">
      <div className="container text-white-subtle">
        <h1>Welcome to Vyvsai</h1>
        <p className="text-justify text-center">
          We provide an AI-powered SaaS platform that automates tender management,
          integrates marketplace for construction materials, and introduces
          fintech solutions to streamline and optimize the construction industry’s
          procurement process.
        </p>
      </div>
    </section>

    <Mission />
    <Services />
    <CoreValues />
    <section className="testimonials-section bg-primary-subtle">
      <div className="container">
        <h2 className="text-center">Reviews</h2>
        <div className="row">
          <div className="col-md-6 rounded">
            <div className="testimonial">
              <p className="text-justify">
                "Vyvsai has completely revolutionized our bidding process. Their
                AI-driven notifications and bid predictions have given us a
                competitive edge, while the marketplace has streamlined our
                procurement. The free trial in Himachal Pradesh has been
                incredibly beneficial, making Vyvsai an essential tool for our
                business."
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="testimonial">
              <p className="text-justify">
                "Vyvsai's SaaS model has been invaluable for us. It not only helps
                us fill out and submit bids efficiently but also accurately
                predicts bid outcomes, giving us a significant advantage. The free
                trial in Himachal Pradesh has proven to be a game-changer."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;