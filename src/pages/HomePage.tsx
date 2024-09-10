// src/pages/HomePage.tsx
import React from "react";
import "./HomePage.css";
import DomesticCat from "../assets/DomesticCat.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Left Section */}
      <div className="homepage-left">
        {/* Main Text Section */}
        <h1 className="glowing-title">
          Be Glowing <br /> Be Cute ✨✨
        </h1>
        <p className="main-text">
          <span className="highlight">All animals have their glow,</span>{" "}
          <strong className="emphasis">
            but cats just glow a little brighter
          </strong>
        </p>

        {/* YouTube Video Section */}
        <iframe
          width="660"
          height="335"
          src="https://www.youtube.com/embed/W85oD8FEF78?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="below-text-video"
        ></iframe>
      </div>

      {/* Right Section */}
      <div className="homepage-right">
        <img src={DomesticCat} alt="Cute Cat" className="right-image" />
      </div>
    </div>
  );
};

export default HomePage;
