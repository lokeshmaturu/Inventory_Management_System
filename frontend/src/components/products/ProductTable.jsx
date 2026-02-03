import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductTable({ products = [] }) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id || p.id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.sku || '-'}</td>
              <td className="px-4 py-2">{p.category || '-'}</td>
              <td className="px-4 py-2">{p.quantity ?? p.stock ?? 0}</td>
              <td className="px-4 py-2 text-center">
                <Link to={`/products/${p._id || p.id}/edit`} className="text-blue-600">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
