import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  Target,
  BrainCircuit,
  User,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/loans",
    label: "Loan Analyzer",
    icon: Landmark,
  },
  {
    to: "/investments",
    label: "Investments",
    icon: TrendingUp,
  },
  {
    to: "/goals",
    label: "Goal Planner",
    icon: Target,
  },
  {
    to: "/ai-advisor",
    label: "AI Advisor",
    icon: BrainCircuit,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">

      {/* Logo */}

      

      {/* Navigation */}

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-active" : ""}`
              }
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}

      <div className="sidebar-profile">

        <div className="profile-avatar">
          {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="profile-info">
          <h4>{user?.fullName || "User"}</h4>
          <p>FinanceAI User</p>
        </div>

      </div>

      {/* Logout */}

      <button
        className="sidebar-logout"
        onClick={logout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

    </aside>
  );
}