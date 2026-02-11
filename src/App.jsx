import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import { url } from './assets/assets'

const App = () => {
  return (
    <div>
      <ToastContainer/>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Routes>
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                  </Routes>
                </div>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
