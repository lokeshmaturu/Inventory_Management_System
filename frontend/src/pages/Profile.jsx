import React from 'react'
import useAuth from '../hooks/useAuth'

export default function Profile(){
  const { user } = useAuth()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <div>Name: {user?.name || '-'}</div>
        <div>Email: {user?.email || '-'}</div>
        <div>Role: {user?.role || '-'}</div>
      </div>
    </div>
  )
}
