import React from "react";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

import {
  FaHome,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaUser,
  FaList,
  FaEllipsisH,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <a href="#">
          <FaHome className="icon" /> Home
        </a>
        <a href="#">
          <FaHashtag className="icon" /> Explore
        </a>
        <a href="#">
          <FaBell className="icon" /> Notifications
        </a>
        <a href="#">
          <FaEnvelope className="icon" /> Messages
        </a>
        <a href="#">
          <FaBookmark className="icon" /> Bookmarks
        </a>
        <a href="#">
          <FaUser className="icon" /> Profile
        </a>
        <a href="#">
          <FaList className="icon" /> Lists
        </a>
        <a href="#">
          <FaEllipsisH className="icon" /> More
        </a>
      </div>
      {/* Logout Button */}
      {/* Conditionally render the Logout Button if the user is logged in */}
      {user && (
        <button className="sidebar-logout-btn" onClick={logout}>
          <BiLogOut className="icon" /> Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
