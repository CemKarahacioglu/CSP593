// src/components/LottieAnimation.tsx
import React from "react";
import Player from "lottie-react";

interface LottieAnimationProps {
  width?: string;
  height?: string;
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  width = "100px",
  height = "100px",
  animationData,
}) => {
  return (
    <div style={{ width, height }}>
      <Player
        autoplay
        loop
        animationData={animationData} // Lottie JSON animation file comes from props
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieAnimation;
