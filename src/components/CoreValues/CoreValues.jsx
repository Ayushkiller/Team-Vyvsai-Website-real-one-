import React, { useEffect, useState, useRef } from "react";
import "./CoreValues.css"; // Ensure your CSS file is imported

const CoreValues = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the section is intersecting and within the defined threshold
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setVisible(true); // Fade in when 25% is visible
          } else {
            setVisible(false); // Fade out when less than 25% is visible
          }
        });
      },
      {
        threshold: 0.25, // Set threshold for 25%
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
      <div className="container text-primary-emphasis rounded-5">
        <h2 className="text-center mb-4">Our Core Values</h2>
        <div className="row text-center">
          {["Efficiency", "Transparency", "Innovation", "Client-Centric"].map(
            (value, index) => (
              <div className="col-lg-6 col-md-6 col-12 mb-4" key={value}>
                <div
                  className={`card h-100 border border-primary border-opacity-75 value-item ${
                    visible ? "fade-in" : "fade-out"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
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
