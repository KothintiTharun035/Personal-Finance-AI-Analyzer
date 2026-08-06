import { useState, useRef, useEffect } from "react";
import {
  Landmark,
  Search,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="navbar">

      {/* Left */}

      <div className="navbar-left">

        <Landmark size={32} />

        <h2>FinanceAI</h2>

      </div>

      {/* Search */}

      <div className="navbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search (Coming Soon)"
        />

      </div>

      {/* Right */}

      <div className="navbar-right">

        <button className="notification-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div
          className="profile-dropdown"
          ref={dropdownRef}
        >

          <button
            className="profile-btn"
            onClick={() => setOpen(!open)}
          >

            <div className="profile-avatar">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <span>
              {user?.fullName?.split(" ")[0] || "User"}
            </span>

            <ChevronDown size={18} />

          </button>

          {open && (

            <div className="dropdown-menu">

              <button
                onClick={handleLogout}
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}