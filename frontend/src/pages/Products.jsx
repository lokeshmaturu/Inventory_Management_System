import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import productApi from '../api/productApi'
import ProductTable from '../components/products/ProductTable'

export default function Products() {
  const [products, setProducts] = useState([])
  const { user } = useAuth()
  const canCreate = ['admin', 'manager'].includes(user?.role)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await productApi.list()
        setProducts(res.data || [])
      } catch (err) {
        // Fallback to mock data if backend fails
        setProducts([
           { _id: '1', name: 'Laptop', sku: 'LAP-001', category: 'Electronics', quantity: 45 },
           { _id: '2', name: 'Wireless Mouse', sku: 'MOU-002', category: 'Accessories', quantity: 120 },
           { _id: '3', name: 'Mechanical Keyboard', sku: 'KEY-003', category: 'Accessories', quantity: 80 },
           { _id: '4', name: 'HD Monitor', sku: 'MON-004', category: 'Electronics', quantity: 30 },
           { _id: '5', name: 'Gaming Headset', sku: 'HEA-005', category: 'Accessory', quantity: 65 }
        ])
      }
    }
    fetch()
  }, [])

  return (
    <div className="p-6 animate-in fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        {canCreate && (
           <Link to="/products/new" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm font-medium">
              + Add Product
           </Link>
        )}
      </div>
      <ProductTable products={products} />
    </div>
  )
}
