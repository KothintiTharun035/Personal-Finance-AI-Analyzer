import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

const COLORS = ['#12213b', '#1f6f54', '#c9a227', '#b23a2f', '#6b7280']

/**
 * Breaks down monthly commitments: EMIs vs SIP/investment contributions.
 */
export default function ExpenseChart({ totalMonthlyEmi = 0, totalMonthlyInvestment = 0 }) {
  const data = [
    { name: 'Loan EMIs', value: totalMonthlyEmi },
    { name: 'Investments', value: totalMonthlyInvestment },
  ].filter((d) => d.value > 0)

 if (!data.length) {
    return (
        <div className="empty-chart">
            <p>No monthly commitments recorded yet.</p>
        </div>
    );
}

  

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
