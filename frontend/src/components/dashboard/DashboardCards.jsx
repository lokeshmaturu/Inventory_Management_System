import React from 'react'
import { DollarSign, ShoppingCart, Repeat, Package, TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardCards({ stats = {} }) {
  const cards = [
    {
      title: 'Total Sales',
      value: `$${(stats.todaySales ?? 0).toLocaleString()}`,
      icon: <DollarSign className="text-blue-600" size={24} />,
      iconBg: 'bg-blue-100',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Total Purchase',
      value: `$${(stats.todayPurchase ?? 0).toLocaleString()}`,
      icon: <ShoppingCart className="text-emerald-600" size={24} />,
      iconBg: 'bg-emerald-100',
      trend: '+8.2%',
      trendUp: true
    },
    {
      title: 'Total Returns',
      value: stats.todayReturns ?? 0,
      icon: <Repeat className="text-orange-600" size={24} />,
      iconBg: 'bg-orange-100',
      trend: '-2.4%',
      trendUp: false
    },
    {
      title: 'Total Products',
      value: stats.totalProducts ?? 0,
      icon: <Package className="text-purple-600" size={24} />,
      iconBg: 'bg-purple-100',
      trend: '+4.1%',
      trendUp: true
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${card.iconBg}`}>
              {card.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={`inline-flex items-center gap-1 font-medium ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {card.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {card.trend}
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
