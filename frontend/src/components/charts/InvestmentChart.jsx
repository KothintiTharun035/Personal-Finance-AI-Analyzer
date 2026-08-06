import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

/**
 * Visualizes year-by-year invested amount vs. projected growth value.
 */
export default function InvestmentChart({ growthProjection = [] }) {
  if (!growthProjection.length) return null

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={growthProjection} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f6f54" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1f6f54" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="investedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#c9a227" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4ded0" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} label={{ value: 'Month', position: 'insideBottom', offset: -2, fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} tickFormatter={(v) => formatCurrency(v)} width={90} />
        <Tooltip formatter={(value) => formatCurrency(value)} labelFormatter={(m) => `Month ${m}`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="totalValue" stroke="#1f6f54" fill="url(#growthGradient)" strokeWidth={2} name="Projected value" />
        <Area type="monotone" dataKey="investedAmount" stroke="#c9a227" fill="url(#investedGradient)" strokeWidth={2} name="Amount invested" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
