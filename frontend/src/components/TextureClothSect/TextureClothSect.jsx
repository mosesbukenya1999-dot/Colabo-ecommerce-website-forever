import React, { useRef, useEffect, useState } from "react";
import "./TextureClothSect.css";

import vidOne from "../../assets/vid_one.mp4";
import vidTwo from "../../assets/vid_two.mp4";
import vidThree from "../../assets/vid_three.mp4";

// Video list
const videos = [
  {
    id: 1,
    title: "Wind Blown T-Shirt",
    subtitle: "Modern Streetwear",
    video: vidOne,
  },
  {
    id: 2,
    title: "Luxury Fabric Motion",
    subtitle: "Premium Cotton",
    video: vidTwo,
  },
  {
    id: 3,
    title: "Soft Cloth Texture",
    subtitle: "Minimal Fashion",
    video: vidThree,
  },
];

// Lazy-loading Video component
const LazyVideo = ({ src, className }) => {
  const videoRef = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(videoRef.current);
        }
      },
      { threshold: 0.25 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={inView ? src : ""}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
};

const TextureClothSect = () => {
  return (
    <section className="texture-section">
      <div className="texture-header">
        <p className="texture-small-text">FASHION MATERIAL</p>

        <h2>Cloth In Motion</h2>

        <p className="texture-description">
          Premium cloth textures with cinematic movement and realistic fabric
          visuals.
        </p>
      </div>

      <div className="texture-grid">
        {videos.map((item) => (
          <div className="texture-card" key={item.id}>
            {/* Lazy-loaded video */}
            <LazyVideo src={item.video} className="texture-video" />

            <div className="texture-overlay"></div>

            <div className="texture-content">
              <p>{item.subtitle}</p>

              <h3>{item.title}</h3>

              <button>Explore Material</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TextureClothSect;