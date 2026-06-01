import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>Eventify</h2>
          <p>
            Turning Moments Into Memories.
            Creating unforgettable weddings,
            corporate events, birthdays, and celebrations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>

          <ul>
            <li><Link to="/services">💍 Wedding Planning</Link></li>
            <li><Link to="/services">🏢 Corporate Events</Link></li>
            <li><Link to="/services">🎂 Birthday Parties</Link></li>
            <li><Link to="/services">🎤 Concerts & Shows</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>📍 Hyderabad, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@eventify.com</p>

          <div className="social-icons">
  <Link to="/facebook">📘</Link>
  <Link to="/instagram">📷</Link>
  <Link to="/twitter">🐦</Link>
  <Link to="/linkedin">💼</Link>
</div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Eventify. All Rights Reserved.</p>
      </div>
      
    </footer>
  );
}

export default Footer;