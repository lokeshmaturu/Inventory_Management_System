import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../api/productApi'
import ProductForm from '../components/products/ProductForm'

export default function ProductEdit() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await productApi.get(id)
        setProduct(res.data)
      } catch (err) {}
    }
    fetch()
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="bg-white p-4 rounded shadow">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
