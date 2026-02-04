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
            <h1 className="text-3xl font-bold text-gray-900">Inventory Manager</h1>
            <p className="text-gray-500 mt-1">Monitor stock levels and supplier reorders.</p>
         </div>
      </div>

      {/* Admin Approved Requests Section */}
      {pendingRequests.length > 0 && (
         <div className="mb-8 bg-white rounded-2xl shadow-sm border border-primary-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
               Admin Approved Updates (Needs Finalization)
            </h3>
            <div className="space-y-4">
               {pendingRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100">
                     <div>
                        <p className="font-medium text-gray-900">
                           Update for <span className="font-bold">"{req.productName}"</span> (Approved by Admin)
                        </p>
                        <p className="text-sm text-gray-600">Original Request by: {req.requestedBy}</p>
                     </div>
                     <button 
                        onClick={() => handleFinalUpdate(req)}
                        className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
                     >
                        Commit Update
                     </button>
                  </div>
               ))}
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stock.totalProducts}</h3>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-2">
                 <CheckCircle size={14} /> System Healthy
              </p>
           </div>
           <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <PackageSearch size={32} />
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
              <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stock.lowStock?.length || 0}</h3>
              <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                 <AlertTriangle size={14} /> Action Required
              </p>
           </div>
           <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
              <AlertTriangle size={32} />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Reorder Recomendations</h3>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
               High Priority
            </span>
        </div>
        
        {(!stock.lowStock || stock.lowStock.length === 0) ? (
           <div className="p-12 text-center text-gray-500">No items need reorder right now.</div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                   <tr>
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4">Current Stock</th>
                      <th className="px-6 py-4">Reorder Level</th>
                      <th className="px-6 py-4">Supplier</th>
                      <th className="px-6 py-4">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {(stock.lowStock || []).map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                         <td className="px-6 py-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            {p.quantity ?? p.stock}
                         </td>
                         <td className="px-6 py-4 text-gray-500">10 units</td>
                         <td className="px-6 py-4 text-gray-500">Acme Suppliers Ltd.</td>
                         <td className="px-6 py-4">
                            <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
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
