import React, { useState } from 'react'

export default function ChangePassword(){
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = (e) => { e.preventDefault(); setMsg('Password changed (placeholder)') }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      {msg && <div className="mb-3">{msg}</div>}
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Old password" value={oldPass} onChange={e=>setOldPass(e.target.value)} />
        <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="New password" value={newPass} onChange={e=>setNewPass(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Change Password</button>
      </form>
    </div>
  )
}
