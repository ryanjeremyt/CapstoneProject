import React from "react";
import "./Hero.css";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div>
          <p>Protein &</p>
          <p>Supplements</p>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="Hero promotion" />
      </div>
    </section>
  );
};

export default Hero;
