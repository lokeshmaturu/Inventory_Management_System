import React, { useState } from 'react'

export default function ImportProducts(){
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState(null)
  const submit = (e) => { e.preventDefault(); setMsg('File uploaded (placeholder)') }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Import Products</h1>
      {msg && <div className="mb-3">{msg}</div>}
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md">
        <input type="file" onChange={e=>setFile(e.target.files[0])} className="mb-3" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Upload</button>
      </form>
    </div>
  )
}
