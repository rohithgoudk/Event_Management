import "./Dashboard.css";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";

function Dashboard() {
  const user = {
    name: "Sai Sriman",
    role: "Event Manager",
    email: "saisriman@example.com",
    avatar: "SS",
    memberSince: "Jan 2024",
    phone: "+91 98765 43210",
  };

  const [activeTab, setActiveTab] = useState("upcoming");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Events", value: "48", icon: "📅", trend: "+5", trendUp: true },
    { label: "Upcoming Events", value: "12", icon: "🎯", trend: "+3", trendUp: true },
    { label: "Total Bookings", value: "1,245", icon: "🎟️", trend: "+89", trendUp: true },
    { label: "Revenue", value: "₹8,75,000", icon: "💰", trend: "+12%", trendUp: true },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Tech Summit 2026",
      date: "10 June 2026",
      time: "10:00 AM",
      venue: "Hyderabad Convention Center",
      attendees: 450,
      status: "confirmed",
      category: "Technology",
    },
    {
      id: 2,
      name: "Startup Expo",
      date: "18 June 2026",
      time: "09:00 AM",
      venue: "Bangalore Tech Park",
      attendees: 320,
      status: "confirmed",
      category: "Business",
    },
    {
      id: 3,
      name: "Music Fest",
      date: "25 June 2026",
      time: "06:00 PM",
      venue: "Chennai Marina Beach",
      attendees: 2500,
      status: "pending",
      category: "Entertainment",
    },
    {
      id: 4,
      name: "Business Meetup",
      date: "02 July 2026",
      time: "02:00 PM",
      venue: "Mumbai Trade Center",
      attendees: 150,
      status: "confirmed",
      category: "Networking",
    },
  ];

  const recentActivity = [
    {
      action: "New booking",
      detail: "Tech Summit 2026 - 5 tickets",
      time: "2 hours ago",
      icon: "🎫",
    },
    {
      action: "Event updated",
      detail: "Music Fest venue changed",
      time: "5 hours ago",
      icon: "✏️",
    },
    {
      action: "Payment received",
      detail: "₹45,000 from Startup Expo",
      time: "1 day ago",
      icon: "💳",
    },
    {
      action: "New attendee",
      detail: "John Doe registered for Tech Summit",
      time: "1 day ago",
      icon: "👤",
    },
    {
      action: "Review received",
      detail: "5-star rating for AI Workshop",
      time: "2 days ago",
      icon: "⭐",
    },
  ];

  const quickActions = [
    { label: "Create Event", icon: "➕", color: "#6366f1" },
    { label: "Send Invites", icon: "✉️", color: "#10b981" },
    { label: "View Reports", icon: "📊", color: "#f59e0b" },
    { label: "Manage Team", icon: "👥", color: "#ec4899" },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "#6366f1",
      Business: "#10b981",
      Entertainment: "#f59e0b",
      Networking: "#ec4899",
    };
    return colors[category] || "#6b7280";
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-content">
        <div className="dashboard">
          {/* Header */}
          <header className="dashboard-header">
            {/* Hamburger — visible on mobile only */}
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="welcome-section">
              <h1>Welcome Back, {user.name} 👋</h1>
              <p>Here's what's happening with your events today.</p>
            </div>

            <div className="header-actions">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search events, bookings..." />
              </div>

              <button className="notification-btn">
                🔔
                <span className="notification-badge">3</span>
              </button>

              <div className="user-avatar">{user.avatar}</div>
            </div>
          </header>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                style={{ "--accent-color": action.color }}
              >
                <span className="action-icon">{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.label}</h3>
                  <div className="stat-value">
                    <span className="value">{stat.value}</span>
                    <span className={`trend ${stat.trendUp ? "up" : "down"}`}>
                      {stat.trendUp ? "↑" : "↓"} {stat.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Row */}
          <div className="dashboard-row">
            {/* Events Section */}
            <div className="events-section">
              <div className="section-header">
                <h2>Events</h2>
                <div className="tab-buttons">
                  <button
                    className={activeTab === "upcoming" ? "active" : ""}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Upcoming
                  </button>
                  <button
                    className={activeTab === "past" ? "active" : ""}
                    onClick={() => setActiveTab("past")}
                  >
                    Past
                  </button>
                  <button
                    className={activeTab === "draft" ? "active" : ""}
                    onClick={() => setActiveTab("draft")}
                  >
                    Drafts
                  </button>
                </div>
              </div>

              <div className="events-list">
                {upcomingEvents.map((event) => (
                  <div className="event-card" key={event.id}>
                    <div
                      className="event-category-bar"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    />
                    <div className="event-content">
                      <div className="event-main">
                        <h4>{event.name}</h4>
                        <span
                          className="event-category"
                          style={{ color: getCategoryColor(event.category) }}
                        >
                          {event.category}
                        </span>
                      </div>
                      <div className="event-details">
                        <span>📅 {event.date}</span>
                        <span>⏰ {event.time}</span>
                        <span>📍 {event.venue}</span>
                      </div>
                      <div className="event-footer">
                        <span className="attendees">👥 {event.attendees} attendees</span>
                        <span className={`status ${event.status}`}>{event.status}</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      <button className="btn-icon">✏️</button>
                      <button className="btn-icon">👁️</button>
                      <button className="btn-icon">⋮</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="view-all-btn">View All Events →</button>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-sidebar">
              <div className="activity-card">
                <h3>Recent Activity</h3>
                <ul className="activity-list">
                  {recentActivity.map((activity, index) => (
                    <li key={index}>
                      <span className="activity-icon">{activity.icon}</span>
                      <div className="activity-content">
                        <strong>{activity.action}</strong>
                        <p>{activity.detail}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="calendar-preview">
                <h3>📅 June 2026</h3>
                <div className="calendar-highlights">
                  <div className="calendar-day has-event">
                    <span className="day-number">10</span>
                    <span className="day-dot"></span>
                  </div>
                  <div className="calendar-day has-event">
                    <span className="day-number">18</span>
                    <span className="day-dot"></span>
                  </div>
                  <div className="calendar-day has-event">
                    <span className="day-number">25</span>
                    <span className="day-dot"></span>
                  </div>
                </div>
                <p className="calendar-summary">3 events this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;