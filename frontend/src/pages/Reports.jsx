import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import productApi from '../api/productApi'
import { FileText, Save, BarChart2 } from 'lucide-react'

// Simple helper to persist reports locally for demo since no backend endpoint wasn't specified for "Daily Reports"
const useDailyReports = () => {
  const [reports, setReports] = useState(() => {
    return JSON.parse(localStorage.getItem('daily_reports') || '[]')
  })
  
  const addReport = (report) => {
    const newReports = [report, ...reports]
    setReports(newReports)
    localStorage.setItem('daily_reports', JSON.stringify(newReports))
  }
  
  return { reports, addReport }
}

export default function Reports() {
  const { user } = useAuth()
  const { reports, addReport } = useDailyReports()
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Manager View: Submit Report
  if (user?.role === 'manager') {
    const handleSubmit = (e) => {
      e.preventDefault()
      addReport({
        id: Date.now(),
        date: new Date().toISOString(),
        author: user.name,
        content: note
      })
      setNote('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }

    return (
      <div className="p-6 max-w-2xl mx-auto animate-in fade-in">
        <h1 className="text-2xl font-bold mb-2">Daily Report Submission</h1>
        <p className="text-gray-500 mb-6">Submit your daily inventory observations and issues.</p>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <label className="block text-sm font-medium text-gray-700 mb-2">Report Content</label>
           <textarea
             className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none h-40 resize-none"
             placeholder="E.g., Stock count for 'Laptop' matches system. Received damaged shipment from Supplier X..."
             value={note}
             onChange={e => setNote(e.target.value)}
             required
           />
           <button className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
             <Save size={18} /> Submit Report
           </button>
           {submitted && <p className="mt-3 text-green-600 font-medium">Report submitted successfully!</p>}
        </form>

        <div className="mt-8">
           <h3 className="font-bold text-gray-900 mb-4">Your Recent Submissions</h3>
           <div className="space-y-4">
             {reports.filter(r => r.author === user.name).slice(0, 3).map(r => (
                <div key={r.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <p className="text-xs text-gray-400 mb-1">{new Date(r.date).toLocaleString()}</p>
                   <p className="text-gray-700">{r.content}</p>
                </div>
             ))}
           </div>
        </div>
      </div>
    )
  }

  // Admin View: View Reports + Stock
  if (user?.role === 'admin') {
    return (
      <div className="p-6 animate-in fade-in">
        <h1 className="text-2xl font-bold mb-6">Reports Overview</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Manager Reports */}
           <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <FileText className="text-primary-600" /> Manager Daily Reports
              </h2>
              {reports.length === 0 ? <p className="text-gray-500 italic">No reports submitted yet.</p> : (
                 <div className="space-y-4">
                    {reports.map(r => (
                       <div key={r.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                             <span className="font-bold text-gray-900">{r.author}</span>
                             <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{new Date(r.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{r.content}</p>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           {/* Stock Report (Mock visualization of "Quantity of items present now") */}
           <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                 <BarChart2 className="text-emerald-600" /> Stock Quantity Report
              </h2>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-500 mb-4">Live snapshot of current inventory levels.</p>
                 {/* Reusing the dashboard chart logic conceptually, or simpler list here */}
                 <div className="space-y-3">
                    {[
                      { name: 'Laptop', count: 45, max: 100 },
                      { name: 'Wireless Mouse', count: 120, max: 150 },
                      { name: 'Monitor 24"', count: 30, max: 50 },
                      { name: 'Office Chair', count: 12, max: 20 },
                    ].map((item, i) => (
                       <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                             <span className="font-medium">{item.name}</span>
                             <span className="text-gray-500">{item.count} units</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                             <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(item.count/item.max)*100}%` }}></div>
                          </div>
                       </div>
                    ))}
                 </div>
                 <button className="mt-6 w-full py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Download PDF Report
                 </button>
              </div>
           </div>
        </div>
      </div>
    )
  }

  return <div className="p-6 text-red-500">Access Denied</div>
}
