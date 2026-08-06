/**
 * Client-side mirrors of the backend's core formulas.
 * Used for instant, no-network live previews as users type;
 * the authoritative calculation still comes from the backend on submit.
 */

export function calculateEMI(principal, annualRate, tenureMonths) {
  const monthlyRate = annualRate / 100 / 12
  if (!principal || !tenureMonths) return 0
  if (monthlyRate === 0) return principal / tenureMonths
  const factor = Math.pow(1 + monthlyRate, tenureMonths)
  return (principal * monthlyRate * factor) / (factor - 1)
}

export function calculateSIPFutureValue(monthlyInvestment, annualRate, tenureMonths) {
  const monthlyRate = annualRate / 100 / 12
  if (!monthlyInvestment || !tenureMonths) return 0
  if (monthlyRate === 0) return monthlyInvestment * tenureMonths
  const factor = Math.pow(1 + monthlyRate, tenureMonths)
  return monthlyInvestment * ((factor - 1) / monthlyRate) * (1 + monthlyRate)
}

export function calculateLumpSumFutureValue(principal, annualRate, tenureMonths) {
  if (!principal || !tenureMonths) return 0
  const years = tenureMonths / 12
  const compoundingPerYear = 4
  const rate = annualRate / 100
  return principal * Math.pow(1 + rate / compoundingPerYear, compoundingPerYear * years)
}
