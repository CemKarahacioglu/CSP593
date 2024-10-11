// TwitterCloneLayout.tsx
import React from "react";
import Sidebar from "../../components/common/Sidebar";
import PostFeed from "../../components/common/PostFeed";
import PostInput from "../../components/common/PostInput";
import RightSidebar from "../../components/common/RightSidebar";
import "./TwitterClone.css";

const TwitterClone: React.FC = () => {
  return (
    <div className="twitter-layout">
      <Sidebar />
      <div className="post-feed">
        <PostFeed />
      </div>
      <RightSidebar />
    </div>
  );
};

export default TwitterClone;
