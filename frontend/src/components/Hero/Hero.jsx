import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import gsap from "gsap";

import hero1 from "../../assets/hero_img-four.jpg";
import hero2 from "../../assets/hero_img-three.jpg";

import "./Hero.css";

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const activeSlide = ".carousel-item.active";

    gsap.fromTo(
      `${activeSlide} .first`,
      {
        opacity: 0,
        y: -80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      `${activeSlide} .middle`,
      {
        opacity: 0,
        rotate: -20,
        scale: 0.8,
      },
      {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      `${activeSlide} .hero-btn`,
      {
        opacity: 0,
        x: -80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.4,
        ease: "power3.out",
      }
    );
  }, [index]);

  return (
    <section className="hero-wrapper">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        fade
        interval={5000}
        indicators={false}
        controls={false}
        className="hero-carousel"
      >

        {/* SLIDE 1 */}
        <Carousel.Item>
          <img
            className="hero-img"
            src={hero1}
            alt="Fashion collection"
          />

          <Carousel.Caption className="hero-caption left-caption">
            <h1>
              <span className="first">
                Elevate
              </span>{" "}
              <span className="middle">
                Your Style
              </span>
            </h1>

            <hr className="hero-underline" />

            <p>
              Discover modern outfits designed to make you stand out.
            </p>

            <hr className="hero-underline" />

            <button className="hero-btn hero-btn-one">
              Shop Now
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <img
            className="hero-img hero-img-two"
            src={hero2}
            alt="New arrivals"
          />

          <Carousel.Caption className="hero-caption-two ">
            <h1 className=" fs-md-1 fs-3">
              <span className="first">
                New
              </span>{" "}
              <span className="middle">
                Season Drip
              </span>
            </h1>

            <hr className="hero-under-line" />

            <p className="">
              Upgrade your wardrobe with the freshest arrivals.
            </p>

            <hr className="hero-under-line" />

            <button className="hero-btn hero-btn-two">
              Explore
            </button>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </section>
  );
};

export default Hero;