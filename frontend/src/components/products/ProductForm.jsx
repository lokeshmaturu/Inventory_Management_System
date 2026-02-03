import React, { useState, useEffect } from 'react'
import productApi from '../../api/productApi'

export default function ProductForm({ product, onSubmitOverride }) {
  const [form, setForm] = useState({ name: '', sku: '', category: '', price: 0, stock: 0, expiryDate: '' })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (product) setForm(product)
  }, [product])

  const submit = async (e) => {
    e.preventDefault()
    if (onSubmitOverride) {
      // Allow parent to handle submission (e.g. for Staff Request workflow)
      await onSubmitOverride(form)
      return
    }
    
    try {
      if (product && product._id) await productApi.update(product._id, form)
      else await productApi.create(form)
      setMessage('Saved')
    } catch (err) {
      setMessage('Error saving')
    }
  }

  return (
    <form onSubmit={submit}>
      {message && <div className="mb-3">{message}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="p-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        <input className="p-2 border rounded" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form, sku: e.target.value})} />
        <input className="p-2 border rounded" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
        <input type="number" className="p-2 border rounded" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
        <input type="number" className="p-2 border rounded" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} />
        <input type="date" className="p-2 border rounded" value={form.expiryDate} onChange={e=>setForm({...form, expiryDate: e.target.value})} />
      </div>
      <div className="mt-4">
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
      </div>
    </form>
  )
}
