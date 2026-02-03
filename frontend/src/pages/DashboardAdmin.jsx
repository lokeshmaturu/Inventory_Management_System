import React, { useEffect, useState } from 'react'
import { Download, Filter, MoreHorizontal } from 'lucide-react'
import DashboardCards from '../components/dashboard/DashboardCards'
import StockChart from '../components/dashboard/StockChart'
import reportApi from '../api/reportApi'
import productApi from '../api/productApi'
import useData from '../hooks/useData' // Fallback data
import { useRequest } from '../context/RequestContext'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const { seedDemoData } = useData() // Ensuring data exists for demo
  const { requests, adminOverview } = useRequest()
  const pendingRequests = requests.filter(r => r.status === 'pending_admin')

  useEffect(() => {
    async function load(){
      try {
        const res = await reportApi.salesSummary()
        setStats(res.data || {})
        const p = await productApi.list()
        setProducts(p.data || [])
      } catch (err) {
        // Fallback for visual demo if backend fails
        console.error("Backend error, using mock data", err)
        setStats({ todaySales: 12050, todayPurchase: 5400, totalProducts: 142 })
        setProducts([
           { name: 'Laptop', stock: 45 },
           { name: 'Mouse', stock: 120 },
           { name: 'Keyboard', stock: 80 },
           { name: 'Monitor', stock: 30 },
           { name: 'Headset', stock: 65 }
        ])
      }
    }
    load()
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Staff Requests Section */}
      {pendingRequests.length > 0 && (
         <div className="bg-white rounded-2xl shadow-sm border border-orange-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
               Pending Staff Updates
            </h3>
            <div className="space-y-4">
               {pendingRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
                     <div>
                        <p className="font-medium text-gray-900">
                           {req.requestedBy} requested update for <span className="font-bold">"{req.productName}"</span>
                        </p>
                        <ul className="text-sm text-gray-600 mt-1 list-disc ml-5">
                           {Object.keys(req.changes).map(k => {
                              if (req.changes[k] !== req.currentData[k]) {
                                 return <li key={k}>{k}: {req.currentData[k]} → <b>{req.changes[k]}</b></li>
                              }
                              return null
                           })}
                        </ul>
                     </div>
                     <div className="flex gap-2">
                        <button 
                           onClick={() => adminOverview(req.id, true)}
                           className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
                        >
                           Approve
                        </button>
                        <button 
                           onClick={() => adminOverview(req.id, false)}
                           className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                        >
                           Reject
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

      {/* Stats Cards */}
      <DashboardCards stats={{ todaySales: stats.todaySales || 0, todayPurchase: stats.todayPurchase || 0, todayReturns: 0, totalProducts: stats.totalProducts || 0 }} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Inventory Status</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                 <MoreHorizontal size={20} />
              </button>
           </div>
           <StockChart products={products} />
        </div>

        {/* Right Column - Recent Activity Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
           <div className="space-y-6 flex-1">
             {[
               { action: 'New order received', time: '2 min ago', color: 'bg-green-100 text-green-600' },
               { action: 'Stock update: Laptop', time: '15 min ago', color: 'bg-blue-100 text-blue-600' },
               { action: 'New supplier added', time: '1 hr ago', color: 'bg-purple-100 text-purple-600' },
               { action: 'Issue reported', time: '3 hrs ago', color: 'bg-red-100 text-red-600' },
               { action: 'Deployment success', time: '5 hrs ago', color: 'bg-teal-100 text-teal-600' },
             ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                   <div className={`w-2 h-2 mt-2 rounded-full ${item.color.split(' ')[1].replace('text', 'bg')}`}></div>
                   <div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                   </div>
                </div>
             ))}
           </div>
           <button className="mt-6 w-full py-2 text-sm text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors">
              View All History
           </button>
        </div>
      </div>
    </div>
  )
}
