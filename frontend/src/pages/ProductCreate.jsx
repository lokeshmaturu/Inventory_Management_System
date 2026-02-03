import React from 'react'
import ProductForm from '../components/products/ProductForm'

export default function ProductCreate() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <div className="bg-white p-4 rounded shadow">
        <ProductForm />
      </div>
    </div>
  )
}
