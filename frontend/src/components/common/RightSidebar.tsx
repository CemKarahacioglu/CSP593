// RightSidebar.tsx
import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="trending">
        <h3>What's happening</h3>
        <ul>
          <li>#ReactJS - 1M Tweets</li>
          <li>#Vite - 250K Tweets</li>
          <li>#TypeScript - 300K Tweets</li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
