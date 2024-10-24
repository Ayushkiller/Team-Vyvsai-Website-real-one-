import React, { useEffect, useState, useRef } from "react";
import "./CoreValues.css"; // Ensure you import your CSS file

const CoreValues = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if at least 25% of the section is in view
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setVisible(true); // Set to visible when 25% of the section comes into view
          } else {
            setVisible(false); // Reset visibility when section goes out of view
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 25% of the target is visible
      }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section); // Observe the section
    }

    return () => {
      if (section) {
        observer.unobserve(section); // Clean up observer on unmount
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="values-section p-1 mb-3 rounded-3">
      <div className="container text-primary-emphasis rounded-3">
        <h2 className="text-center mb-4">Our Core Values</h2>
        <div className="row text-center">
          {["Efficiency", "Transparency", "Innovation", "Client-Centric"].map(
            (value, index) => (
              <div className="col-md-6 mb-4" key={value}>
                <div
                  className={`value-item border border-primary border-opacity-75 ${
                    visible ? "fade-in" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }} // Staggered effect
                >
                  <div className="card-header">
                    <i
                      className={`bi bi-${getIcon(value)} text-primary me-2`}
                    ></i>{" "}
                    {/* Add icon */}
                    {value}
                  </div>
                  <div className="card-body">{getDescription(value)}</div>
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
      return "check-circle-fill"; // Example icon
    case "Transparency":
      return "eye-fill"; // Example icon
    case "Innovation":
      return "lightbulb-fill"; // Example icon
    case "Client-Centric":
      return "people-fill"; // Example icon
    default:
      return "question-circle-fill"; // Default icon
  }
};

export default CoreValues;
