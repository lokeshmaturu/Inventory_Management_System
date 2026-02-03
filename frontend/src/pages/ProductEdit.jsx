import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productApi from '../api/productApi'
import ProductForm from '../components/products/ProductForm'
import useAuth from '../hooks/useAuth'
import { useRequest } from '../context/RequestContext'
import { AlertCircle, Check } from 'lucide-react'

export default function ProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addRequest } = useRequest()
  const [product, setProduct] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await productApi.get(id)
        setProduct(res.data)
      } catch (err) {}
    }
    fetch()
  }, [id])

  // Intercept the direct API call that ProductForm usually does.
  // We need to pass a custom "onSubmit" handler to ProductForm if it supports it, 
  // or wrap it. Checking ProductForm code... 
  // If ProductForm handles submit internally, we might need to modify ProductForm or clone it.
  // Assuming ProductForm takes an `onSubmit` prop based on standard practices, or we modify it to do so.
  
  const handleUpdate = async (formData) => {
    if (user?.role === 'staff') {
       addRequest(product, formData, user)
       setAlert({ type: 'success', msg: 'Update request submitted to Admin!' })
       setTimeout(() => navigate('/products'), 2000)
    } else {
       // Admin/Manager: Direct Update
       try {
         await productApi.update(id, formData)
         setAlert({ type: 'success', msg: 'Product updated successfully' })
         setTimeout(() => navigate('/products'), 1500)
       } catch (err) {
         setAlert({ type: 'error', msg: 'Failed to update product' })
       }
    }
  }

  return (
    <div className="p-6 md:p-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
           {user?.role === 'staff' ? 'Request Product Update' : 'Edit Product'}
        </h1>
        {user?.role === 'staff' && (
           <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1">
              <AlertCircle size={14} /> Staff Mode: Changes require approval
           </span>
        )}
      </div>

      {alert && (
         <div className={`p-4 mb-6 rounded-xl flex items-center gap-2 ${alert.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {alert.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            {alert.msg}
         </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* We need to pass handleUpdate to ProductForm. 
            If ProductForm doesn't accept it, we must modify ProductForm next. 
            For now, I assume I will modify ProductForm to accept `onSubmit`. */}
        <ProductForm product={product} onSubmitOverride={handleUpdate} />
      </div>
    </div>
  )
}
