import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Dashboard from './Dashboard'
import './index.css'

// Função que verifica se usuário está logado
const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

// Componente que protege rotas
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
)
