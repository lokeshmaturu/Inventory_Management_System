import React, { useEffect, useState } from 'react'
import productApi from '../../api/productApi'
import supplierApi from '../../api/supplierApi'

function daysUntil(dateStr){
  if(!dateStr) return null
  const d = new Date(dateStr)
  const diff = Math.ceil((d - new Date())/(1000*60*60*24))
  return diff
}

export default function ExpiryTracking() {
  const [expiring, setExpiring] = useState([])
  const [expired, setExpired] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try{
      const [pRes, sRes] = await Promise.all([productApi.list(), supplierApi.list()])
      const all = pRes.data || []
      setSuppliers(sRes.data || [])
      const withDates = all.filter(p => p.expiryDate)
      const sorted = withDates.sort((a,b) => new Date(a.expiryDate) - new Date(b.expiryDate))
      const exp = sorted.filter(p => daysUntil(p.expiryDate) < 0)
      const soon = sorted.filter(p => {
        const d = daysUntil(p.expiryDate)
        return d >= 0 && d <= 7
      })
      setExpired(exp)
      setExpiring(soon)
    }catch(e){
      setExpired([])
      setExpiring([])
      setSuppliers([])
    }finally{ setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const supplierName = (id) => suppliers.find(s => String(s.id) === String(id))?.name || ''

  const removeProduct = async (id) => {
    if(!confirm('Remove this product from inventory? This action cannot be undone.')) return
    setActionLoading(true)
    try{
      await productApi.remove(id)
      await fetchData()
    }catch(e){ console.error(e) }
    setActionLoading(false)
  }

  const removeAllExpired = async () => {
    if(expired.length === 0) return
    if(!confirm(`Remove all ${expired.length} expired products?`)) return
    setActionLoading(true)
    try{
      await Promise.all(expired.map(p => productApi.remove(p.id)))
      await fetchData()
    }catch(e){ console.error(e) }
    setActionLoading(false)
  }

  const exportExpiring = () => {
    const payload = JSON.stringify(expiring, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expiring-${new Date().toISOString().slice(0,10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Near-expiry products</h2>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm" onClick={exportExpiring} disabled={loading || expiring.length===0}>Export Expiring</button>
          <button className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm" onClick={removeAllExpired} disabled={actionLoading || expired.length===0}>Remove All Expired</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Expiring soon</h3>
            {expiring.length === 0 ? <div className="text-sm text-gray-500">No items expiring soon</div> : (
              <ul className="space-y-2 mt-2">
                {expiring.map(p => {
                  const days = daysUntil(p.expiryDate)
                  return (
                    <li key={p.id} className="flex items-center gap-3 border p-2 rounded">
                      <img src={p.imageUrl || `https://picsum.photos/seed/${p.id}/80/80`} alt={p.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-600">{supplierName(p.supplierId)} • Expires in {days} day{days !== 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(p.expiryDate).toLocaleDateString()}</div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-semibold">Expired products</h3>
            {expired.length === 0 ? <div className="text-sm text-gray-500">No expired items</div> : (
              <ul className="space-y-2 mt-2">
                {expired.map(p => {
                  const days = Math.abs(daysUntil(p.expiryDate))
                  return (
                    <li key={p.id} className="flex items-center gap-3 border p-2 rounded">
                      <img src={p.imageUrl || `https://picsum.photos/seed/${p.id}/80/80`} alt={p.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-red-600">Expired {days} day{days !== 1 ? 's' : ''} ago — {new Date(p.expiryDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{supplierName(p.supplierId)}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-2 py-1 bg-red-500 text-white rounded text-sm" onClick={() => removeProduct(p.id)} disabled={actionLoading}>Remove</button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
