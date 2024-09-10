// src/components/NavBar.tsx
import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
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
            HOMEWORKS <span className="arrow">&#9660;</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/homework1" onClick={closeDropdown}>
                  HOMEWORK1
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  HOMEWORK2
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  HOMEWORK3
                </Link>
              </li>
              <li>
                <Link to="/under-construction" onClick={closeDropdown}>
                  HOMEWORK4
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/under-construction">ABOUT</Link>
        </li>
        <li>
          <Link to="/under-construction">FAQ'S</Link>
        </li>
      </ul>

      <div className="navbar-shop">
        <a
          href="https://crazycatshop.co/collections/for-cats"
          target="_blank"
          rel="noopener noreferrer"
          className="shop-btn"
        >
          SHOP
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
