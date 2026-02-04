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
    <aside className="w-64 bg-white h-full p-4 border-r border-gray-100 flex flex-col shadow-sm relative z-20">
      <div className="mb-6 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</div>
      <nav className="flex flex-col gap-1">
        {items.map(i => {
          const isActive = location.pathname === i.to;
          return (
            <Link 
              key={i.to} 
              to={i.to} 
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm ring-1 ring-primary-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1'
                }
              `}
            >
              <span className={`w-6 transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>{i.icon}</span>
              <span className="flex-1">{i.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="mb-3 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Support</div>
        <Link to="/notifications" className="block text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors">Notifications</Link>
        <Link to="/audit-logs" className="block text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors">Audit Logs</Link>
      </div>
    </aside>
  )
}
