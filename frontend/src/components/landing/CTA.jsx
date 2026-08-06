import { Link } from "react-router-dom";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="container cta__container">
        <h2>Start Building a Better Financial Future Today</h2>

        <p>
          Join thousands of users who are planning smarter, investing
          confidently, and making informed financial decisions with FinanceAI.
        </p>

        <div className="cta__buttons">
          <Link to="/register" className="cta__primary">
            Create Free Account
          </Link>

          <Link to="/login" className="cta__secondary">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}