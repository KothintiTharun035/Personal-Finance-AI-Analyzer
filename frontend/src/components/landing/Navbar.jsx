import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Landmark, Menu, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


import "./Navbar.css";

const navLinks = [
  { name: "Features", to: "features" },
  { name: "How It Works", to: "how-it-works" },
  { name: "FAQ", to: "faq" },
];



const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="navbar-container">

          {/* Logo */}

          <div className="logo">

            <Landmark className="logo-icon" />

            <span>FinanceAI</span>

          </div>

          {/* Desktop Navigation */}

          <div className="nav-links">

            {navLinks.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={600}
                offset={-90}
                className="nav-link"
              >
                {item.name}
              </ScrollLink>
            ))}

          </div>

          {/* Desktop Buttons */}

          <div className="nav-actions">

            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Mobile Button */}

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Menu */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {navLinks.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={600}
                offset={-90}
                onClick={closeMenu}
                className="mobile-link"
              >
                {item.name}
              </ScrollLink>
            ))}

            <button
              className="login-btn mobile-btn"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              Login
            </button>

            <button
              className="primary-btn mobile-btn"
              onClick={() => {
                closeMenu();
                navigate("/register");
              }}
            >
              Get Started
            </button>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
};

export default Navbar;