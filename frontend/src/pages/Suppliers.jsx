import React, { useEffect, useState } from 'react'
import supplierApi from '../api/supplierApi'
import SupplierList from '../components/suppliers/SupplierList'

import useAuth from '../hooks/useAuth'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([])
  const { user } = useAuth()
  const isManager = user?.role === 'manager'

  useEffect(() => {
    async function fetch() {
      try {
        const res = await supplierApi.list()
        setSuppliers(Array.isArray(res.data) ? res.data : [])
      } catch (err) {
        setSuppliers([
           { _id: '1', name: 'Acme Corp', contact: 'john@acme.com' },
           { _id: '2', name: 'Global Supplies', contact: 'sarah@global.com' }
        ])
      }
    }
    fetch()
  }, [])

  const handleAdd = () => {
     const name = prompt("Enter Supplier Name:")
     if(name) setSuppliers([...suppliers, { _id: Date.now(), name, contact: 'New' }])
  }

  return (
    <div className="p-6 animate-in fade-in">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Suppliers</h1>
         {isManager && (
            <button 
               onClick={handleAdd}
               className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
               + Add Supplier
            </button>
         )}
      </div>
      <SupplierList suppliers={suppliers} isManager={isManager} />
    </div>
  )
}
