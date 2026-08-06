import api from './api'

export async function previewLoan(payload) {
  const { data } = await api.post('/loans/calculate', payload)
  return data
}

export async function saveLoan(payload) {
  const { data } = await api.post('/loans', payload)
  return data
}

export async function getLoans() {
  const { data } = await api.get('/loans')
  return data
}

export async function getLoan(id) {
  const { data } = await api.get(`/loans/${id}`)
  return data
}

export async function deleteLoan(id) {
  const { data } = await api.delete(`/loans/${id}`)
  return data
}