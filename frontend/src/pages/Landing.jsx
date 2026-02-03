import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useData from '../hooks/useData'

export default function Landing(){
  const { user } = useAuth()
  const { seedDemoData } = useData()
  const navigate = useNavigate()

  const enter = () => {
    if (user) {
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'manager') navigate('/manager')
      else navigate('/staff')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <video className="fullscreen-video" autoPlay muted loop playsInline poster="/assets/hero-poster.jpg">
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Acme Inventory — Inventory Management System</h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">Manage products, suppliers, stock, and reports — with real-time insights and simple tools for your team.</p>

          <div className="flex justify-center gap-3">
            <button className="btn-primary" onClick={enter}>Enter App</button>
            <button className="btn-ghost" onClick={() => { seedDemoData(); navigate('/login') }}>Seed Demo & Login</button>
            <button className="btn-ghost" onClick={() => navigate('/login')}>Login</button>
          </div>

          <div className="mt-6 text-sm text-white/60">If you are a first-time user, you can use demo accounts on the login page.</div>
        </div>
      </div>
    </div>
  )
}