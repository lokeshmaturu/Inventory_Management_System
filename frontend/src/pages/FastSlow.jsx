import React from 'react'
import FastSlowMoving from '../components/reports/FastSlowMoving'

export default function FastSlow(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fast & Slow Moving Items</h1>
      <FastSlowMoving />
    </div>
  )
}
