import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} Personal Finance Analyzer</span>
        <span className="text-muted">Built for learning — not certified financial advice.</span>
      </div>
    </footer>
  )
}
