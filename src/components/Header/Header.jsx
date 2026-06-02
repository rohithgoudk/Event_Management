import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import stackly from "../../assets/S.webp";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();

  return (
    <header className="header">
      <div className="logo">
  <a href="/">
    <img
      src={stackly}
      alt="Logo"
      className="logo-img"
    />
  </a>

        
        <div className="logo-text">         
        </div>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={menuOpen ? "nav active" : "nav"}>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;