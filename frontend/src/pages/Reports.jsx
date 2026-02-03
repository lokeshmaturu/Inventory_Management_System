import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import productApi from '../api/productApi'
import useReports from '../hooks/useReports'
import { FileText, Save, BarChart2, Download, Filter, Package, ShoppingBag } from 'lucide-react'

export default function Reports() {
  const { user } = useAuth()
  const { reports, addReport } = useReports()
  
  // -- Shared Analytics State --
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)) // YYYY-MM
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // -- Manager Submission State --
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // -- Admin View State --
  const [adminDateFilter, setAdminDateFilter] = useState('')

  // Fetch Data for Analytics
  useEffect(() => {
    async function fetchData() {
       setLoading(true)
       try {
         const pRes = await productApi.list()
         // Mocking creation dates for demo purposes since basic mock might not have them
         // In a real app, products would have 'createdAt'
         const productsWithDates = (pRes.data || []).map((p, i) => ({
            ...p,
            createdAt: p.createdAt || new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString() // Random dates last ~4 months
         }))
         setProducts(productsWithDates)
       } catch (e) {
         console.error("Failed to load analytics data")
       } finally {
         setLoading(false)
       }
    }
    fetchData()
  }, [])

  // -- Analytics Logic --
  const filteredProducts = products.filter(p => p.createdAt.startsWith(selectedMonth))
  // Mocking Sales Data based on month (since no sales API was explicitly requested to be fully built out yet)
  const mockSalesData = {
     '2024-01': { revenue: 12500, units: 340 },
     '2024-02': { revenue: 15200, units: 410 },
     '2024-03': { revenue: 18900, units: 520 },
     '2025-01': { revenue: 21000, units: 580 },
     '2025-02': { revenue: 24500, units: 650 },
  }
  // Default random data if month Key missing
  const currentSales = mockSalesData[selectedMonth] || { 
     revenue: Math.floor(Math.random() * 10000) + 5000, 
     units: Math.floor(Math.random() * 500) + 100 
  }

  // -- Manager Submit Handler --
  const handleManagerSubmit = (e) => {
    e.preventDefault()
    addReport({
      id: Date.now(),
      date: new Date().toISOString(),
      author: user.name,
      content: note
    })
    setNote('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  // -- Admin Export Handler --
  const handleAdminExport = () => {
     const dataToExport = adminDateFilter 
        ? reports.filter(r => r.date.startsWith(adminDateFilter))
        : reports
     
     const dataStr = JSON.stringify(dataToExport, null, 2)
     const blob = new Blob([dataStr], { type: "application/json" })
     const url = URL.createObjectURL(blob)
     const link = document.createElement('a')
     link.href = url
     link.download = `reports_${adminDateFilter || 'all'}.json`
     document.body.appendChild(link)
     link.click()
     document.body.removeChild(link)
  }

  // Filter reports for Admin View
  const displayedReports = adminDateFilter 
      ? reports.filter(r => r.date.startsWith(adminDateFilter)) 
      : reports

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
           <p className="text-gray-500 mt-1">Unified insights for {user.role === 'admin' ? 'Administration' : 'Management'}.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
           <Filter size={16} className="text-gray-400 ml-2" />
           <span className="text-sm font-medium text-gray-600">Month:</span>
           <input 
              type="month" 
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="outline-none text-sm font-bold text-gray-900 bg-transparent cursor-pointer"
           />
        </div>
      </div>

      {/* --- SHARED ANALYTICS SECTION (Admin & Manager) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Monthly Sales Card */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                     <ShoppingBag size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-700">Monthly Sales</h3>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-3">
                  ${currentSales.revenue.toLocaleString()}
               </div>
               <p className="text-sm text-gray-500 mt-1">{currentSales.units} units sold</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
               Data for {selectedMonth}
            </div>
         </div>

         {/* Products Added Card */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                     <Package size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-700">Products Added</h3>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-3">
                  {filteredProducts.length}
               </div>
               <p className="text-sm text-gray-500 mt-1">New items in inventory</p>
            </div>
             <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
               Filtered by creation date
            </div>
         </div>

         {/* Stock Summary Card (Static for now) */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                     <BarChart2 size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-700">Total Asset Value</h3>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-3">
                  ${(products.reduce((acc, p) => acc + (p.price * p.stock), 0)).toLocaleString()}
               </div>
               <p className="text-sm text-gray-500 mt-1">{products.length} active SKUs</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-green-600 font-medium">
               Real-time Live Data
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* --- ANALYTICS DETAILED LIST: PRODUCTS ADDED --- */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
               <span>Products Added in {selectedMonth}</span>
               <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">{filteredProducts.length} items</span>
            </h3>
            <div className="max-h-80 overflow-y-auto pr-2 space-y-3">
               {loading ? <p>Loading...</p> : filteredProducts.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">No products added in this period.</p>
               ) : (
                  filteredProducts.map(p => (
                     <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                              {p.name.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                              <p className="text-xs text-gray-500">Stock: {p.stock}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold text-gray-900">${p.price}</p>
                           <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</p>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* --- ROLE SPECIFIC: DAILY REPORTS --- */}
         
         {/* MANAGER: SUBMIT REPORT */}
         {user.role === 'manager' && (
            <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-primary-600" />
                  Submit Daily Report
               </h3>
               <form onSubmit={handleManagerSubmit}>
                  <textarea
                     className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none h-40 resize-none text-sm bg-gray-50 focus:bg-white transition-colors"
                     placeholder="Log operational notes, stock discrepancies, or team updates..."
                     value={note}
                     onChange={e => setNote(e.target.value)}
                     required
                  />
                  <div className="mt-4 flex items-center justify-between">
                     <p className="text-xs text-gray-400">Recorded as: {user.name}</p>
                     <button className="flex items-center gap-2 px-5 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                        <Save size={16} /> Submit Log
                     </button>
                  </div>
                  {submitted && <p className="mt-3 text-center text-xs text-green-600 font-bold bg-green-50 py-2 rounded-lg">✅ Report submitted successfully!</p>}
               </form>

               <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Your Recent Logs</h4>
                  <div className="space-y-3">
                     {reports.filter(r => r.author === user.name).slice(0, 2).map(r => (
                        <div key={r.id} className="text-sm text-gray-600">
                           <span className="font-semibold text-gray-900">{new Date(r.date).toLocaleDateString()}:</span> {r.content.slice(0, 50)}...
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* ADMIN: VIEW REPORTS */}
         {user.role === 'admin' && (
            <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                     <FileText size={18} className="text-purple-600" />
                     Manager Daily Logs
                  </h3>
                  <div className="flex gap-2">
                     <input 
                        type="date"
                        value={adminDateFilter}
                        onChange={e => setAdminDateFilter(e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50"
                     />
                     <button 
                        onClick={handleAdminExport}
                        className="p-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                        title="Export JSON"
                     >
                        <Download size={14} />
                     </button>
                  </div>
               </div>

               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {displayedReports.length === 0 ? (
                     <div className="text-center py-10 text-gray-400 text-sm">No daily logs found for this period.</div>
                  ) : (
                     displayedReports.map(r => (
                        <div key={r.id} className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-sm text-gray-900">{r.author}</span>
                              <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                 {new Date(r.date).toLocaleDateString()}
                              </span>
                           </div>
                           <p className="text-sm text-gray-600 leading-relaxed">{r.content}</p>
                        </div>
                     ))
                  )}
               </div>
            </div>
         )}
      </div>
    </div>
  )
}
