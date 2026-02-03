import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

export default function DashboardHeader() {
  const { user } = useAuth()
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Placeholder for Breadcrumbs or Page Title if needed later */}
        <h2 className="text-gray-500 text-sm font-medium">OverView</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          Hi, <span className="font-semibold text-gray-900">{user?.name || user?.email || 'User'}</span>
        </div>
        
        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

        <Link 
          to="/profile" 
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          title="Profile"
        >
          <User size={20} />
        </Link>
        
        <Link 
          to="/logout" 
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  )
}
