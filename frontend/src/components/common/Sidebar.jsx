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
    <aside className="w-64 bg-slate-900/50 backdrop-blur-xl h-full p-4 border-r border-white/5 flex flex-col relative z-20">
      <div className="mb-6 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</div>
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
                  ? 'bg-sky-500/10 text-sky-400 font-semibold shadow-[0_0_15px_rgba(14,165,233,0.1)] ring-1 ring-sky-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1'
                }
              `}
            >
              <span className={`w-6 transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>{i.icon}</span>
              <span className="flex-1">{i.label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="mb-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Support</div>
        <Link to="/notifications" className="block text-slate-400 hover:bg-white/5 hover:text-slate-200 px-3 py-2 rounded-lg transition-colors">Notifications</Link>
        <Link to="/audit-logs" className="block text-slate-400 hover:bg-white/5 hover:text-slate-200 px-3 py-2 rounded-lg transition-colors">Audit Logs</Link>
      </div>
    </aside>
  )
}
