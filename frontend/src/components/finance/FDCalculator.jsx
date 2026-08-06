import React, { useState, useMemo } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { calculateLumpSumFutureValue } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'
import './finance.css'

const initialState = {
  investmentName: '',
  lumpSum: '',
  expectedAnnualReturn: '7',
  tenureMonths: '',
}

export default function FDCalculator({ onSubmit, submitting }) {
  const [form, setForm] = useState(initialState)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const preview = useMemo(() => {
    const p = Number(form.lumpSum)
    const r = Number(form.expectedAnnualReturn)
    const n = Number(form.tenureMonths)
    if (!p || !r || !n) return null
    const futureValue = calculateLumpSumFutureValue(p, r, n)
    return { futureValue, gains: futureValue - p }
  }, [form.lumpSum, form.expectedAnnualReturn, form.tenureMonths])

  function handleSubmit(e) {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    const principal = Number(form.lumpSum);
    const months = Number(form.tenureMonths);
    const rate = Number(form.expectedAnnualReturn);

    const futureValue = calculateLumpSumFutureValue(
      principal,
      rate,
      months
    );

    onSubmit({
      investmentName: form.investmentName || "Fixed Deposit",

      type: "FIXED_DEPOSIT",

      investedAmount: principal,

      currentValue: futureValue,

      expectedReturn: rate,

      investmentDate: today,

      tenureMonths: months,
    });
  }

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <Input
        label="Deposit name (optional)"
        name="investmentName"
        value={form.investmentName}
        onChange={handleChange}
        placeholder="e.g. 3-year bank FD"
      />

      <Input
        label="Lump sum deposit"
        name="lumpSum"
        type="number"
        min="0"
        step="1000"
        prefix="₹"
        value={form.lumpSum}
        onChange={handleChange}
        required
      />

      <Input
        label="Annual interest rate"
        name="expectedAnnualReturn"
        type="number"
        min="0"
        step="0.1"
        suffix="%"
        value={form.expectedAnnualReturn}
        onChange={handleChange}
        helpText="Compounded quarterly, the standard FD convention"
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
            <span className="text-muted">Interest earned</span>
            <div className="figure delta-positive">{formatCurrency(preview.gains)}</div>
          </div>
        </div>
      ) : null}

      <Button type="submit" full loading={submitting}>Calculate & save</Button>
    </form>
  )
}
