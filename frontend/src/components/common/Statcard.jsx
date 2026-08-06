import React from 'react'
import './StatCard.css'
import { formatCurrency } from '../../utils/formatters'

/**
 * The app's signature "ledger" stat card: tabular monospace figure,
 * a thin ruled underline, and an optional delta indicating direction.
 */
export default function StatCard({ label, value, isCurrency = true, delta, tone = 'neutral', icon }) {
  const toneClass = tone === 'growth' ? 'stat-card--growth' : tone === 'debt' ? 'stat-card--debt' : ''

  return (
    <div className={`stat-card ${toneClass}`}>
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {icon ? <span className="stat-card__icon">{icon}</span> : null}
      </div>
      <div className="figure-lg stat-card__value">
        {isCurrency ? formatCurrency(value) : value}
      </div>
      <hr className="ledger-rule" />
      {delta ? (
        <span className={`stat-card__delta ${delta.positive ? 'delta-positive' : 'delta-negative'}`}>
          {delta.positive ? '▲' : '▼'} {delta.label}
        </span>
      ) : null}
    </div>
  )
}
