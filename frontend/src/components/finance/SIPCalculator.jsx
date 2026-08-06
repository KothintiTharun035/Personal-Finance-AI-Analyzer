import React, { useState, useMemo } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { calculateSIPFutureValue } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'
import './finance.css'

const initialState = {
  investmentName: '',
  monthlyInvestment: '',
  expectedAnnualReturn: '12',
  tenureMonths: '',
}

export default function SIPCalculator({ onSubmit, submitting }) {
  const [form, setForm] = useState(initialState)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const preview = useMemo(() => {
    const m = Number(form.monthlyInvestment)
    const r = Number(form.expectedAnnualReturn)
    const n = Number(form.tenureMonths)
    if (!m || !r || !n) return null
    const futureValue = calculateSIPFutureValue(m, r, n)
    const invested = m * n
    return { futureValue, invested, gains: futureValue - invested }
  }, [form.monthlyInvestment, form.expectedAnnualReturn, form.tenureMonths])

  function handleSubmit(e) {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    const monthly = Number(form.monthlyInvestment);
    const months = Number(form.tenureMonths);
    const rate = Number(form.expectedAnnualReturn);

    const investedAmount = monthly;

    const futureValue = calculateSIPFutureValue(
      monthly,
      rate,
      months
    );

    onSubmit({
      investmentName: form.investmentName || "SIP Investment",

      type: "MUTUAL_FUND",

      investedAmount,

      currentValue: futureValue,

      expectedReturn: rate,

      investmentDate: today,

      tenureMonths: months,
    });
  }

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <Input
        label="Investment name (optional)"
        name="investmentName"
        value={form.investmentName}
        onChange={handleChange}
        placeholder="e.g. Nifty index fund SIP"
      />

      <Input
        label="Monthly investment"
        name="monthlyInvestment"
        type="number"
        min="0"
        step="500"
        prefix="₹"
        value={form.monthlyInvestment}
        onChange={handleChange}
        required
      />

      <Input
        label="Expected annual return"
        name="expectedAnnualReturn"
        type="number"
        min="0"
        step="0.5"
        suffix="%"
        value={form.expectedAnnualReturn}
        onChange={handleChange}
        helpText="Typical equity mutual fund long-term average: 10–14%"
        required
      />

      <Input
        label="Tenure"
        name="tenureMonths"
        type="number"
        min="1"
        suffix="months"
        value={form.tenureMonths}
        onChange={handleChange}
        required
      />

      {preview ? (
        <div className="finance-form__preview">
          <div>
            <span className="text-muted">Maturity value</span>
            <div className="figure-lg">{formatCurrency(preview.futureValue)}</div>
          </div>
          <div>
            <span className="text-muted">Est. gains</span>
            <div className="figure delta-positive">{formatCurrency(preview.gains)}</div>
          </div>
        </div>
      ) : null}

      <Button type="submit" full loading={submitting}>Calculate & save</Button>
    </form>
  )
}
