"use client";

// pages/not-ready.js
import LottieAnimation from "../components/LottieAnimation";
import animationData from "../assets/UnderConstruction.json";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./UnderConstruction.css";

const UnderConstructionSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  return (
    <div className="under-construction-container">
      <button onClick={handleGoBack} className="under-construction-btn">
        <RiArrowGoBackLine className="icon" size={24} />
        Go Back
      </button>

      <LottieAnimation
        width="650px"
        height="650px"
        animationData={animationData}
      />
      <h1 className="under-construction-title">Page Under Construction</h1>
      <p className="under-construction-subtitle">
        We're working hard to finish the development of this page. Check back
        soon!
      </p>
    </div>
  );
};

export default UnderConstructionSection;
