import React, { useEffect, useState } from 'react'
import { ShoppingCart, PackagePlus, History } from 'lucide-react'
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
      }catch(e){ 
        // Mock data
        setProducts([])
        setSales([
           { id: 101, total: 120, date: '2025-01-01', items: 3 },
           { id: 102, total: 45, date: '2025-01-02', items: 1 }
        ]) 
      }
    }
    load()
  }, [])

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Portal</h1>
        <p className="text-gray-500 mt-1">Manage daily operations and point of sale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Main Actions & Stock */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-primary-600 text-white rounded-2xl shadow-lg hover:bg-primary-700 transition-all hover:-translate-y-1">
                 <ShoppingCart size={32} className="mb-3" />
                 <span className="font-bold text-lg">New Sale</span>
                 <span className="text-primary-200 text-sm">Process checkout</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 text-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-1">
                 <PackagePlus size={32} className="mb-3 text-primary-600" />
                 <span className="font-bold text-lg">Receive Stock</span>
                 <span className="text-gray-500 text-sm">Scan incoming items</span>
              </button>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 inline-flex items-center gap-2">
                 <History size={18} /> Recent Transactions
              </h3>
              <div className="space-y-4">
                 {(!Array.isArray(sales) || sales.length === 0) ? <p className="text-gray-400">No recent sales.</p> : sales.slice(0, 5).map((sale, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                             ${Math.floor(sale.total / 10)}
                          </div>
                          <div>
                             <p className="font-medium text-gray-900">Sale #{sale.id}</p>
                             <p className="text-xs text-gray-500">{new Date(sale.date || Date.now()).toLocaleDateString()}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="font-bold text-gray-900">${sale.total}</p>
                          <p className="text-xs text-gray-500">{sale.items} items</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Col: Quick Stock Mgmt */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
           <h3 className="font-bold text-gray-900 mb-6">Stock Quick Adjust</h3>
           <StockManagement />
        </div>
      </div>
    </div>
  )
}
