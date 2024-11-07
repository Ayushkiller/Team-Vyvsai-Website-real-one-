import React from "react";

function TenderFile() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          {/* Title Section */}
          <section className="text-center mb-5">
            <h1 className="text-primary fw-bold mb-3">
              <i className="bi bi-pencil-fill me-2"></i>
              Coming Soon: Tender Filing Services by vyvsai
            </h1>
            <p className="lead">
              At <strong>vyvsai.com</strong>, we’re thrilled to soon offer a
              fully managed Tender Filing Service! Our service will support
              organizations in preparing, managing, and filing tenders with
              unmatched ease and accuracy.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-5">
            <h2 className="text-primary mb-3">
              <i className="bi bi-award-fill me-2"></i>
              Why Choose vyvsai.com for Tender Filing?
            </h2>
            <p>
              Tender filing requires attention to detail, accuracy, and
              compliance with strict requirements. Our service will streamline
              the process, making it accessible and manageable for businesses of
              all sizes.
            </p>
          </section>

          {/* What to Expect Section */}
          <section className="mb-5">
            <h3 className="text-primary mb-3">
              <i className="bi bi-gear-fill me-2"></i>
              What to Expect from Our Services
            </h3>
            <ul className="ps-4">
              <li className="mb-2">
                <strong>Personalized Support:</strong> Each client receives a
                dedicated expert to guide them through the entire filing
                process.
              </li>
              <li className="mb-2">
                <strong>Documentation Assistance:</strong> We assist with
                essential documents, ensuring every submission is accurate and
                complete.
              </li>
              <li className="mb-2">
                <strong>Deadline Management:</strong> We track deadlines,
                sending reminders to help you stay on schedule.
              </li>
              <li className="mb-2">
                <strong>Risk Assessment:</strong> Our experts review tender
                requirements, identifying potential risks to strengthen your
                bid.
              </li>
            </ul>
          </section>

          {/* Success Assurance Section */}
          <section className="mb-5">
            <h3 className="text-primary mb-3">
              <i className="bi bi-check2-circle me-2"></i>
              How We Ensure Your Success
            </h3>
            <p>
              Our service prioritizes transparency, accuracy, and quality. We
              meticulously review every detail of your tender submission to
              ensure full compliance. Partner with vyvsai.com for a seamless
              tender filing experience.
            </p>
          </section>

          {/* Launch Timing Section */}
          <section className="mb-5">
            <h3 className="text-primary mb-3">
              <i className="bi bi-calendar2-event-fill me-2"></i>
              When Can You Start?
            </h3>
            <p>
              Tender Filing Services will be launching soon! Sign up on
              vyvsai.com for early access updates and exclusive offers. Join us
              to simplify your tender filing process.
            </p>
          </section>

          {/* Notification Button */}
          <div className="text-center my-5">
            <button className="btn btn-primary btn-lg">
              <i className="bi bi-bell-fill me-2"></i>Notify Me on Launch
            </button>
          </div>

          {/* Footer Message */}
          <p className="text-center text-muted">
            <i className="bi bi-info-circle-fill me-2"></i>
            Stay tuned for an efficient, hassle-free tender filing experience
            with vyvsai.com – Simplifying Success.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TenderFile;
