import React from "react";
import { NavLink } from "react-router-dom";
import "./QuikFilter.css";

import filter_one from "../../assets/filter_one.png";
import filter_two from "../../assets/filter_two.png";
import filter_three from "../../assets/filter_three.png";

import filter_four from "../../assets/com_img.png";
import filter_five from "../../assets/bag_img.png";
import filter_six from "../../assets/winter_wear.png";

const filters = [
  { title: "Women", link: "/shop/women", image: filter_one },
  { title: "Men", link: "/shop/men", image: filter_two },
  { title: "Accessories", link: "/shop/accessories", image: filter_three },
  { title: "Cosmetics", link: "/shop/women", image: filter_four },
  { title: "Bags", link: "/shop/men", image:filter_five },
  { title: "Winterwear", link: "/shop/accessories", image: filter_six },
];

const QuikFilter = () => {
  return (
    <div className="filter-cards container">
      {filters.map((item, index) => (
        <NavLink
          to={item.link}
          className="filter-card"
          key={index}
        >
          <div className="image-wrapper">
            <img src={item.image} alt={item.title} />
          </div>
          <h3 className="filter-title">{item.title}</h3>
        </NavLink>
      ))}
    </div>
  );
};

export default QuikFilter;