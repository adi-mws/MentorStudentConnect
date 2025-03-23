import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './assets/contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import StudentAlumniLoginPage from './pages/StudentAlumniLoginPage'
import AboutPage from './pages/AboutPage'
import Leaderboard from './pages/Leaderboard'
import GoalsPage from './components/GoalsSection/GoalsPage'
import StudentLanding from './components/Student/StudentLanding'
import ForgotPassword from './components/Forms/ForgotPassword'

function App() {


  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/dashboard' element={<StudentLanding />}>
              <Route path='/dashboard/student' />
              <Route path='/dashboard/student' />
            </Route>
            <Route path='/' element={<MainLayout />}>
              <Route path='/' context={{ locationState: "home" }} element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/login/student' element={<StudentAlumniLoginPage />} />
              <Route path='/forgot-password/student' element={<ForgotPassword />} />
              <Route path='/leaderboard' element={<Leaderboard />} />
              <Route path='/goals' element={<GoalsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
