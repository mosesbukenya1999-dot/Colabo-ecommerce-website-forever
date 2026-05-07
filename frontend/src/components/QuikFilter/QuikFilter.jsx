import React from "react";
import "./QuikFilter.css";

import filter_one from "../../assets/filter_one.png";
import filter_two from "../../assets/filter_two.png";
import filter_three from "../../assets/filter_three.png";

const filters = [
  {
    title: "Women",
    subtitle: "Spring 2030",
    image: filter_one,
  },
  {
    title: "Men",
    subtitle: "Spring 2030",
    image: filter_two,
  },
  {
    title: "Accessories",
    subtitle: "New Trend",
    image: filter_three,
  },
];

const QuikFilter = () => {
  return (
    <div className=" filter-cards container">
      {filters.map((item, index) => (
        <div className="filter-card" key={index}>
          <div className="image-wrapper">
            <img src={item.image} alt={item.title} />

            {/* Overlay */}
            <div className="overlay"></div>

            {/* Content */}
            <div className="overlay-content">
              <h5>{item.title}</h5>
              <p>{item.subtitle}</p>
              <hr />
              <button className="overlay-btn">Shop Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuikFilter;