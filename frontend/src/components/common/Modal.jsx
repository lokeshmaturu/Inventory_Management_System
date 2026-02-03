import React from 'react'

export default function Modal({ children, onClose }){
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-lg w-full">
        <div className="text-right"><button className="text-gray-600" onClick={onClose}>Close</button></div>
        <div>{children}</div>
      </div>
    </div>
  )
}
