import "./Footer.css";

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
            corporate events, birthdays and celebrations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Packages</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>

          <ul>
            <li>💍 Wedding Planning</li>
            <li>🏢 Corporate Events</li>
            <li>🎂 Birthday Parties</li>
            <li>🎤 Concerts & Shows</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>📍 Hyderabad, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@eventify.com</p>

          <div className="social-icons">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Eventify. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;