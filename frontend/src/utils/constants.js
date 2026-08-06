export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const LOAN_TYPES = [
  { label: 'Home Loan', value: 'HOME_LOAN' },
  { label: 'Personal Loan', value: 'PERSONAL_LOAN' },
  { label: 'Education Loan', value: 'EDUCATION_LOAN' },
  { label: 'Vehicle Loan', value: 'VEHICLE_LOAN' },
  { label: 'Business Loan', value: 'BUSINESS_LOAN' },
  { label: 'Gold Loan', value: 'GOLD_LOAN' },
  { label: 'Credit Card', value: 'CREDIT_CARD' },
  { label: 'Other', value: 'OTHER' },
]

export const INVESTMENT_TYPES = [
  { value: 'SIP', label: 'SIP (Mutual Fund)' },
  { value: 'FD', label: 'Fixed Deposit' },
  { value: 'RD', label: 'Recurring Deposit' },
  { value: 'LUMP_SUM', label: 'Lump Sum' },
  { value: 'MUTUAL_FUND', label: 'Mutual Fund' },
  { value: 'STOCKS', label: 'Stocks' },
  { value: 'OTHER', label: 'Other' },
]

export const GOAL_STATUS_LABELS = {
  IN_PROGRESS: 'In progress',
  ACHIEVED: 'Achieved',
  MISSED: 'Missed',
}

export const TOKEN_STORAGE_KEY = 'pfa_token'
export const USER_STORAGE_KEY = 'pfa_user'
