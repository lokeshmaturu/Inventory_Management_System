import React from 'react'
import AuditLogs from '../components/notifications/AuditLogs'

export default function AuditLogsPage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <AuditLogs />
    </div>
  )
}
