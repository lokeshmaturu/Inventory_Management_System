import React, { useEffect, useState } from 'react'
import DashboardCards from '../components/dashboard/DashboardCards'
import StockChart from '../components/dashboard/StockChart'
import reportApi from '../api/reportApi'
import productApi from '../api/productApi'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function load(){
      try {
        const res = await reportApi.salesSummary()
        setStats(res.data || {})
        const p = await productApi.list()
        setProducts(p.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <DashboardCards stats={{ todaySales: stats.todaySales || 0, todayPurchase: stats.todayPurchase || 0, todayReturns: 0, totalProducts: stats.totalProducts || 0 }} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <StockChart products={products} />
        </div>
        <div className="bg-white p-4 rounded shadow">Sales & purchases summary (placeholder)</div>
      </div>
    </div>
  )
}
