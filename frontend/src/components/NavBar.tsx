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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li className="nav-item" ref={dropdownRef}>
          <button className="dropdown-btn" onClick={toggleDropdown}>
            Homeworks
            <span className="arrow">&#9660;</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/homework1" onClick={closeDropdown}>
                  Homework1
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  Homework2
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  Homework3
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  Homework4
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/under-construction">About</Link>
        </li>
        <li>
          <Link to="/under-construction">FAQ'S</Link>
        </li>
      </ul>

      <div className="navbar-sign">
        {user ? (
          // Show the user's profile picture and name when logged in
          <div className="login-section2">
            <div>
              <div className="user-info">
                <img
                  src={DefaultProfilePicture}
                  alt={user.name}
                  className="profile-picture"
                />
                <span>{user.name}</span>
              </div>
            </div>

            <button onClick={logout}>logout</button>
          </div>
        ) : (
          // Default buttons if the user is not logged in
          <>
            <Link to="/login" className="login-btn">
              Log in
            </Link>
            <Link to="/signup" className="get-started-btn">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
