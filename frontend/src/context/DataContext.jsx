import React, { createContext, useState, useEffect } from 'react'
import { demoData } from '../data/basicData'

export const DataContext = createContext()

const STORAGE_KEY = 'demoData'

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      return null
    }
  })

  useEffect(() => {
    // nothing to do on mount beyond initial state
  }, [])

  const seedDemoData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData))
    setData(demoData)
  }

  const clearDemoData = () => {
    localStorage.removeItem(STORAGE_KEY)
    setData(null)
  }

  return (
    <DataContext.Provider value={{ data, seedDemoData, clearDemoData }}>
      {children}
    </DataContext.Provider>
  )
}
