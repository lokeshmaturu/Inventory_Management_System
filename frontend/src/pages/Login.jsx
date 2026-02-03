import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'

export default function Login() {
  const { login, setUserLocal } = useAuth()
  const { seedDemoData } = useData()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const user = await login({ email, password })
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'manager') navigate('/manager')
      else navigate('/staff')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  const demoLogin = async (role) => {
    setError(null)
    const demoMap = {
      admin: { name: 'Admin', email: 'admin@example.com', role: 'admin' },
      manager: { name: 'Manager', email: 'manager@example.com', role: 'manager' },
      staff: { name: 'Staff', email: 'staff@example.com', role: 'staff' }
    }
    const creds = { email: demoMap[role].email, password: 'password' }
    try {
      const user = await login(creds)
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'manager') navigate('/manager')
      else navigate('/staff')
    } catch (err) {
      // Backend not available: fallback to local demo user and demo data
      seedDemoData()
      setUserLocal(demoMap[role], 'dev-token')
      if (role === 'admin') navigate('/admin')
      else if (role === 'manager') navigate('/manager')
      else navigate('/staff')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
          <div className="hidden md:flex items-center justify-center">
            <div className="card-strong w-full max-w-md overflow-hidden">
              <div className="hero-video-wrapper">
                <video className="hero-video" autoPlay muted loop playsInline poster="/assets/hero-poster.jpg">
                  <source src="/assets/hero.mp4" type="video/mp4" />
                  {/* fallback image for old browsers */}
                </video>
                <img src="https://picsum.photos/seed/company/640/360" alt="company" className="absolute inset-0 w-full h-full object-cover block md:hidden" />
                <div className="hero-video-overlay" aria-hidden="true" />
                <div className="hero-video-caption">
                  <h2 className="text-xl font-semibold">Welcome to Acme Inventory</h2>
                  <p className="text-sm text-white/80 mt-2">Sign in to manage inventory, suppliers and sales.</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={submit}>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://picsum.photos/seed/logo/48/48" alt="logo" className="w-10 h-10 object-cover rounded" />
              <div>
                <div className="text-lg font-semibold">Acme Inventory</div>
                <div className="text-xs text-gray-400">Inventory Management</div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            <label className="block mb-2">Email</label>
            <input className="w-full p-2 border rounded mb-3" value={email} onChange={e => setEmail(e.target.value)} />
            <label className="block mb-2">Password</label>
            <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="w-full btn-primary">Login</button>

            <div className="mt-4 text-center">
              <div className="text-sm text-gray-500 mb-2">Or use demo accounts</div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 bg-indigo-600 text-white py-2 rounded" onClick={() => demoLogin('admin')}>Login as Admin</button>
                <button type="button" className="flex-1 bg-green-600 text-white py-2 rounded" onClick={() => demoLogin('manager')}>Manager</button>
                <button type="button" className="flex-1 bg-gray-600 text-white py-2 rounded" onClick={() => demoLogin('staff')}>Staff</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
