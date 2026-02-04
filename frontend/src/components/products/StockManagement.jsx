import React, { useEffect, useState } from 'react'
import productApi from '../../api/productApi'
import orderApi from '../../api/orderApi'

export default function StockManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [adjust, setAdjust] = useState({})
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await productApi.list()
      setProducts(res.data || [])
    } catch (err) {
      setProducts([])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const changeQty = async (productId, delta) => {
    setActionLoading(true)
    try {
      if (delta > 0) await orderApi.createPurchase({ productId, qty: delta, date: new Date().toISOString(), user: 'Staff' })
      else await orderApi.createSale({ productId, qty: Math.abs(delta), date: new Date().toISOString(), user: 'Staff' })
      setMessage('Stock updated')
      setTimeout(() => setMessage(''), 2000)
      await fetch()
    } catch (e) { console.error(e) }
    setActionLoading(false)
  }

  /* Simplified Logic: Use 'adjust' state for both "Adjust" (Add/Sub) and "Set" (Override) actions */

  const applyAdjust = async (productId) => {
    const delta = parseInt(adjust[productId], 10)
    if (Number.isNaN(delta) || delta === 0) return
    await changeQty(productId, delta)
    setAdjust(prev => ({ ...prev, [productId]: '' }))
  }

  const setQuantity = async (productId) => {
    // We will use the SAME input field state (adjust) for setting value too
    const val = parseInt(adjust[productId], 10)
    if (Number.isNaN(val)) return
    setActionLoading(true)
    try{
      await productApi.update(productId, { quantity: val })
      setMessage('Quantity set')
      setTimeout(() => setMessage(''), 2000)
      await fetch()
      setAdjust(prev => ({ ...prev, [productId]: '' }))
    }catch(e){ console.error(e) }
    setActionLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider hidden">Stock levels</h2>
        {message && <div className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded animate-pulse">{message}</div>}
      </div>

       {loading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {products.map(p => (
            <div key={p._id||p.id} className="border border-gray-100 p-4 rounded-xl hover:shadow-sm transition-shadow bg-gray-50/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500 font-medium bg-white px-2 py-0.5 rounded border border-gray-200 inline-block mt-1">
                    SKU: {p.sku || '-'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Current Stock</div>
                  <div className="text-2xl font-bold text-gray-900 leading-none">{p.quantity ?? p.stock ?? 0}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => changeQty(p.id, 1)} disabled={actionLoading}
                    className="flex-1 py-1.5 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 text-sm"
                   >
                     +1 Add
                   </button>
                   <button 
                    onClick={() => changeQty(p.id, -1)} disabled={actionLoading}
                    className="flex-1 py-1.5 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 text-sm"
                   >
                     -1 Remove
                   </button>
                </div>

                {/* Adjust Input */}
                <div className="flex items-center gap-2">
                   <div className="relative flex-1">
                      <input 
                        type="number" 
                        placeholder="Qty" 
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
                        value={adjust[p.id] || ''} 
                        onChange={e => setAdjust(prev => ({ ...prev, [p.id]: e.target.value }))}
                      />
                   </div>
                   <button 
                    onClick={() => applyAdjust(p.id)} disabled={actionLoading}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm font-medium"
                   >
                     Adjust
                   </button>
                   <button 
                    onClick={() => setQuantity(p.id)} disabled={actionLoading}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
                   >
                     Set
                   </button>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && <div className="text-sm text-gray-500">No products</div>}
        </div>
      )}
    </div>
  )
}
