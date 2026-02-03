import React from 'react'

export default function CompanyLogo({ size = 36 }){
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full bg-primary-500 p-1 shadow-sm">
        <rect width="102" height="102" rx="18" fill="#3e6fff"/>
        <path d="M30 62 L45 30 L60 62 Z" fill="#fff"/>
        <circle cx="66" cy="66" r="10" fill="#fff" opacity="0.85" />
      </svg>
      <div className="leading-tight">
        <div className="text-base font-semibold text-gray-900">Acme Inventory</div>
        <div className="text-xs text-gray-500">Inventory Management</div>
      </div>
    </div>
  )
}