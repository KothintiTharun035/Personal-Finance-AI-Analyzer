import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found__code figure-lg">404</span>
      <h1>Page not found</h1>
      <p className="text-muted">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="home__cta-primary">Back to home</Link>
    </div>
  )
}
