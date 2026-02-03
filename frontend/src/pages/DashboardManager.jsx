import React, { useEffect, useState } from 'react'
import reportApi from '../api/reportApi'

export default function DashboardManager() {
  const [stock, setStock] = useState({ lowStock: [], totalProducts: 0 })

  useEffect(() => {
    async function fetch(){
      try{
        const res = await reportApi.stockSummary()
        setStock(res.data || {})
      }catch(e){ setStock({ lowStock:[], totalProducts:0 }) }
    }
    fetch()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="font-semibold">Stock status</div>
          <div className="text-sm text-gray-600">Total products: {stock.totalProducts}</div>
          <div className="mt-2">Low stock: {stock.lowStock?.length || 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">Sales trends (placeholder)</div>
      </div>
      <div className="mt-6 p-4 bg-white rounded shadow">
        <div className="font-semibold">Reorder alerts</div>
        {stock.lowStock?.length === 0 ? <div className="text-sm text-gray-500">No items need reorder</div> : (
          <ul className="list-disc ml-5 mt-2 text-sm">
            {stock.lowStock.map(p => <li key={p.id}>{p.name} — {p.quantity ?? p.stock}</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}
