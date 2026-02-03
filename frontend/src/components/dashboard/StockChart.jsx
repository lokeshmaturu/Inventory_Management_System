import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function StockChart({ products = [] }){
  const labels = products.map(p => p.name)
  const data = {
    labels,
    datasets: [
      { label: 'Stock', data: products.map(p => p.stock ?? 0), backgroundColor: 'rgba(59, 130, 246, 0.6)' }
    ]
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Stock Report</h3>
      <Bar data={data} />
    </div>
  )
}
