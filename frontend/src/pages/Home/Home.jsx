import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/landing/Navbar";
import "./Home.css";
import Hero from "../../components/landing/hero/Hero";
import TrustedCompanies from "../../components/landing/TrustedCompanies";
import Stats from "../../components/landing/Stats";
import HowItWorks from "../../components/landing/HowItWorks";
import AIShowcase from "../../components/landing/AIShowcase";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

const FEATURES = [
  {
    title: "Loan Analyzer",
    desc: "Model EMIs, total interest, and full amortization schedules for any loan.",
    icon: "⌗",
  },
  {
    title: "Investment Analyzer",
    desc: "Project SIP and Fixed Deposit growth over time with real compounding math.",
    icon: "△",
  },
  {
    title: "Goal Planner",
    desc: "Work backward from a target amount to the monthly investment you actually need.",
    icon: "◎",
  },
  {
    title: "AI Advisor",
    desc: "Ask questions and get advice grounded in your real loans, investments, and goals.",
    icon: "✦",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />

      <div className="home">
        <Hero />

        {/* Features Section */}
        <section id="features" className="container home__features">
          <div className="features-header">
            <span className="features-badge">✨ Features</span>

            <h2 className="features-title">
              Powerful Financial Tools
            </h2>

            <p className="features-subtitle">
              Everything you need to analyze loans, manage investments,
              achieve financial goals, and receive AI-powered financial
              guidance all in one intelligent platform.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature) => (
              <div className="home__feature card" key={feature.title}>
                <span className="home__feature-icon">
                  {feature.icon}
                </span>

                <h3>{feature.title}</h3>

                <p className="text-muted">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <TrustedCompanies />
        <Stats />
        <HowItWorks />
        <AIShowcase />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}