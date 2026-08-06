import React, { createContext, useState, useEffect, useCallback } from 'react'
import * as authService from '../services/authService'
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../utils/constants'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .getCurrentUser()
      .then((freshUser) => {
        setUser(freshUser)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(freshUser))
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        localStorage.removeItem(USER_STORAGE_KEY)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username, password) => {
    const response = await authService.login(username, password)
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token)
    const currentUser = {
      id: response.id,
      email: response.email,
      fullName: response.fullName,
      role: response.role,
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser))
    setUser(currentUser)
    return currentUser
  }, [])

  const register = useCallback(async (payload) => {
    const response = await authService.register(payload)
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token)
    const currentUser = {
      id: response.id,
      email: response.email,
      fullName: response.fullName,
      role: response.role,
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser))
    setUser(currentUser)
    return currentUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }, [])

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
