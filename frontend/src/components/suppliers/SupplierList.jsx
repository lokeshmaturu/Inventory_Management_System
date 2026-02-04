import React from 'react'
import { Link } from 'react-router-dom'

export default function SupplierList({ suppliers = [], isManager }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {(Array.isArray(suppliers) ? suppliers : []).map(s => (
        <div key={s._id || s.id} className="p-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 transition-colors">
          <div>
            <div className="font-semibold text-gray-900">{s.name}</div>
            <div className="text-sm text-gray-500">{s.contact || s.email || ''} {s.phone ? `• ${s.phone}` : ''}</div>
          </div>
          <div className="flex items-center gap-4">
            <Link to={`/suppliers/${s._id||s.id}/products`} className="text-primary-600 hover:text-primary-700 font-medium text-sm">Products</Link>
            {isManager && (
               <button className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
            )}
          </div>
        </div>
      ))}
      {(!Array.isArray(suppliers) || suppliers.length === 0) && <div className="p-8 text-center text-gray-500">No suppliers found.</div>}
    </div>
  )
}
