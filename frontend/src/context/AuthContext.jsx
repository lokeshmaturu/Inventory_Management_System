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
    // Pure Mock Mode: Skip Backend Call
    try {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 600));

      const email = credentials.email.toLowerCase()
      let role = 'staff'
      let name = 'Staff User'
      
      if (email.includes('admin')) {
         role = 'admin'
         name = 'Admin User'
      } else if (email.includes('manager')) {
         role = 'manager'
         name = 'Manager User'
      }

      const mockUser = {
         id: 'mock-id-' + Date.now(),
         name,
         email: credentials.email,
         role
      }

      localStorage.setItem('token', 'mock-token')
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      return mockUser
    } catch (error) {
       console.error("Login logic error", error)
       throw error
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
