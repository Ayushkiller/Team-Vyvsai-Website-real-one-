import React from 'react';

const ServicesSection = () => (
  <section className="services-section py-5">
    <div className="container">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50" style={{ borderRadius: '10px' }}>
            <div className="card-body">
              <h5 className="card-title">Free Trial in Himachal Pradesh</h5>
              <p className="card-text">
                Currently offering a free trial of the SaaS model to over 500
                contractors, proprietors, and construction company owners in
                Himachal Pradesh.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-75">
            <div className="card-body">
              <h5 className="card-title">Tender Notifications</h5>
              <p className="card-text">
                AI-driven notifications to inform construction companies about
                relevant tenders.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50">
            <div className="card-body">
              <h5 className="card-title">Bid Prediction</h5>
              <p className="card-text">
                Machine learning models that predict successful bid amounts,
                helping companies make competitive and profitable bids.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50">
            <div className="card-body">
              <h5 className="card-title">Marketplace Creation</h5>
              <p className="card-text">
                Leveraging data to build a marketplace that connects
                construction companies with suppliers, contractors, and other
                stakeholders.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50">
            <div className="card-body">
              <h5 className="card-title">Consultancy on Bidding</h5>
              <p className="card-text">
                Providing expert advice and guidance on bid filing based on data
                and machine learning predictions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50">
            <div className="card-body">
              <h5 className="card-title">Fintech Solutions</h5>
              <p className="card-text">
                Integrating financial technology solutions to address all
                construction-related financial challenges, such as payment
                processing, invoicing, and loan facilitation.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border border-primary border-opacity-50">
            <div className="card-body">
              <h5 className="card-title text-primary-emphasis">
                Material Supply Focus
              </h5>
              <p className="card-text">
                Emphasizing the supply of construction materials as a key
                service, distinguishing your platform from competitors.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <p className="lead">Our offerings include:</p>
        <ul className="list-unstyled">
          <li>
            <i className="bi bi-check-circle text-success"></i> Real-time
            notifications via WhatsApp and email.
          </li>
          <li>
            <i className="bi bi-check-circle text-success"></i> Customizable plans
            based on project size and scope.
          </li>
          <li>
            <i className="bi bi-check-circle text-success"></i> Comprehensive tender
            tracking across multiple regions.
          </li>
          <li>
            <i className="bi bi-check-circle text-success"></i> Flexible pricing
            plans tailored to your specific needs.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default ServicesSection;