import React from 'react'
import { Link } from 'react-router-dom'

export default function SupplierList({ suppliers = [] }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {suppliers.map(s => (
        <div key={s._id || s.id} className="p-3 border-b flex justify-between items-center">
          <div>
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-gray-500">{s.contact || s.email || ''} {s.phone ? `• ${s.phone}` : ''}</div>
          </div>
          <div>
            <Link to={`/suppliers/${s._id||s.id}/products`} className="text-blue-600">Products</Link>
          </div>
        </div>
      ))}
      {suppliers.length === 0 && <div className="p-4">No suppliers</div>}
    </div>
  )
}
