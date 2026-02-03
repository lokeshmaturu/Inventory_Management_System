import React from 'react'

export default function ExportReports(){
  const download = () => { /* placeholder */ }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export Reports</h1>
      <div className="bg-white p-4 rounded shadow">
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={download}>Download PDF / Excel</button>
      </div>
    </div>
  )
}
