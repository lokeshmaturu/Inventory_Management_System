import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar' 
import DashboardHeader from './DashboardHeader'

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-surface">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Dynamic Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
