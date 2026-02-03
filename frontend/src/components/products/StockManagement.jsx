import React, { useEffect, useState } from 'react'
import productApi from '../../api/productApi'
import orderApi from '../../api/orderApi'

export default function StockManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [adjust, setAdjust] = useState({})
  const [setValues, setSetValues] = useState({})
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

  const applyAdjust = async (productId) => {
    const delta = parseInt(adjust[productId], 10)
    if (Number.isNaN(delta) || delta === 0) return
    await changeQty(productId, delta)
    setAdjust(prev => ({ ...prev, [productId]: '' }))
  }

  const setQuantity = async (productId) => {
    const val = parseInt(setValues[productId], 10)
    if (Number.isNaN(val)) return
    setActionLoading(true)
    try{
      await productApi.update(productId, { quantity: val })
      setMessage('Quantity set')
      setTimeout(() => setMessage(''), 2000)
      await fetch()
    }catch(e){ console.error(e) }
    setActionLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Stock levels</h2>
        {message && <div className="text-sm text-green-600">{message}</div>}
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {products.map(p => (
            <div key={p._id||p.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">SKU: {p.sku || '-'} • {p.category || ''}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold">{p.quantity ?? p.stock ?? 0}</div>

                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => changeQty(p.id, 1)} disabled={actionLoading}>+1</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => changeQty(p.id, -1)} disabled={actionLoading}>-1</button>
                </div>

                <div className="flex items-center gap-2">
                  <input type="number" className="w-20 p-1 border rounded" placeholder="Adjust" value={adjust[p.id] || ''} onChange={e => setAdjust(prev => ({ ...prev, [p.id]: e.target.value }))} />
                  <button className="px-2 py-1 bg-indigo-600 text-white rounded" onClick={() => applyAdjust(p.id)} disabled={actionLoading}>Apply</button>
                </div>

                <div className="flex items-center gap-2">
                  <input type="number" className="w-20 p-1 border rounded" placeholder="Set" value={setValues[p.id] || ''} onChange={e => setSetValues(prev => ({ ...prev, [p.id]: e.target.value }))} />
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => setQuantity(p.id)} disabled={actionLoading}>Set</button>
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
