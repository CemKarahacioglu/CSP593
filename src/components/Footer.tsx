import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";
import Logo from "../assets/LogoDarkBG.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <h6 className="footer-location">KittyWonderland</h6>
        <div className="footer-divider"></div>
        <nav className="footer-nav">
          <Link to="/under-construction" className="footer-link">
            About Cats
          </Link>
          <Link to="/under-construction" className="footer-link">
            Kitty Doctors
          </Link>
          <Link to="/under-construction" className="footer-link">
            Feline Travel
          </Link>
          <Link to="/under-construction" className="footer-link">
            Purrfessionals
          </Link>
        </nav>
        <div className="footer-icons">
          <a
            href="https://m.facebook.com/TheOreoCat/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/groups/50005"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://youtube.com/@owlkitty?si=9G-Wt9Z6-n7e209m"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/nala_cat?igsh=MW0wcHo5Ym1icHU4cw=="
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="footer-copyright">
          <p>© 2024 - Cats and Co.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
