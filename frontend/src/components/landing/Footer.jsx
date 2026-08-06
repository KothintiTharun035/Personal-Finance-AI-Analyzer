
import {
  Mail,
  Landmark,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";


import "./Footer.css";


export default function Footer() {

  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Left Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <Landmark size={28} />
            <h2>FinanceAI</h2>
          </div>

          <p>
            AI-powered personal finance platform helping users manage loans,
            investments, savings, and financial goals with intelligent insights.
          </p>
        </div>

        {/* Middle Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-section footer-animation">

          <div className="footer-placeholder">
            <h3>Get in Touch</h3>
            <p>We'd love to hear from you.</p>
          </div>

          <div className="social-icons">

            <a
              href="mailto:kothintitharun@gmail.com"
              className="social-icon"
            >
              <Mail size={22} />
            </a>

            <a
              href="https://github.com/KothintiTharun035"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="https://instagram.com/kothintitharun"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
            >
              <FaInstagram size={22} />
            </a>

          </div>

        </div>

      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} FinanceAI. Designed and Developed by Tharun❤️
      </div>
    </footer>
  );
}