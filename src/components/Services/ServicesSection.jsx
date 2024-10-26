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
      <div className=" rounded-3">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row d-flex justify-content-center">
          {/* First card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 100 ? "0" : "-150%"})`,
                opacity: scrollPos > 100 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-star-fill text-warning me-2"></i>{" "}
                    {/* Yellow icon */}
                    Free Trial in Himachal Pradesh
                  </h5>
                  <p className="card-text fs-6">
                    Currently offering a free trial of the SaaS model to over
                    500 contractors, proprietors, and construction company
                    owners in Himachal Pradesh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 100 ? "0" : "150%"})`,
                opacity: scrollPos > 100 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-bell-fill text-info me-2"></i>{" "}
                    {/* Blue icon */}
                    Tender Notifications
                  </h5>
                  <p className="card-text fs-6">
                    AI-driven notifications to inform construction companies
                    about relevant tenders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 300 ? "0" : "-150%"})`,
                opacity: scrollPos > 300 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-predictive-text text-success me-2"></i>{" "}
                    {/* Green icon */}
                    Bid Prediction
                  </h5>
                  <p className="card-text fs-6">
                    Machine learning models that predict successful bid amounts,
                    helping companies make competitive and profitable bids.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 300 ? "0" : "150%"})`,
                opacity: scrollPos > 300 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-cart-fill text-danger me-2"></i>{" "}
                    {/* Red icon */}
                    Marketplace Creation
                  </h5>
                  <p className="card-text fs-6">
                    Leveraging data to build a marketplace that connects
                    construction companies with suppliers, contractors, and
                    other stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fifth card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 500 ? "0" : "-150%"})`,
                opacity: scrollPos > 500 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-clipboard-data text-primary me-2"></i>{" "}
                    {/* Blue icon */}
                    Consultancy on Bidding
                  </h5>
                  <p className="card-text fs-6">
                    Providing expert advice and guidance on bid filing based on
                    data and machine learning predictions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sixth card */}
          <div className="col-sm-12 col-md-6 mb-4 d-flex">
            <div
              className="card-container h-100 w-100"
              style={{
                transform: `translateX(${scrollPos > 500 ? "0" : "150%"})`,
                opacity: scrollPos > 500 ? 1 : 0,
              }}
            >
              <div className="card h-100 border border-primary border-opacity-50">
                <div className="card-body">
                  <h5 className="card-title fs-5">
                    <i className="bi bi-cash-coin text-warning me-2"></i>{" "}
                    {/* Yellow icon */}
                    Fintech Solutions
                  </h5>
                  <p className="card-text fs-6">
                    Integrating financial technology solutions to address all
                    construction-related financial challenges, such as payment
                    processing, invoicing, and loan facilitation.
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
