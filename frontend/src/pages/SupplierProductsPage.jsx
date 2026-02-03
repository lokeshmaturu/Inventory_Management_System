import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supplierApi from '../api/supplierApi'

export default function SupplierProductsPage() {
  const { id } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const res = await supplierApi.products(id)
        setProducts(res.data || [])
      } catch (err) { setProducts([]) }
    }
    fetch()
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Products</h1>
      <div className="bg-white p-4 rounded shadow">{products.length ? products.map(p=> <div key={p._id||p.id}>{p.name}</div>) : 'No products'}</div>
    </div>
  )
}
