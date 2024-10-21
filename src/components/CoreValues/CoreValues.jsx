import React, { useEffect, useState } from "react";

const CoreValues = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".values-section");
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        window.removeEventListener("scroll", handleScroll); // Remove event listener after triggering
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="values-section p-1 mb-3">
      <div className="container text-primary-emphasis rounded-3">
        <h2 className="text-center mb-4">Our Core Values</h2>
        <div className="row text-center">
          {["Efficiency", "Transparency", "Innovation", "Client-Centric"].map((value, index) => (
            <div className="col-md-6 mb-4" key={value}>
              <div
                className={`value-item border border-primary border-opacity-75 ${
                  visible ? "fade-in" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }} // Staggered effect
              >
                <div className="card-header">{value}</div>
                <div className="card-body">
                  {getDescription(value)}
                </div>
              </div>
            </div>
          ))}
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

export default CoreValues;