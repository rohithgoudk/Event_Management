import "./AdminDashboard.css";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { label: "Total Users",     value: "24,891", icon: "👥", trend: "+4.2%", up: true },
  { label: "Active Sessions", value: "1,342",  icon: "🟢", trend: "+11%",  up: true },
  { label: "Open Tickets",    value: "87",     icon: "🎫", trend: "+8",    up: false },
  { label: "Monthly Revenue", value: "₹18.4L", icon: "💰", trend: "+9.3%", up: true },
];

const USERS = [
  { init: "AR", color: "#6366f1", name: "Ananya Rao",  email: "ananya@admin.io", role: "admin",  status: "active",   joined: "Jan 2024" },
  { init: "SK", color: "#10b981", name: "Sameer Khan", email: "sameer@admin.io", role: "editor", status: "active",   joined: "Mar 2024" },
  { init: "PV", color: "#f59e0b", name: "Priya Verma", email: "priya@admin.io",  role: "viewer", status: "inactive", joined: "Apr 2024" },
  { init: "RN", color: "#ec4899", name: "Rohit Nair",  email: "rohit@admin.io",  role: "editor", status: "pending",  joined: "May 2024" },
  { init: "DM", color: "#06b6d4", name: "Deepa Mehta", email: "deepa@admin.io",  role: "admin",  status: "active",   joined: "Jun 2024" },
];

const HEALTH = [
  { name: "CPU Usage",      pct: 42, color: "#6366f1" },
  { name: "Memory",         pct: 67, color: "#10b981" },
  { name: "Storage",        pct: 81, color: "#f59e0b" },
  { name: "Network I/O",    pct: 29, color: "#06b6d4" },
  { name: "DB Connections", pct: 55, color: "#ec4899" },
];

const TICKETS = [
  { icon: "🐛", title: "Login loop on iOS app",       meta: "#4821 · Critical", time: "10m ago" },
  { icon: "⚡", title: "Payment gateway timeout",      meta: "#4820 · High",     time: "32m ago" },
  { icon: "🔧", title: "Dashboard slow on Firefox",   meta: "#4819 · Medium",   time: "2h ago"  },
  { icon: "📧", title: "Bulk email delivery failure", meta: "#4818 · High",     time: "4h ago"  },
  { icon: "🔑", title: "2FA bypass vulnerability",    meta: "#4817 · Critical", time: "6h ago"  },
];

const REVENUE = [
  { lbl: "Jan", h: 55, color: "#6366f1" },
  { lbl: "Feb", h: 42, color: "#6366f1" },
  { lbl: "Mar", h: 68, color: "#6366f1" },
  { lbl: "Apr", h: 74, color: "#6366f1" },
  { lbl: "May", h: 60, color: "#6366f1" },
  { lbl: "Jun", h: 92, color: "#10b981" },
  { lbl: "Jul", h: 78, color: "#6366f1" },
];

const ACTIONS = [
  { icon: "➕", label: "Add New User",    color: "#6366f1" },
  { icon: "📣", label: "Broadcast Alert", color: "#ec4899" },
  { icon: "🔄", label: "Sync Database",   color: "#10b981" },
  { icon: "📤", label: "Export Reports",  color: "#f59e0b" },
  { icon: "🔒", label: "Lockdown Mode",   color: "#ef4444" },
  { icon: "🧹", label: "Clear Cache",     color: "#06b6d4" },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">

      {/* Mobile overlay backdrop */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Shared SideBar component */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-content">
        <div className="admin-dashboard">

          {/* Header */}
          <header className="admin-header">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="welcome-section">
              <h1>Admin Control Panel</h1>
              <p>System overview — Wednesday, 10 June 2026</p>
            </div>

            <div className="header-actions">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search users, orders…" />
              </div>
              <button className="notification-btn">
                🔔
                <span className="notification-badge">5</span>
              </button>
              <div className="user-avatar">SA</div>
            </div>
          </header>

          {/* Stats */}
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-content">
                  <h3>{s.label}</h3>
                  <div className="stat-value">
                    <span className="value">{s.value}</span>
                    <span className={`trend ${s.up ? "up" : "down"}`}>
                      {s.up ? "↑" : "↓"} {s.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 1: Users table + System health */}
          <div className="admin-row">

            {/* Users Table */}
            <div className="admin-card">
              <div className="card-header">
                <h2>User Management</h2>
                <button className="card-action">View All →</button>
              </div>
              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u, i) => (
                      <tr key={i}>
                        <td>
                          <span className="table-name">
                            <span className="table-avatar" style={{ background: u.color }}>
                              {u.init}
                            </span>
                            <span>
                              <span className="name-text">{u.name}</span>
                              <span className="email-text">{u.email}</span>
                            </span>
                          </span>
                        </td>
                        <td><span className={`chip ${u.role}`}>{u.role}</span></td>
                        <td><span className={`chip ${u.status}`}>{u.status}</span></td>
                        <td>{u.joined}</td>
                        <td>
                          <div className="row-actions">
                            <button className="btn-icon">✏️</button>
                            <button className="btn-icon">🔑</button>
                            <button className="btn-icon">⋮</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Health */}
            <div className="admin-card health-card">
              <div className="card-header">
                <h2>System Health</h2>
                <span className="health-status">● All operational</span>
              </div>
              <div className="health-list">
                {HEALTH.map((h, i) => (
                  <div className="health-item" key={i}>
                    <div className="health-row">
                      <span className="health-name">{h.name}</span>
                      <span
                        className="health-pct"
                        style={{ color: h.pct > 75 ? "#f59e0b" : h.color }}
                      >
                        {h.pct}%
                      </span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${h.pct}%`,
                          background: h.pct > 75
                            ? "linear-gradient(90deg,#f59e0b,#ef4444)"
                            : `linear-gradient(90deg,${h.color},${h.color}99)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Revenue + Tickets + Quick Actions */}
          <div className="admin-row-3">

            {/* Revenue Chart */}
            <div className="admin-card">
              <div className="card-header">
                <h2>Monthly Revenue</h2>
                <span className="muted-label">2026</span>
              </div>
              <div className="revenue-chart">
                {REVENUE.map((r, i) => (
                  <div className="bar-col" key={i}>
                    <div
                      className="revenue-bar"
                      style={{
                        height: `${r.h}%`,
                        background: `linear-gradient(180deg,${r.color},${r.color}66)`,
                        boxShadow: r.color === "#10b981" ? "0 0 12px rgba(16,185,129,0.3)" : "none",
                      }}
                      title={`${r.lbl}: ₹${r.h * 0.2}L`}
                    />
                    <span className="bar-label">{r.lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Tickets */}
            <div className="admin-card">
              <div className="card-header">
                <h2>Open Tickets</h2>
                <button className="card-action">View All →</button>
              </div>
              <ul className="ticket-list">
                {TICKETS.map((t, i) => (
                  <li className="ticket-item" key={i}>
                    <span className="ticket-icon">{t.icon}</span>
                    <div className="ticket-body">
                      <strong>{t.title}</strong>
                      <p>{t.meta}</p>
                    </div>
                    <span className="ticket-time">{t.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="admin-card">
              <div className="card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-actions-grid">
                {ACTIONS.map((a, i) => (
                  <button
                    className="quick-action-btn"
                    key={i}
                    style={{ "--accent-color": a.color }}
                  >
                    <span className="action-icon">{a.icon}</span>
                    <span className="action-label">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;