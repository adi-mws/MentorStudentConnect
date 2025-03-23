import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './assets/contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import StudentAlumniLoginPage from './pages/StudentAlumniLoginPage'
import AboutPage from './pages/AboutPage'

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
              <Route path='/' context={{ locationState: "home" }} element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/login' element={<StudentAlumniLoginPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
