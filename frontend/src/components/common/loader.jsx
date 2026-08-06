import React from 'react'
import './Loader.css'

export default function Loader({ label = 'Loading...', fullScreen = false, size = 'md' }) {
  return (
    <div className={`loader ${fullScreen ? 'loader--fullscreen' : ''}`} role="status" aria-live="polite">
      <span className={`loader__ring loader__ring--${size}`} aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  )
}
