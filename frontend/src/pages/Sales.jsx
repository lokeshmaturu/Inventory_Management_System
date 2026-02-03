import React from 'react'
import SalesForm from '../components/sales/SalesForm'

export default function Sales() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <div className="bg-white p-4 rounded shadow">
        <SalesForm />
      </div>
    </div>
  )
}
