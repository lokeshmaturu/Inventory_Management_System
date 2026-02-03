import React from 'react'

export default function SupplierProducts({ products = [] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      {products.length ? products.map(p => <div key={p._id||p.id}>{p.name}</div>) : <div>No products</div>}
    </div>
  )
}
