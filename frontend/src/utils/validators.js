export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0
}

export function isPositiveNumber(value) {
  const num = Number(value)
  return !Number.isNaN(num) && num > 0
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function minLength(value, min) {
  return String(value || '').length >= min
}

/**
 * Validates a set of { fieldName: value } against a set of
 * { fieldName: (value) => errorString | null } rules.
 * Returns an errors object with only failing fields.
 */
export function validateForm(values, rules) {
  const errors = {}
  Object.keys(rules).forEach((field) => {
    const error = rules[field](values[field])
    if (error) errors[field] = error
  })
  return errors
}
