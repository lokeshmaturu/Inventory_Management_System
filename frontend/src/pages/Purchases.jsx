import React from 'react'
import PurchaseForm from '../components/sales/PurchaseForm'

export default function Purchases(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purchases</h1>
      <div className="bg-white p-4 rounded shadow">
        <PurchaseForm />
      </div>
    </div>
  )
}
