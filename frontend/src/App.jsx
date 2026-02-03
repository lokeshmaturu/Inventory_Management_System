import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardManager from './pages/DashboardManager'
import DashboardStaff from './pages/DashboardStaff'
import Products from './pages/Products'
import ProductCreate from './pages/ProductCreate'
import ProductEdit from './pages/ProductEdit'
import Stock from './pages/Stock'
import Expiry from './pages/Expiry'
import Suppliers from './pages/Suppliers'
import SupplierProductsPage from './pages/SupplierProductsPage'
import Sales from './pages/Sales'
import Purchases from './pages/Purchases'
import InvoicePage from './pages/InvoicePage'
import Reports from './pages/Reports'
import FastSlow from './pages/FastSlow'
import NotificationsPage from './pages/NotificationsPage'
import AuditLogsPage from './pages/AuditLogsPage'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import ImportProducts from './pages/ImportProducts'
import ExportReports from './pages/ExportReports'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'
import ProtectedRoute from './routes/ProtectedRoute'
import Landing from './pages/Landing'
import AdminLayout from './components/common/AdminLayout'

import { RequestProvider } from './context/RequestContext'

export default function App() {
  return (
    <RequestProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />

        {/* Admin Layout Routes */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<ProtectedRoute role="admin"><DashboardAdmin /></ProtectedRoute>}
          />
          <Route
            path="/manager"
            element={<ProtectedRoute role="manager"><DashboardManager /></ProtectedRoute>}
          />
          <Route
            path="/staff"
            element={<ProtectedRoute role="staff"><DashboardStaff /></ProtectedRoute>}
          />

          {/* Products & stock */}
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute role={['admin', 'manager']}><ProductCreate /></ProtectedRoute>} />
          <Route path="/products/:id/edit" element={<ProtectedRoute><ProductEdit /></ProtectedRoute>} />
          <Route path="/stock" element={<ProtectedRoute><Stock /></ProtectedRoute>} />
          <Route path="/expiry" element={<ProtectedRoute><Expiry /></ProtectedRoute>} />

          {/* Suppliers */}
          <Route path="/suppliers" element={<ProtectedRoute role={['admin', 'manager']}><Suppliers /></ProtectedRoute>} />
          <Route path="/suppliers/:id/products" element={<ProtectedRoute role={['admin', 'manager']}><SupplierProductsPage /></ProtectedRoute>} />

          {/* Sales & purchases */}
          <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
          <Route path="/invoice/:id" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />

          {/* Reports */}
          <Route path="/reports" element={<ProtectedRoute role={['admin', 'manager']}><Reports /></ProtectedRoute>} />
          <Route path="/reports/fast-slow" element={<ProtectedRoute><FastSlow /></ProtectedRoute>} />

          {/* Notifications & logs */}
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute role="admin"><AuditLogsPage /></ProtectedRoute>} />

          {/* Settings */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

          {/* Import / Export */}
          <Route path="/import" element={<ProtectedRoute role={['admin', 'manager']}><ImportProducts /></ProtectedRoute>} />
          <Route path="/export" element={<ProtectedRoute><ExportReports /></ProtectedRoute>} />
        </Route>

        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RequestProvider>
  )
}
