import { useState, useEffect, useRef } from "react";
import "./AdminDashboard.css";

/* ── Data ─────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { icon: "ti-layout-dashboard", label: "Dashboard",  id: "dashboard" },
  { icon: "ti-calendar-event",   label: "Events",     id: "events"    },
  { icon: "ti-ticket",           label: "Bookings",   id: "bookings"  },
  { icon: "ti-users",            label: "Attendees",  id: "attendees" },
  { icon: "ti-map-pin",          label: "Venues",     id: "venues"    },
  { icon: "ti-speakerphone",     label: "Promotions", id: "promotions"},
  { icon: "ti-chart-bar",        label: "Analytics",  id: "analytics" },
  { icon: "ti-settings",         label: "Settings",   id: "settings"  },
];

const EVENTS = [
  { id: 1, name: "Tech Summit 2026",           date: "Jun 20, 2026", venue: "Hyderabad Int'l Centre",   category: "Conference", tickets: 820,  capacity: 1000, status: "upcoming",  revenue: "₹4,10,000"  },
  { id: 2, name: "Music Fest: Monsoon Edition",date: "Jul 5, 2026",  venue: "HICC Lawn",                category: "Concert",    tickets: 2400, capacity: 3000, status: "upcoming",  revenue: "₹12,00,000" },
  { id: 3, name: "Startup Pitch Day",          date: "Jun 12, 2026", venue: "T-Hub, Hyderabad",         category: "Networking", tickets: 340,  capacity: 400,  status: "ongoing",   revenue: "₹1,70,000"  },
  { id: 4, name: "Food & Culture Carnival",    date: "May 28, 2026", venue: "Necklace Road Grounds",    category: "Festival",   tickets: 5000, capacity: 5000, status: "completed", revenue: "₹25,00,000" },
  { id: 5, name: "Photography Workshop",       date: "Jun 25, 2026", venue: "Studio 9, Banjara Hills",  category: "Workshop",   tickets: 45,   capacity: 60,   status: "upcoming",  revenue: "₹67,500"    },
];

const BOOKINGS = [
  { id: "BK-1041", attendee: "Riya Sharma",  event: "Tech Summit 2026",            tickets: 2, amount: "₹2,000", date: "Jun 8, 2026", status: "confirmed" },
  { id: "BK-1040", attendee: "Arjun Mehta",  event: "Music Fest: Monsoon Edition", tickets: 4, amount: "₹8,000", date: "Jun 7, 2026", status: "confirmed" },
  { id: "BK-1039", attendee: "Priya Nair",   event: "Startup Pitch Day",           tickets: 1, amount: "₹500",   date: "Jun 7, 2026", status: "pending"   },
  { id: "BK-1038", attendee: "Karan Verma",  event: "Photography Workshop",        tickets: 2, amount: "₹3,000", date: "Jun 6, 2026", status: "confirmed" },
  { id: "BK-1037", attendee: "Sneha Reddy",  event: "Tech Summit 2026",            tickets: 3, amount: "₹3,000", date: "Jun 6, 2026", status: "cancelled" },
];

const ATTENDEES = [
  { name: "Riya Sharma",  email: "riya.s@email.com",  events: 4, spent: "₹8,500",  joined: "Jan 2026", initials: "RS", bg: "#2a2745", color: "#a09be8" },
  { name: "Arjun Mehta",  email: "arjun.m@email.com", events: 7, spent: "₹22,000", joined: "Nov 2025", initials: "AM", bg: "#0e2a45", color: "#5caaf0" },
  { name: "Priya Nair",   email: "priya.n@email.com", events: 2, spent: "₹3,200",  joined: "Mar 2026", initials: "PN", bg: "#082e1e", color: "#3dba8a" },
  { name: "Karan Verma",  email: "karan.v@email.com", events: 5, spent: "₹14,000", joined: "Feb 2026", initials: "KV", bg: "#2e1f05", color: "#d4921e" },
  { name: "Sneha Reddy",  email: "sneha.r@email.com", events: 3, spent: "₹6,700",  joined: "Dec 2025", initials: "SR", bg: "#2e1205", color: "#e0845e" },
];

const VENUES = [
  { name: "Hyderabad Int'l Convention Centre", city: "Hyderabad", capacity: 5000, booked: 3, rating: 4.8, icon: "ti-building"           },
  { name: "T-Hub, Raidurgam",                 city: "Hyderabad", capacity: 400,  booked: 7, rating: 4.6, icon: "ti-building-skyscraper" },
  { name: "HICC Lawn & Amphitheatre",          city: "Hyderabad", capacity: 3000, booked: 2, rating: 4.5, icon: "ti-trees"               },
  { name: "Necklace Road Grounds",             city: "Hyderabad", capacity: 8000, booked: 1, rating: 4.3, icon: "ti-map"                 },
  { name: "Studio 9, Banjara Hills",           city: "Hyderabad", capacity: 60,   booked: 4, rating: 4.7, icon: "ti-camera"              },
];

const TASKS = [
  { label: "Send reminder emails — Tech Summit",         due: "Today",  priority: "high"   },
  { label: "Confirm AV setup — Music Fest",              due: "Jun 11", priority: "medium" },
  { label: "Review venue contract — Q3 Gala",            due: "Jun 13", priority: "low"    },
  { label: "Upload speaker bios — Startup Pitch Day",    due: "Jun 11", priority: "high"   },
  { label: "Process refund — BK-1037",                   due: "Jun 10", priority: "medium" },
];

const PRIORITY_COLOR = { high: "#e24b4a", medium: "#ef9f27", low: "#1d9e75" };

/* ── Shared components ────────────────────────────────────── */
function Badge({ status }) {
  return (
    <span className={`badge badge-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  const fillColor = pct >= 90 ? "#e24b4a" : pct >= 70 ? "#ef9f27" : "#1d9e75";
  return (
    <div>
      <div className="progress-meta">
        <span>{value.toLocaleString()} sold</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: fillColor }} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color, bgColor }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon-wrap" style={{ background: bgColor || (color + "22") }}>
          <i className={`ti ${icon}`} style={{ color }} aria-hidden="true" />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

function NavItem({ item, active, onClick }) {
  return (
    <button onClick={onClick} className={`nav-item${active === item.id ? " active" : ""}`}>
      <i className={`ti ${item.icon}`} aria-hidden="true" />
      {item.label}
      {item.id === "bookings" && <span className="nav-badge">3</span>}
    </button>
  );
}

/* ── Root App ─────────────────────────────────────────────── */
export default function App() {
  const [active, setActive]           = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarOpen
        ? sidebarRef.current.classList.add("open")
        : sidebarRef.current.classList.remove("open");
    }
  }, [sidebarOpen]);

  const navTo = (id) => { setActive(id); setSidebarOpen(false); };
  const currentPage = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="app-shell">

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className="sidebar" ref={sidebarRef}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <i className="ti ti-calendar-event" aria-hidden="true" />
          </div>
          <div className="sidebar-logo-text">
            <div className="brand-name">EventFlow</div>
            <div className="brand-sub">Admin Panel</div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main Menu</div>
          {NAV_ITEMS.slice(0, 6).map((item) => (
            <NavItem key={item.id} item={item} active={active} onClick={() => navTo(item.id)} />
          ))}
          <div className="nav-section-label">System</div>
          {NAV_ITEMS.slice(6).map((item) => (
            <NavItem key={item.id} item={item} active={active} onClick={() => navTo(item.id)} />
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">AS</div>
          <div className="user-info">
            <div className="user-name">Aryan Singh</div>
            <div className="user-role">Super Admin</div>
          </div>
          <button className="logout-btn" aria-label="Log out">
            <i className="ti ti-logout" aria-hidden="true" />
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="main-content">
        <header className="topbar">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <i className="ti ti-menu-2" aria-hidden="true" />
          </button>
          <div className="topbar-title">
            <div className="page-title">{currentPage?.label ?? "Dashboard"}</div>
            <div className="page-date">Tuesday, 9 June 2026</div>
          </div>
          <div className="topbar-actions">
            <button className="notif-btn" aria-label="Notifications">
              <i className="ti ti-bell" aria-hidden="true" />
              <span className="notif-dot" />
            </button>
            <button className="add-event-btn">
              <i className="ti ti-plus" aria-hidden="true" />
              New Event
            </button>
          </div>
        </header>

        <main className="page-main">
          {active === "dashboard"  && <DashboardPage />}
          {active === "events"     && <EventsPage />}
          {active === "bookings"   && <BookingsPage />}
          {active === "attendees"  && <AttendeesPage />}
          {active === "venues"     && <VenuesPage />}
          {active === "analytics"  && <AnalyticsPage />}
          {!["dashboard","events","bookings","attendees","venues","analytics"].includes(active) && (
            <div className="empty-page">
              <i className={`ti ${currentPage?.icon}`} aria-hidden="true" />
              <p>{currentPage?.label} — coming soon</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ── Dashboard ────────────────────────────────────────────── */
function DashboardPage() {
  return (
    <div className="dashboard-stack">
      <div className="stat-grid">
        <StatCard icon="ti-calendar-event" label="Total Events"         value="48"     sub="↑ 6 this month"      color="#a09be8" bgColor="#2a2745" />
        <StatCard icon="ti-ticket"         label="Tickets Sold"         value="8,605"  sub="↑ 12% vs last month" color="#3dba8a" bgColor="#082e1e" />
        <StatCard icon="ti-currency-rupee" label="Total Revenue"        value="₹43.5L" sub="↑ 18% growth"        color="#5caaf0" bgColor="#0e2a45" />
        <StatCard icon="ti-users"          label="Registered Attendees" value="12,340" sub="↑ 430 new this week" color="#e0845e" bgColor="#2e1205" />
      </div>

      <div className="mid-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Upcoming Events</span>
            <button className="card-link">View all →</button>
          </div>
          <div className="event-row-list">
            {EVENTS.filter((e) => e.status !== "completed").map((ev) => (
              <div key={ev.id} className="event-row">
                <div className="event-row-icon">
                  <i className="ti ti-calendar" aria-hidden="true" />
                </div>
                <div className="event-row-info">
                  <div className="event-row-name">{ev.name}</div>
                  <div className="event-row-meta">{ev.date} · {ev.venue}</div>
                  <div className="event-row-progress">
                    <ProgressBar value={ev.tickets} max={ev.capacity} />
                  </div>
                </div>
                <Badge status={ev.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="side-col">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Pending Tasks</span>
            </div>
            <div className="task-list">
              {TASKS.map((t, i) => (
                <div key={i} className="task-item">
                  <span className="task-dot" style={{ background: PRIORITY_COLOR[t.priority] }} />
                  <div>
                    <div className="task-label">{t.label}</div>
                    <div className="task-due">Due: {t.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Revenue by Category</span>
            </div>
            <div className="rev-bar-list">
              {[
                { label: "Concerts",    pct: 72, color: "#7f77dd" },
                { label: "Conferences", pct: 55, color: "#378add" },
                { label: "Festivals",   pct: 88, color: "#1d9e75" },
                { label: "Workshops",   pct: 30, color: "#ef9f27" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="rev-bar-meta">
                    <span>{r.label}</span>
                    <span>{r.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${r.pct}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Bookings</span>
          <button className="card-link">View all →</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {["Booking ID","Attendee","Event","Tickets","Amount","Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b) => (
                <tr key={b.id}>
                  <td className="cell-id">{b.id}</td>
                  <td>{b.attendee}</td>
                  <td className="cell-muted">{b.event}</td>
                  <td>{b.tickets}</td>
                  <td className="cell-amount">{b.amount}</td>
                  <td><Badge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Events ───────────────────────────────────────────────── */
function EventsPage() {
  return (
    <div className="events-stack">
      <div className="events-toolbar">
        <span className="events-toolbar-count">48 events total</span>
        <div className="toolbar-right">
          <select className="form-select">
            <option>All Categories</option>
            <option>Conference</option>
            <option>Concert</option>
            <option>Festival</option>
            <option>Workshop</option>
          </select>
          <button className="add-event-btn">
            <i className="ti ti-plus" aria-hidden="true" /> Add Event
          </button>
        </div>
      </div>
      <div className="event-card-list">
        {EVENTS.map((ev) => (
          <div key={ev.id} className="event-card">
            <div className="event-card-icon">
              <i className="ti ti-calendar-event" aria-hidden="true" />
            </div>
            <div className="event-card-info">
              <div className="event-card-name">{ev.name}</div>
              <div className="event-card-meta">{ev.date} · {ev.venue}</div>
              <div className="event-card-prog">
                <ProgressBar value={ev.tickets} max={ev.capacity} />
              </div>
            </div>
            <div className="event-card-right">
              <div className="event-card-revenue">{ev.revenue}</div>
              <div className="event-card-cat">{ev.category}</div>
              <Badge status={ev.status} />
            </div>
            <div className="event-card-actions">
              <button className="icon-btn" aria-label="Edit event">
                <i className="ti ti-edit" aria-hidden="true" />
              </button>
              <button className="icon-btn icon-btn-danger" aria-label="Delete event">
                <i className="ti ti-trash" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Bookings ─────────────────────────────────────────────── */
function BookingsPage() {
  return (
    <div className="card">
      <div className="bookings-toolbar">
        <input className="form-input" placeholder="Search bookings…" />
        <select className="form-select">
          <option>All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {["ID","Attendee","Event","Tickets","Amount","Date","Status","Actions"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b) => (
              <tr key={b.id}>
                <td className="cell-id">{b.id}</td>
                <td>{b.attendee}</td>
                <td className="cell-muted cell-nowrap">{b.event}</td>
                <td>{b.tickets}</td>
                <td className="cell-amount">{b.amount}</td>
                <td className="cell-muted cell-nowrap">{b.date}</td>
                <td><Badge status={b.status} /></td>
                <td>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button className="icon-btn icon-btn-sm" aria-label="View booking">
                      <i className="ti ti-eye" aria-hidden="true" />
                    </button>
                    <button className="icon-btn icon-btn-sm icon-btn-danger" aria-label="Delete booking">
                      <i className="ti ti-trash" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Attendees ────────────────────────────────────────────── */
function AttendeesPage() {
  return (
    <div className="attendees-stack">
      <div className="stat-grid">
        <StatCard icon="ti-users"      label="Total Attendees"   value="12,340" sub="Registered users"  color="#a09be8" bgColor="#2a2745" />
        <StatCard icon="ti-user-check" label="Active This Month" value="4,820"  sub="39% of total"      color="#3dba8a" bgColor="#082e1e" />
        <StatCard icon="ti-user-plus"  label="New Signups"       value="430"    sub="This week"         color="#5caaf0" bgColor="#0e2a45" />
        <StatCard icon="ti-repeat"     label="Returning Rate"    value="64%"    sub="vs 58% last month" color="#e0845e" bgColor="#2e1205" />
      </div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">Attendee Directory</span>
        </div>
        <div className="attendee-list">
          {ATTENDEES.map((a, i) => (
            <div key={i} className="attendee-row">
              <div className="attendee-avatar" style={{ background: a.bg, color: a.color }}>
                {a.initials}
              </div>
              <div className="attendee-info">
                <div className="attendee-name">{a.name}</div>
                <div className="attendee-email">{a.email}</div>
              </div>
              <div className="attendee-stat">
                <div className="attendee-stat-val">{a.events}</div>
                <div className="attendee-stat-lbl">Events</div>
              </div>
              <div className="attendee-stat-right">
                <div className="attendee-stat-val">{a.spent}</div>
                <div className="attendee-stat-lbl">Spent</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Venues ───────────────────────────────────────────────── */
function VenuesPage() {
  return (
    <div className="venues-grid">
      {VENUES.map((v, i) => (
        <div key={i} className="venue-card">
          <div className="venue-card-header">
            <div className="venue-icon">
              <i className={`ti ${v.icon}`} aria-hidden="true" />
            </div>
            <div>
              <div className="venue-name">{v.name}</div>
              <div className="venue-city">{v.city}</div>
            </div>
          </div>
          <div className="venue-stats">
            <div className="venue-stat-cell">
              <div className="venue-stat-val">{v.capacity.toLocaleString()}</div>
              <div className="venue-stat-lbl">Capacity</div>
            </div>
            <div className="venue-stat-cell">
              <div className="venue-stat-val">{v.booked}</div>
              <div className="venue-stat-lbl">Booked</div>
            </div>
            <div className="venue-stat-cell">
              <div className="venue-stat-val">⭐ {v.rating}</div>
              <div className="venue-stat-lbl">Rating</div>
            </div>
          </div>
          <button className="venue-schedule-btn">View Schedule</button>
        </div>
      ))}
    </div>
  );
}

/* ── Analytics ────────────────────────────────────────────── */
function AnalyticsPage() {
  const months  = ["Jan","Feb","Mar","Apr","May","Jun"];
  const revenue = [280000, 420000, 380000, 610000, 720000, 890000];
  const maxRev  = Math.max(...revenue);
  const dayVals = [120, 95, 145, 200, 340, 510, 460];

  return (
    <div className="analytics-stack">
      <div className="stat-grid-sm">
        <StatCard icon="ti-trending-up" label="Monthly Growth"  value="+23%" sub="Revenue vs last month" color="#3dba8a" bgColor="#082e1e" />
        <StatCard icon="ti-eye"         label="Page Views"      value="1.2M" sub="Event listing pages"  color="#a09be8" bgColor="#2a2745" />
        <StatCard icon="ti-click"       label="Conversion Rate" value="8.4%" sub="Views → Purchases"    color="#5caaf0" bgColor="#0e2a45" />
        <StatCard icon="ti-star"        label="Avg Rating"      value="4.6"  sub="Across all events"    color="#d4921e" bgColor="#2e1f05" />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Revenue — Jan to Jun 2026</span>
        </div>
        <div className="bar-chart-wrap">
          {revenue.map((r, i) => (
            <div key={i} className="bar-col">
              <span className="bar-col-label-top">₹{(r / 100000).toFixed(1)}L</span>
              <div
                className="bar-col-bar"
                style={{
                  height: `${Math.round((r / maxRev) * 130)}px`,
                  background: i === 5 ? "#7f77dd" : "#2a2745",
                }}
              />
              <span className="bar-col-label-btm">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-two-col">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Top Performing Events</span>
          </div>
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="events-perf-row"
              style={{ borderBottom: i < EVENTS.length - 1 ? "0.5px solid rgba(255,255,255,0.07)" : "none" }}
            >
              <span>{ev.name}</span>
              <span className="events-perf-revenue">{ev.revenue}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Ticket Sales by Day</span>
          </div>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => (
            <div key={d} className="day-bar-row">
              <div className="day-bar-meta">
                <span>{d}</span>
                <span>{dayVals[i]}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.round((dayVals[i] / 510) * 100)}%`, background: "#7f77dd" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}