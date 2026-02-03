import React, { useState } from 'react'
import orderApi from '../../api/orderApi'

export default function SalesForm() {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await orderApi.createSale({ productId, quantity })
      setMessage('Sale recorded')
    } catch (err) { setMessage('Error') }
  }

  return (
    <form onSubmit={submit}>
      {message && <div className="mb-3">{message}</div>}
      <input placeholder="Product ID" className="w-full p-2 mb-2 border rounded" value={productId} onChange={e=>setProductId(e.target.value)} />
      <input type="number" placeholder="Quantity" className="w-full p-2 mb-2 border rounded" value={quantity} onChange={e=>setQuantity(e.target.value)} />
      <button className="bg-blue-600 text-white px-3 py-1 rounded">Record Sale</button>
    </form>
  )
}
