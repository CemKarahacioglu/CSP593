// RightSidebar.tsx
import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="trending">
        <h3>What's happening</h3>
        <ul>
          <li>
            <a
              href="https://www.foxnews.com/lifestyle/2024-pet-halloween-costumes"
              target="_blank"
              rel="noopener noreferrer"
            >
              2024 Pet Halloween Costumes
            </a>
          </li>
          <li>
            <a
              href="https://asianews.network/beyond-just-cute-these-pets-in-south-korea-have-unique-stories-and-huge-social-media-following/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beyond just cute, these pets in South Korea have unique stories,
              and huge social media following
            </a>
          </li>
          <li>
            <a
              href="https://www.nbcnews.com/news/us-news/bear-makes-home-couples-sierra-madre-house-rcna172395"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bear makes himself at home under couple's Southern California
              house
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
