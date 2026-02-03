import React from 'react'

export default function DashboardCards({ stats = {} }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Today Sales</div>
          <div className="text-2xl font-bold">{stats.todaySales ?? 0}</div>
        </div>
        <div className="text-3xl text-blue-600">💰</div>
      </div>

      <div className="p-4 bg-white rounded shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Today Purchase</div>
          <div className="text-2xl font-bold">{stats.todayPurchase ?? 0}</div>
        </div>
        <div className="text-3xl text-green-600">🛒</div>
      </div>

      <div className="p-4 bg-white rounded shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Today Returns</div>
          <div className="text-2xl font-bold">{stats.todayReturns ?? 0}</div>
        </div>
        <div className="text-3xl text-indigo-600">↩️</div>
      </div>

      <div className="p-4 bg-white rounded shadow flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{stats.totalProducts ?? 0}</div>
        </div>
        <div className="text-3xl text-red-600">📦</div>
      </div>
    </div>
  )
}
