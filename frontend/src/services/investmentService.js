import api from './api'

export async function saveInvestment(payload) {
  const { data } = await api.post('/investments', payload)
  return data
}

export async function getInvestments() {
  const { data } = await api.get('/investments')
  return data
}

export async function getInvestment(id) {
  const { data } = await api.get(`/investments/${id}`)
  return data
}

export async function deleteInvestment(id) {
  await api.delete(`/investments/${id}`)
}