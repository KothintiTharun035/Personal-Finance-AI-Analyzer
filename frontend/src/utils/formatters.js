export function formatCurrency(value, currency = 'INR') {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value, decimals = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${formatNumber(value, decimals)}%`
}

export function formatDate(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function monthsToYearsLabel(months) {
  if (!months) return '—'
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  if (years === 0) return `${months} mo`
  if (remMonths === 0) return `${years} yr`
  return `${years} yr ${remMonths} mo`
}
