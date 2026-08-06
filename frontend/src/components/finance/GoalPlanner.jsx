import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import './finance.css'

const initialState = {
  goalName: '',
  targetAmount: '',
  currentSavings: '0',
  targetMonths: '',
  expectedAnnualReturn: '8',
}

export default function GoalPlanner({ onSubmit, submitting, initialValues }) {
  const [form, setForm] = useState(initialValues || initialState)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      goalName: form.goalName,
      targetAmount: Number(form.targetAmount),
      currentSavings: Number(form.currentSavings || 0),
      tenureMonths: Number(form.targetMonths),
      expectedReturn: Number(form.expectedAnnualReturn || 8),
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    onSubmit(payload);
  }

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <Input
        label="Goal name"
        name="goalName"
        value={form.goalName}
        onChange={handleChange}
        placeholder="e.g. Down payment for a house"
        required
      />

      <Input
        label="Target amount"
        name="targetAmount"
        type="number"
        min="0"
        step="1000"
        prefix="₹"
        value={form.targetAmount}
        onChange={handleChange}
        required
      />

      <Input
        label="Current savings toward this goal"
        name="currentSavings"
        type="number"
        min="0"
        step="500"
        prefix="₹"
        value={form.currentSavings}
        onChange={handleChange}
      />

      <Input
        label="Target timeline"
        name="targetMonths"
        type="number"
        min="1"
        suffix="months"
        value={form.targetMonths}
        onChange={handleChange}
        required
      />

      <Input
        label="Expected annual return on savings"
        name="expectedAnnualReturn"
        type="number"
        min="0"
        step="0.5"
        suffix="%"
        value={form.expectedAnnualReturn}
        onChange={handleChange}
        helpText="Blended rate for how you plan to invest toward this goal"
      />

      <Button
        type="submit"
        full
        loading={submitting}
        className="goal-save-btn"
      >
        Save goal
      </Button>
    </form>
  )
}
