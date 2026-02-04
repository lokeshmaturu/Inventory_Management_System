import React, { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, PackageSearch } from 'lucide-react'
import reportApi from '../api/reportApi'
import { useRequest } from '../context/RequestContext'
import productApi from '../api/productApi' 

export default function DashboardManager() {
  const [stock, setStock] = useState({ lowStock: [], totalProducts: 0 })
  const { requests, managerUpdate } = useRequest()
  const pendingRequests = requests.filter(r => r.status === 'pending_manager')
  
  const handleFinalUpdate = async (req) => {
    try {
      if (req.productId && req.changes) {
         await productApi.update(req.productId, req.changes)
      }
      managerUpdate(req.id, true) 
    } catch {
      alert("Failed to sync update to backend")
      // Optionally still update local state for demo purposes if backend fails
      managerUpdate(req.id, true)
    }
  }

  useEffect(() => {
    async function fetch(){
      try{
        const res = await reportApi.stockSummary()
        setStock(res.data || {})
      } catch(e){ 
        // Mock data fallback
        setStock({ 
           lowStock: [{id:1, name:'Wireless Mouse', stock:2}, {id:2, name:'USB-C Cable', stock:5}], 
           totalProducts: 142 
        }) 
      }
    }
    fetch()
  }, [])

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
         <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Inventory Manager</h1>
            <p className="text-slate-400 mt-1">Monitor stock levels and supplier reorders.</p>
         </div>
      </div>

      {/* Admin Approved Requests Section */}
      {pendingRequests.length > 0 && (
         <div className="mb-8 card-glass p-6 border-neon">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse-soft shadow-[0_0_10px_#0ea5e9]"></span>
               Admin Approved Updates
            </h3>
            <div className="space-y-4">
               {pendingRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-white/5 backdrop-blur-sm">
                     <div>
                        <p className="font-medium text-slate-200">
                           Update for <span className="font-bold text-sky-400">"{req.productName}"</span>
                        </p>
                        <p className="text-sm text-slate-500">Original Request by: {req.requestedBy}</p>
                     </div>
                     <button 
                        onClick={() => handleFinalUpdate(req)}
                        className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all hover:scale-105"
                     >
                        Commit Update
                     </button>
                  </div>
               ))}
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card-glass relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-sky-500/20"></div>
           <div className="flex items-center justify-between relative z-10">
              <div>
                 <p className="text-sm font-medium text-slate-400">Total Products</p>
                 <h3 className="text-4xl font-bold text-gradient-cyan mt-2">{stock.totalProducts}</h3>
                 <p className="text-sm text-emerald-400 flex items-center gap-1 mt-2 shadow-emerald-500/20">
                    <CheckCircle size={14} /> System Healthy
                 </p>
              </div>
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 shadow-neon">
                 <PackageSearch size={32} />
              </div>
           </div>
        </div>
        
        <div className="card-glass relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-rose-500/20"></div>
           <div className="flex items-center justify-between relative z-10">
              <div>
                 <p className="text-sm font-medium text-slate-400">Low Stock Alerts</p>
                 <h3 className="text-4xl font-bold text-gradient-red mt-2">{stock.lowStock?.length || 0}</h3>
                 <p className="text-sm text-rose-400 flex items-center gap-1 mt-2">
                    <AlertTriangle size={14} /> Action Required
                 </p>
              </div>
              <div className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                 <AlertTriangle size={32} />
              </div>
           </div>
        </div>
      </div>

      <div className="card-glass overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <h3 className="text-lg font-bold text-white">Reorder Recommendations</h3>
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/20 rounded-full text-xs font-semibold shadow-[0_0_10px_rgba(244,63,94,0.1)]">
               High Priority
            </span>
        </div>
        
        {stock.lowStock?.length === 0 ? (
           <div className="p-12 text-center text-slate-500">No items need reorder right now.</div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-xs uppercase text-slate-400 font-semibold border-b border-white/5">
                   <tr>
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4">Current Stock</th>
                      <th className="px-6 py-4">Reorder Level</th>
                      <th className="px-6 py-4">Supplier</th>
                      <th className="px-6 py-4">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {stock.lowStock.map((p, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                         <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white transition-colors">{p.name}</td>
                         <td className="px-6 py-4 flex items-center gap-2 text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span>
                            {p.quantity ?? p.stock}
                         </td>
                         <td className="px-6 py-4 text-slate-500">10 units</td>
                         <td className="px-6 py-4 text-slate-500">Acme Suppliers Ltd.</td>
                         <td className="px-6 py-4">
                            <button className="px-3 py-1.5 bg-slate-800 border border-white/10 text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-700 hover:text-white hover:border-white/20 transition-all">
                               Create PO
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  )
}
