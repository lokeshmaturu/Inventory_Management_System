import React, { useState } from 'react'
import orderApi from '../../api/orderApi'

export default function PurchaseForm(){
  const [supplierId, setSupplierId] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [message, setMessage] = useState(null)

  const submit = async(e)=>{
    e.preventDefault()
    try {
      await orderApi.createPurchase({ supplierId, productId, quantity })
      setMessage('Purchase recorded')
    } catch (err) { setMessage('Error') }
  }

  return (
    <form onSubmit={submit}>
      {message && <div className="mb-3">{message}</div>}
      <input placeholder="Supplier ID" className="w-full p-2 mb-2 border rounded" value={supplierId} onChange={e=>setSupplierId(e.target.value)} />
      <input placeholder="Product ID" className="w-full p-2 mb-2 border rounded" value={productId} onChange={e=>setProductId(e.target.value)} />
      <input type="number" placeholder="Quantity" className="w-full p-2 mb-2 border rounded" value={quantity} onChange={e=>setQuantity(e.target.value)} />
      <button className="bg-green-600 text-white px-3 py-1 rounded">Record Purchase</button>
    </form>
  )
}
