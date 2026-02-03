import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import CompanyLogo from './CompanyLogo'
import { COMPANY } from '../../utils/constants'

export default function Navbar(){
  const { user } = useAuth()
  const { seedDemoData, clearDemoData } = useData()
  return (
    <header className="w-full bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="container-main h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <CompanyLogo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted">{user ? `Hi, ${user.name || user.email}` : <Link to="/login" className="text-primary-600">Login</Link>}</div>
          <Link to="/profile" className="px-3 py-1 rounded-md hover:bg-gray-50">Profile</Link>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={seedDemoData} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Seed Demo</button>
            <button onClick={clearDemoData} className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Clear Demo</button>
          </div>

          <div className="text-xs text-gray-400">{COMPANY.name}</div>
        </div>
      </div>
    </header>
  )
}
