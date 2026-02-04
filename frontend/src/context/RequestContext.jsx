import React, { createContext, useState, useEffect, useContext } from 'react'

const RequestContext = createContext()

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('update_requests')
    if (stored) setRequests(JSON.parse(stored))
  }, [])

  const saveRequests = (newRequests) => {
    setRequests(newRequests)
    localStorage.setItem('update_requests', JSON.stringify(newRequests))
  }

  const addRequest = (product, changes, user) => {
    const newReq = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      currentData: product,
      changes,
      status: 'pending_admin', // Start -> Admin Overview
      requestedBy: user.name,
      requestedAt: new Date().toISOString()
    }
    saveRequests([...requests, newReq])
  }

  const adminOverview = (reqId, approved) => {
    const newRequests = requests.map(r => {
      if (r.id === reqId) {
        return { ...r, status: approved ? 'pending_manager' : 'rejected_admin', overviewedAt: new Date().toISOString() }
      }
      return r
    })
    saveRequests(newRequests)
  }

  const managerUpdate = (reqId, approved) => {
    const newRequests = requests.map(r => {
      if (r.id === reqId) {
        return { ...r, status: approved ? 'approved' : 'rejected_manager', updatedAt: new Date().toISOString() }
      }
      return r
    })
    saveRequests(newRequests)
  }

  return (
    <RequestContext.Provider value={{ requests, addRequest, adminOverview, managerUpdate }}>
      {children}
    </RequestContext.Provider>
  )
}

export const useRequest = () => useContext(RequestContext)
