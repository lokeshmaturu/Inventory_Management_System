import { useState, useEffect } from 'react'

const STORAGE_KEY = 'daily_reports'

export default function useReports() {
  const [reports, setReports] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  // Sync state to storage whenever it changes (optional optimization: only on add)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
  }, [reports])

  const addReport = (report) => {
    const newReports = [report, ...reports]
    setReports(newReports)
  }

  return { reports, addReport }
}
