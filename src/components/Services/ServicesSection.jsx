import React, { useEffect, useState, useRef } from "react";
import "./ServicesSection.css";

const ServicesSection = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const sectionRef = useRef(null);

  const handleScroll = () => {
    const sectionTop = sectionRef.current?.offsetTop || 0;
    const scrollY = window.scrollY + window.innerHeight * 0.75; // Trigger earlier, 75% of the viewport height
    setScrollPos(scrollY - sectionTop); // Adjust scroll position based on section top
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-section mb-3">
      <div className="container rounded-3">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row justify-content-center">
          {/* First card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 100 ? "0" : "-150%"})`,
                opacity: scrollPos > 100 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title">Free Trial in Himachal Pradesh</h5>
                  <p className="card-text">
                    Currently offering a free trial of the SaaS model to over 500 contractors, proprietors, and construction company owners in Himachal Pradesh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 100 ? "0" : "150%"})`,
                opacity: scrollPos > 100 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-75">
                <div className="card-body">
                  <h5 className="card-title">Tender Notifications</h5>
                  <p className="card-text">
                    AI-driven notifications to inform construction companies about relevant tenders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 300 ? "0" : "-150%"})`,
                opacity: scrollPos > 300 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title">Bid Prediction</h5>
                  <p className="card-text">
                    Machine learning models that predict successful bid amounts, helping companies make competitive and profitable bids.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 300 ? "0" : "150%"})`,
                opacity: scrollPos > 300 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title">Marketplace Creation</h5>
                  <p className="card-text">
                    Leveraging data to build a marketplace that connects construction companies with suppliers, contractors, and other stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fifth card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 500 ? "0" : "-150%"})`,
                opacity: scrollPos > 500 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title">Consultancy on Bidding</h5>
                  <p className="card-text">
                    Providing expert advice and guidance on bid filing based on data and machine learning predictions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sixth card */}
          <div className="col-sm-12 col-md-6 mb-4">
            <div
              className="card-container"
              style={{
                transform: `translateX(${scrollPos > 500 ? "0" : "150%"})`,
                opacity: scrollPos > 500 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title">Fintech Solutions</h5>
                  <p className="card-text">
                    Integrating financial technology solutions to address all construction-related financial challenges, such as payment processing, invoicing, and loan facilitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;