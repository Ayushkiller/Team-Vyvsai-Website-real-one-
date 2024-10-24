import React, { useEffect } from "react";
import "./Reviews.css"; // Import the updated CSS

const Reviews = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    const elements = document.querySelectorAll(".testimonial");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="testimonials-section bg-primary-subtle rounded-3">
      <div className="">
        <h2 className="text-center">Reviews</h2>
        <div className="row">
          <div className="col-md-6 rounded">
            <div className="testimonial">
              <i className="bi bi-chat-quote-fill text-primary"></i>{" "}
              {/* Bootstrap Icon */}
              <p className="text-justify">
                "Vyvsai has made bidding so much easier for us. Their
                notifications help us stay ahead, and the marketplace makes it
                simple to get the materials we need. The trial in Himachal was a
                big plus!"
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="testimonial">
              <i className="bi bi-chat-quote-fill text-primary"></i>{" "}
              {/* Bootstrap Icon */}
              <p className="text-justify">
                "Using Vyvsai has saved us time and effort. The bid predictions
                are spot on, and the process is straightforward. The trial offer
                in Himachal Pradesh was a great way to test it out."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
