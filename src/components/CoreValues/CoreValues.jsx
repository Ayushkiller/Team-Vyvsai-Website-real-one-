import React from "react";

const CoreValues = () => (
  <section className="values-section p-1 mb-3">
    <div className="container text-primary-emphasis rounded-3">
      <h2 className="text-center mb-4">Our Core Values</h2>
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div className="card border border-primary border-opacity-75">
            <div className="card-header">Efficiency</div>
            <div className="card-body">
              We strive to maximize your time by providing quick and reliable
              notifications.
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card border border-primary border-opacity-75">
            <div className="card-header">Transparency</div>
            <div className="card-body">
              Clear communication and honesty are at the heart of everything we
              do.
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card core border border-primary border-opacity-75">
            <div className="card-header">Innovation</div>
            <div className="card-body">
              Constantly improving our technology to serve you better.
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card border border-primary border-opacity-75">
            <div className="card-header">Client-Centric</div>
            <div className="card-body">
              Your needs are our priority, and we tailor our services to meet
              them.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoreValues;