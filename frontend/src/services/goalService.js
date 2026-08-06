import api from './api'

export async function createGoal(payload) {
  const { data } = await api.post('/goals', payload)
  return data
}

export async function getGoals() {
  const { data } = await api.get('/goals')
  return data
}

export async function getGoal(id) {
  const { data } = await api.get(`/goals/${id}`)
  return data
}

export async function updateGoal(id, payload) {
  const { data } = await api.put(`/goals/${id}`, payload)
  return data
}

export async function deleteGoal(id) {
  await api.delete(`/goals/${id}`)
}
