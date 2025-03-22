import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './assets/contexts/AuthContext'

function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/dashboard' element={<MainLayout />}>
            <Route path='/dashboard/student' />
            <Route path='/dashboard/student' />
          </Route>
          <Route path='/' element={<MainLayout />}>
            <Route path='/home' element={<Home />}/>
            <Route path='/student' element={<StudentLoginPage />} />
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
