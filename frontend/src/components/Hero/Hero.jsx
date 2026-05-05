import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import gsap from "gsap";
import hero1 from "../../assets/hero_img.png";
import hero2 from "../../assets/hero_img_two.png";
import "./Hero.css";

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const activeSlide = ".carousel-item.active";

      // First word: from top
      gsap.from(`${activeSlide} .first`, {
        opacity: 0,
        y: -80,
        duration: 0.6,
        ease: "power3.out",
      });

      // Middle word: rotate in
      gsap.from(`${activeSlide} .middle`, {
        opacity: 0,
        rotate: -90,
        scale: 0.5,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });

      // Button: slide from left
      gsap.from(`${activeSlide} .hero-btn`, {
        opacity: 0,
        x: -100,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div className="hero-wrapper">

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        fade
        interval={4000}
        indicators={false}
        controls={true}
        className="hero-carousel"
      >

        {/* SLIDE 1 */}
        <Carousel.Item>
          <img className="hero-img" src={hero1} alt="Fashion collection" />

          <Carousel.Caption className="hero-caption">
            <h1>
              <span className="first">Elevate</span>{" "}
              <span className="middle">Your Style</span>
            </h1>

            <p>Discover modern outfits designed to make you stand out.</p>

            <button className="hero-btn">
              Shop Now
            </button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* SLIDE 2 */}
        <Carousel.Item>
          <img className="hero-img" src={hero2} alt="New arrivals" />

          <Carousel.Caption className="hero-caption">
            <h1>
              <span className="first">New</span>{" "}
              <span className="middle">Season Drip</span>
            </h1>

            <p>Upgrade your wardrobe with the freshest arrivals.</p>

            <button className="hero-btn">
              Explore
            </button>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default Hero;