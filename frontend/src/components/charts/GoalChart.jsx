import React from 'react'
import { formatPercent } from '../../utils/formatters'
import './GoalChart.css'

/**
 * Simple horizontal progress bar for a goal's current savings vs target.
 * Kept as lightweight SVG/CSS rather than a full chart library component
 * since a single ratio doesn't need axes or tooltips.
 */
export default function GoalChart({ progressPercentage = 0 }) {
  const clamped = Math.min(100, Math.max(0, progressPercentage))

  return (
    <div className="goal-chart">
      <div className="goal-chart__track">
        <div className="goal-chart__fill" style={{ width: `${clamped}%` }} />
      </div>
      <span className="figure goal-chart__label">{formatPercent(clamped)} funded</span>
    </div>
  )
}
