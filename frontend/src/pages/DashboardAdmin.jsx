import React, { useEffect, useState } from 'react'
import { Download, Filter, MoreHorizontal, X, Calendar, Package } from 'lucide-react'
import DashboardCards from '../components/dashboard/DashboardCards'
import StockChart from '../components/dashboard/StockChart'
import reportApi from '../api/reportApi'
import productApi from '../api/productApi'
import useData from '../hooks/useData' // Fallback data
import { useRequest } from '../context/RequestContext'
import useReports from '../hooks/useReports'

export default function DashboardAdmin() {
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const { seedDemoData } = useData() 
  const { requests, adminOverview } = useRequest()
  const { reports } = useReports()
  const pendingRequests = requests.filter(r => r.status === 'pending_admin')

  // Filter State
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({ date: '', productId: '' })
  const [tempFilters, setTempFilters] = useState({ date: '', productId: '' })

  const handleApplyFilter = () => {
    setFilters(tempFilters)
    setShowFilter(false)
  }

  const handleResetFilter = () => {
    setTempFilters({ date: '', productId: '' })
    setFilters({ date: '', productId: '' })
    setShowFilter(false)
  }

  // Filtered Data
  const filteredProducts = filters.productId && Array.isArray(products)
      ? products.filter(p => p._id === filters.productId || p.id === filters.productId) 
      : (Array.isArray(products) ? products : [])

  const activeFilterCount = (filters.date ? 1 : 0) + (filters.productId ? 1 : 0)

  useEffect(() => {
    async function load(){
      try {
        const res = await reportApi.salesSummary()
        setStats(res.data || {})
        const p = await productApi.list()
        setProducts(Array.isArray(p.data) ? p.data : [])
      } catch (err) {
        console.error("Backend error, using mock data", err)
        setStats({ todaySales: 12050, todayPurchase: 5400, totalProducts: 142 })
        setProducts([
           { _id: '1', name: 'Laptop', stock: 45 },
           { _id: '2', name: 'Mouse', stock: 120 },
           { _id: '3', name: 'Keyboard', stock: 80 },
           { _id: '4', name: 'Monitor', stock: 30 },
           { _id: '5', name: 'Headset', stock: 65 }
        ])
      }
    }
    load()
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-in zoom-in-50 duration-200">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter size={18} /> Filter Dashboard
                 </h3>
                 <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-6 space-y-4">
                 {/* Product Filter */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Focus</label>
                    <div className="relative">
                       <Package size={16} className="absolute left-3 top-3 text-gray-400" />
                       <select 
                          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                          value={tempFilters.productId}
                          onChange={e => setTempFilters({...tempFilters, productId: e.target.value})}
                       >
                          <option value="">All Products</option>
                          {Array.isArray(products) && products.map(p => (
                             <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>
                          ))}
                       </select>
                    </div>
                 </div>
                 {/* Date Filter */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="relative">
                       <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                       <input 
                          type="date" 
                          className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 outline-none"
                          value={tempFilters.date}
                          onChange={e => setTempFilters({...tempFilters, date: e.target.value})}
                       />
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex gap-3">
                 <button onClick={handleResetFilter} className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                    Reset
                 </button>
                 <button onClick={handleApplyFilter} className="flex-1 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg">
                    Apply Filters
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
             onClick={() => {
                setTempFilters(filters)
                setShowFilter(true)
             }}
             className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors shadow-sm ${activeFilterCount > 0 ? 'bg-gray-100 border-gray-400 text-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter size={16} /> 
            {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'Filter'}
          </button>
          <button 
             onClick={() => {
                // Filter Manager Reports by Date if selected
                const relevantReports = filters.date 
                     ? reports.filter(r => r.date.startsWith(filters.date)) 
                     : reports

                const reportData = {
                  meta: {
                     generatedAt: new Date().toISOString(),
                     generatedBy: 'Admin',
                     filters: filters
                  },
                  summary: stats,
                  inventorySnapshot: filteredProducts,
                  // INCLUDE MANAGER REPORTS HERE
                  managerDailyLogs: relevantReports
                }
                const dataStr = JSON.stringify(reportData, null, 2)
                const blob = new Blob([dataStr], { type: "application/json" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `Full_Report_${filters.date || 'All'}_${Date.now()}.json`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
             }}
             className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
          >
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
              <h3 className="text-lg font-bold text-gray-900">
                 {filters.productId ? 'Product Stock Analysis' : 'Inventory Status'}
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                 <MoreHorizontal size={20} />
              </button>
           </div>
           {/* Pass Transformed Data if Filtered */}
           <StockChart products={filteredProducts} />
        </div>

        {/* Right Column - Recent Activity Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
           <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
              Recent Activity
              {filters.date && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Filtered: {filters.date}</span>}
           </h3>
           <div className="space-y-6 flex-1">
             {[
               { action: 'New order received', time: '2 min ago', color: 'bg-green-500' },
               { action: 'Stock update: Laptop', time: '15 min ago', color: 'bg-blue-500' },
               { action: 'New supplier added', time: '1 hr ago', color: 'bg-purple-500' },
               { action: 'Issue reported', time: '3 hrs ago', color: 'bg-red-500' },
               { action: 'Deployment success', time: '5 hrs ago', color: 'bg-teal-500' },
             ].map((item, i, arr) => (
                <div key={i} className="relative pl-6 pb-6 last:pb-0">
                   {/* Vertical Line */}
                   {i !== arr.length - 1 && (
                      <div className="absolute left-[5px] top-2 h-full w-[2px] bg-gray-100"></div>
                   )}
                   {/* Dot */}
                   <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${item.color} ring-4 ring-white`}></div>
                   
                   <div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
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
