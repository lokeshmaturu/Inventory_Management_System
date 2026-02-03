import React, { useEffect, useState } from 'react'
import productApi from '../api/productApi'
import ProductTable from '../components/products/ProductTable'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const res = await productApi.list()
        setProducts(res.data || [])
      } catch (err) {
        setProducts([])
      }
    }
    fetch()
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Product</Link>
      </div>
      <ProductTable products={products} />
    </div>
  )
}
