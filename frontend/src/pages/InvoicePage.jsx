import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import orderApi from '../api/orderApi'

export default function InvoicePage(){
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)

  useEffect(()=>{
    async function fetch(){
      try { const res = await orderApi.getInvoice(id); setInvoice(res.data) } catch (err) {}
    }
    fetch()
  }, [id])

  if (!invoice) return <div className="p-6">Invoice not found</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice #{invoice.id || id}</h1>
      <div className="bg-white p-4 rounded shadow">Printable invoice content (placeholder)</div>
    </div>
  )
}
