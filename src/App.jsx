import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../src/features/auth/pages/LoginPage'
import Dashboard from '../src/features/dashboard/pages/DashboardPage'
import ProtectedRoute from '../src/features/auth/components/ProtectedRoute'
import UsersPage from '../src/features/users/pages/UsersPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
  path="/users"
  element={
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  }
/>
      <Route path="/users" element={<UsersPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

