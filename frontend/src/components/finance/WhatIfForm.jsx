import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { calculateEMI } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'
import './finance.css'

/**
 * Lets a user tweak an existing loan's rate/tenure to see the EMI impact,
 * without saving anything — a quick "what if I refinanced?" sandbox.
 */
export default function WhatIfForm({ baseLoan }) {
  const [rate, setRate] = useState(baseLoan?.annualInterestRate ?? 8)
  const [tenure, setTenure] = useState(baseLoan?.tenureMonths ?? 120)

  const newEmi = calculateEMI(baseLoan?.principalAmount ?? 0, Number(rate), Number(tenure))
  const emiDelta = newEmi - (baseLoan?.emiAmount ?? 0)

  return (
    <div className="finance-form">
      <h4>What if I changed the terms?</h4>
      <p className="text-muted">Principal stays fixed at {formatCurrency(baseLoan?.principalAmount)}.</p>

      <div className="finance-form__row">
        <Input
          label="New interest rate"
          type="number"
          step="0.1"
          suffix="%"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <Input
          label="New tenure"
          type="number"
          suffix="months"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>

      <div className="finance-form__preview">
        <div>
          <span className="text-muted">New EMI</span>
          <div className="figure-lg">{formatCurrency(newEmi)}</div>
        </div>
        <div>
          <span className="text-muted">Change vs. current</span>
          <div className={`figure ${emiDelta <= 0 ? 'delta-positive' : 'delta-negative'}`}>
            {emiDelta <= 0 ? '−' : '+'}{formatCurrency(Math.abs(emiDelta))}
          </div>
        </div>
      </div>
    </div>
  )
}
