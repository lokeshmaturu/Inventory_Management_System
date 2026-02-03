import React, { createContext, useState, useEffect } from 'react'
import authApi from '../api/authApi'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
       try { 
          setUser(JSON.parse(stored)) 
       } catch(e) { 
          console.error("Failed to parse user", e)
          localStorage.removeItem('user')
       }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const res = await authApi.login(credentials)
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      return user
    } finally {
      setLoading(false)
    }
  }

  const setUserLocal = (userObj, token = 'dev-token') => {
    // Dev helper: persist a user locally without backend
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userObj))
    setUser(userObj)
    // Force a small delay to ensure state propagates if needed, though react batching usually handles it
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUserLocal }}>
      {children}
    </AuthContext.Provider>
  )
}
