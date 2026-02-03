import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Sidebar(){
  const location = useLocation()
  const { user } = useAuth()
  const role = user?.role || 'staff'

  let items = [
    { to: role === 'admin' ? '/admin' : role === 'manager' ? '/manager' : '/staff', label: 'Dashboard', icon: '📊' },
    { to: '/products', label: 'Products', icon: '📦' },
    { to: '/stock', label: 'Stock', icon: '📑' },
    { to: '/sales', label: 'Sales', icon: '💰' },
    { to: '/purchases', label: 'Purchases', icon: '🛒' },
  ]

  // Staff should NOT see Suppliers or Reports
  if (role !== 'staff') {
    items.push({ to: '/suppliers', label: 'Suppliers', icon: '🏷️' })
    items.push({ to: '/reports', label: 'Reports', icon: '📈' })
  }

  return (
    <aside className="w-56 bg-white h-full p-4 border-r">
      <div className="mb-4 text-sm text-gray-500">Main</div>
      <nav className="flex flex-col gap-1">
        {items.map(i => (
          <Link key={i.to} to={i.to} className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm ${location.pathname === i.to ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
            <span className="w-6 text-center">{i.icon}</span>
            <span className="flex-1">{i.label}</span>
            {location.pathname === i.to && <span className="text-xs text-primary-500">Active</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t text-sm text-gray-500">
        <div className="mb-2">Support</div>
        <Link to="/notifications" className="block text-gray-700 hover:bg-gray-50 px-3 py-1 rounded">Notifications</Link>
        <Link to="/audit-logs" className="block text-gray-700 hover:bg-gray-50 px-3 py-1 rounded">Audit Logs</Link>
        <div className="mt-4 text-xs text-gray-400 px-3">v1.2</div>
      </div>
    </aside>
  )
}
