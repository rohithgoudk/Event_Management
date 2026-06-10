import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/stacklyimg1.webp";

const MENU_ITEMS = [
  { icon: "📊", label: "Dashboard", key: "dashboard" },
  { icon: "📅", label: "Events", key: "events" },
  { icon: "🎟️", label: "Bookings", key: "bookings" },
  { icon: "👥", label: "Attendees", key: "attendees" },
  { icon: "💰", label: "Revenue", key: "revenue" },
  { icon: "📈", label: "Reports", key: "reports" },
  { icon: "📨", label: "Invitations", key: "invitations" },
  { icon: "🗓️", label: "Calendar", key: "calendar" },
  { icon: "⭐", label: "Reviews", key: "reviews" },
  { icon: "👨‍💼", label: "Team", key: "team" },
  { icon: "⚙️", label: "Settings", key: "settings" },
];

function SideBar({ isOpen, onClose, activeItem = "dashboard", onItemSelect }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(activeItem);

  const handleSelect = (key) => {
    setActive(key);
    onItemSelect?.(key);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="sidebar-logo">
          <img src={logo} alt="Stackly logo" className="logo-image" />
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.key}
                className={active === item.key ? "active" : ""}
                onClick={() => handleSelect(item.key)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <button className="logout-btn" onClick={() => navigate("/")}>
          <span className="menu-icon">🚪</span> Logout
        </button>
      </aside>
    </>
  );
}

export default SideBar;