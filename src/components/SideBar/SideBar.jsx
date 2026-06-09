import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/stacklyimg1.webp";

function SideBar({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close button — visible on mobile only */}
      <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
        ✕
      </button>

      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Stackly logo" className="logo-image" />
      </div>

      <ul className="sidebar-menu">
        <li className="active">
          <span>📊</span>
          Dashboard
        </li>
        <li>
          <span>📅</span>
          Events
        </li>
        <li>
          <span>🎟️</span>
          Bookings
        </li>
        <li>
          <span>👥</span>
          Attendees
        </li>
        <li>
          <span>💰</span>
          Revenue
        </li>
        <li>
          <span>📈</span>
          Reports
        </li>
        <li>
          <span>📨</span>
          Invitations
        </li>
        <li>
          <span>🗓️</span>
          Calendar
        </li>
        <li>
          <span>⭐</span>
          Reviews
        </li>
        <li>
          <span>👨‍💼</span>
          Team
        </li>
        <li>
          <span>⚙️</span>
          Settings
        </li>
      </ul>

      <button className="logout-btn" onClick={() => navigate("/")}>
        🚪 Logout
      </button>
    </aside>
  );
}

export default SideBar;