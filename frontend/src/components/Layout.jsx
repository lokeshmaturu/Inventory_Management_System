import React from 'react'
import Navbar from './common/Navbar'
import Sidebar from './common/Sidebar'

export default function Layout({ children }){
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 py-6">
          <div className="container-main">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
