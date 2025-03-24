import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import StudentAlumniLoginPage from './pages/StudentAlumniLoginPage'
import AboutPage from './pages/AboutPage'
import Leaderboard from './pages/Leaderboard'
import GoalsPage from './components/GoalsSection/GoalsPage'
import StudentLanding from './components/Student/StudentLanding'
import ForgotPassword from './components/forms/ForgotPassword'
import ResetPassword from './components/forms/ResetPassword'
import StAlumDashboard from './layouts/StAlumDashboard'
import StAlumMainPage from './components/dashboard/MainPage/MainPage'
import Profile from './components/dashboard/Profile'
import { NotificationProvider } from './contexts/NotificationContext'
import Mentors from './components/dashboard/Mentors'
import Goals from './components/dashboard/Goals'

function App() {

  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path='/dashboard' element={<StAlumDashboard />}>
                <Route path='/dashboard' context={{ locationState: 'Dashboard' }} element={<StAlumMainPage />} />
                <Route path='/dashboard/profile' element={<Profile />} />
                <Route path='/dashboard/mentors' element={<Mentors />} />
                <Route path='/dashboard/goals' element={<Goals />} />

              </Route>
              <Route path='/' element={<MainLayout />}>
                <Route path='/' context={{ locationState: "home" }} element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<StudentAlumniLoginPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/goals' element={<GoalsPage />} />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
