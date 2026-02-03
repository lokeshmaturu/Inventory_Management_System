import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'

export default function Login() {
  const { login, setUserLocal } = useAuth()
  const { seedDemoData } = useData()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const user = await login({ email, password })
      redirectUser(user.role)
    } catch (err) {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  const redirectUser = (role) => {
    if (role === 'admin') navigate('/admin')
    else if (role === 'manager') navigate('/manager')
    else navigate('/staff')
  }

  const demoLogin = async (role) => {
    setError(null)
    setLoading(true)
    const demoMap = {
      admin: { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
      manager: { name: 'Manager User', email: 'manager@example.com', role: 'manager' },
      staff: { name: 'Staff User', email: 'staff@example.com', role: 'staff' }
    }
    const creds = { email: demoMap[role].email, password: 'password' }
    
    // Simulate network delay for better UX
    setTimeout(async () => {
      try {
        const user = await login(creds)
        redirectUser(user.role)
      } catch (err) {
        // Backend not available: fallback to local demo user and demo data
        seedDemoData()
        setUserLocal(demoMap[role], 'dev-token')
        redirectUser(role)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        <div className="relative z-10 p-12 text-white max-w-xl">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="font-bold text-2xl tracking-tight">Acme Inventory</span>
          </Link>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Manage your entire supply chain in one place.</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            "Acme Inventory transformed how we handle stock. We reduced waste by 25% in the first month alone."
          </p>
          <div className="flex items-center gap-4 text-sm font-medium">
             <div className="flex bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 gap-3 items-center">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <CheckCircle2 className="text-green-400" size={20} />
                </div>
                <div>
                   <div className="text-white">Real-time Tracking</div>
                   <div className="text-gray-400 text-xs">Always accurate</div>
                </div>
             </div>
             <div className="flex bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10 gap-3 items-center">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <CheckCircle2 className="text-blue-400" size={20} />
                </div>
                <div>
                   <div className="text-white">Smart Analytics</div>
                   <div className="text-gray-400 text-xs">Data-driven decisions</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8 animate-in slide-in-from-right-8 duration-500">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                 <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                 {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : 'Sign in'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or simulate access (Demo)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => demoLogin('admin')}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                 <span className="font-bold text-xs">A</span>
              </div>
              <span className="text-xs font-medium text-gray-600">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => demoLogin('manager')}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                 <span className="font-bold text-xs">M</span>
              </div>
              <span className="text-xs font-medium text-gray-600">Manager</span>
            </button>
            <button
              type="button"
              onClick={() => demoLogin('staff')}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                 <span className="font-bold text-xs">S</span>
              </div>
              <span className="text-xs font-medium text-gray-600">Staff</span>
            </button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
               Don't have an account? <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
