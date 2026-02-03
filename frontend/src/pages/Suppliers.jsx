import React, { useEffect, useState } from 'react'
import supplierApi from '../api/supplierApi'
import SupplierList from '../components/suppliers/SupplierList'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const res = await supplierApi.list()
        setSuppliers(res.data || [])
      } catch (err) {
        setSuppliers([])
      }
    }
    fetch()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      <SupplierList suppliers={suppliers} />
    </div>
  )
}
