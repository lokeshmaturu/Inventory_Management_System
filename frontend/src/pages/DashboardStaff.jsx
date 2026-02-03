import React, { useEffect, useState } from 'react'
import productApi from '../api/productApi'
import orderApi from '../api/orderApi'
import StockManagement from '../components/products/StockManagement'

export default function DashboardStaff() {
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    async function load(){
      try{
        const p = await productApi.list()
        setProducts(p.data || [])
        const s = await orderApi.listSales()
        setSales(s.data || [])
      }catch(e){ setProducts([]); setSales([]) }
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="font-semibold">Sales quick actions</div>
          <div className="text-sm text-gray-600">Recent sales: {sales.length}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <StockManagement />
        </div>
      </div>
    </div>
  )
}
