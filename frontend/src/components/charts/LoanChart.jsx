import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export default function LoanChart({ schedule = [] }) {

  if (!schedule.length) return null

  const data = schedule
    .filter((_, idx) => idx % Math.max(1, Math.floor(schedule.length / 40)) === 0)
    .map((row) => ({
      month: row.month,
      balance: row.balance,
    }))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
      >
        <defs>
          <linearGradient
            id="balanceGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 11 }}
          label={{
            value: "Month",
            position: "insideBottom",
            offset: -5,
          }}
        />

        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          width={95}
        />

        <Tooltip
          formatter={(value) => formatCurrency(value)}
          labelFormatter={(month) => `Month ${month}`}
        />

        <Area
          type="monotone"
          dataKey="balance"
          name="Remaining Balance"
          stroke="#2563eb"
          strokeWidth={3}
          fill="url(#balanceGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}