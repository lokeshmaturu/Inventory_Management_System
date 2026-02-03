import React, { useEffect, useState } from 'react'
import reportApi from '../../api/reportApi'

export default function Notifications(){
  const [lowStock, setLowStock] = useState([])

  useEffect(() => {
    async function fetch(){
      try{
        const res = await reportApi.stockSummary()
        setLowStock(res.data.lowStock || [])
      }catch(e){ setLowStock([]) }
    }
    fetch()
  }, [])

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Low stock alerts</h2>
      {lowStock.length === 0 ? (
        <div className="text-sm text-gray-500">No low stock items</div>
      ) : (
        <ul className="list-disc ml-5">
          {lowStock.map(p => <li key={p.id}>{p.name} — {p.quantity ?? p.stock}</li>)}
        </ul>
      )}
    </div>
  )
}
