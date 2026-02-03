import React, { useEffect, useState } from 'react'
import auditApi from '../../api/auditApi'

export default function AuditLogs(){
  const [logs, setLogs] = useState([])

  useEffect(() => {
    async function fetch(){
      try { const res = await auditApi.list(); setLogs(res.data || []) }
      catch(e){ setLogs([]) }
    }
    fetch()
  }, [])

  return (
    <div className="bg-white p-4 rounded shadow">
      {logs.length === 0 ? (
        <div className="text-sm text-gray-500">No audit logs</div>
      ) : (
        <ul className="space-y-2">
          {logs.map(l => (
            <li key={l.id} className="border p-2 rounded">
              <div className="font-medium">{l.user}</div>
              <div className="text-sm text-gray-600">{l.action}</div>
              <div className="text-xs text-gray-400">{new Date(l.date).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
