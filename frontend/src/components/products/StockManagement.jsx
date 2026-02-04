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
            <div key={p._id||p.id} className="card-glass border-white/5 p-4 hover:shadow-neon transition-all bg-slate-900/40">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-slate-200">{p.name}</div>
                  <div className="text-xs text-slate-400 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/10 inline-block mt-1">
                    SKU: {p.sku || '-'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Current Stock</div>
                  <div className="text-2xl font-bold text-white leading-none">{p.quantity ?? p.stock ?? 0}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => changeQty(p.id, 1)} disabled={actionLoading}
                    className="flex-1 py-1.5 bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50 text-sm"
                   >
                     +1 Add
                   </button>
                   <button 
                    onClick={() => changeQty(p.id, -1)} disabled={actionLoading}
                    className="flex-1 py-1.5 bg-rose-500/20 border border-rose-500/20 text-rose-400 font-medium rounded-lg hover:bg-rose-500/30 transition-colors disabled:opacity-50 text-sm"
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
                        className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-slate-500"
                        value={adjust[p.id] || ''} 
                        onChange={e => setAdjust(prev => ({ ...prev, [p.id]: e.target.value }))}
                      />
                   </div>
                   <button 
                    onClick={() => applyAdjust(p.id)} disabled={actionLoading}
                    className="px-3 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors disabled:opacity-50 text-sm font-medium shadow-lg shadow-sky-500/20"
                   >
                     Adjust
                   </button>
                   <button 
                    onClick={() => setQuantity(p.id)} disabled={actionLoading}
                        className="px-3 py-1.5 bg-slate-700 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-600 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium"
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
