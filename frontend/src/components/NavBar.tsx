// src/components/NavBar.tsx
import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DefaultProfilePicture from "../assets/Success.jpg";

const NavBar: React.FC = () => {
  const { user, logout } = useAuth(); // to access the user and logout function from context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null); // Reference to the dropdown menu

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // to keep track whether dropdown menu is open or not
  };

  const closeDropdown = () => {
    setDropdownOpen(false); // Function to close the dropdown
  };

  // to detect clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (dropdownOpen) {
      // Attach listener only if dropdown is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup event listener on component unmount or when dropdown state changes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // If user is logged in, don't render the navbar
  if (user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-sign">
        <Link to="/login" className="login-btn">
          Log in
        </Link>
        <Link to="/signup" className="get-started-btn">
          Get started
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
