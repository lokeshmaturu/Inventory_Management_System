import React, { useState } from 'react'
import authApi from '../api/authApi'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' })
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await authApi.register(form)
      setMessage('User created (admin-only page)')
    } catch (err) {
      setMessage('Error creating user')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register (Admin only)</h1>
      {message && <div className="mb-3">{message}</div>}
      <form onSubmit={submit}>
        <input className="w-full p-2 mb-2 border rounded" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className="w-full p-2 mb-2 border rounded" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <select className="w-full p-2 mb-4 border rounded" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>
        <button className="bg-green-600 text-white py-2 px-4 rounded">Create User</button>
      </form>
    </div>
  )
}
