import React, { useState, useEffect } from 'react'
import supplierApi from '../../api/supplierApi'

export default function SupplierForm({ supplier }) {
  const [form, setForm] = useState({ name: '', contact: '', email: '' })
  const [message, setMessage] = useState(null)

  useEffect(()=>{ if (supplier) setForm(supplier) }, [supplier])

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (supplier && supplier._id) await supplierApi.update(supplier._id, form)
      else await supplierApi.create(form)
      setMessage('Saved')
    } catch (err) { setMessage('Error') }
  }

  return (
    <form onSubmit={submit}>
      {message && <div className="mb-3">{message}</div>}
      <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
      <input className="w-full p-2 mb-2 border rounded" placeholder="Contact" value={form.contact} onChange={e=>setForm({...form, contact: e.target.value})} />
      <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
    </form>
  )
}
