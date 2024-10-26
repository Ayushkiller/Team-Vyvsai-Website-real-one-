import React, { useEffect, useState, useRef } from "react";

const CoreValues = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="values-section p-1 mb-3">
      <div className="container text-primary-emphasis rounded-3">
        <h2 className="text-center mb-4">Our Core Values</h2>
        <div className="row text-center">
          {["Efficiency", "Transparency", "Innovation", "Client-Centric"].map(
            (value, index) => (
              <div className="col-lg-6 col-md-6 col-12 mb-4" key={value}>
                <div
                  className={`card h-100 border border-primary border-opacity-75 ${
                    visible ? "fade-in" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }} // Staggered effect
                >
                  <div className="card-header">
                    <i
                      className={`bi bi-${getIcon(value)} text-primary me-2`}
                    ></i>{" "}
                    {value}
                  </div>
                  <div className="card-body">
                    <p>{getDescription(value)}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

// Function to return descriptions based on value
const getDescription = (value) => {
  switch (value) {
    case "Efficiency":
      return "We strive to maximize your time by providing quick and reliable notifications.";
    case "Transparency":
      return "Clear communication and honesty are at the heart of everything we do.";
    case "Innovation":
      return "Constantly improving our technology to serve you better.";
    case "Client-Centric":
      return "Your needs are our priority, and we tailor our services to meet them.";
    default:
      return "";
  }
};

// Function to return icons based on value
const getIcon = (value) => {
  switch (value) {
    case "Efficiency":
      return "check-circle-fill";
    case "Transparency":
      return "eye-fill";
    case "Innovation":
      return "lightbulb-fill";
    case "Client-Centric":
      return "people-fill";
    default:
      return "question-circle-fill";
  }
};

export default CoreValues;
