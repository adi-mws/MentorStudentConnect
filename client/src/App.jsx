import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import Leaderboard from './pages/Leaderboard'
import ForgotPassword from './components/forms/ForgotPassword'
import ResetPassword from './components/forms/ResetPassword'
import DashboardMainPage from './components/dashboard/MainPage/MainPage'
import Profile from './components/dashboard/Profile'
import { NotificationProvider } from './contexts/NotificationContext'
import Mentors from './components/dashboard/Mentors'
import Goals from './components/dashboard/Goals'
import LoginPage from './pages/LoginPage'
import Dashboard from './layouts/Dashboard'
import MentoringGroup from './components/dashboard/MentoringGroup'
import SearchMentors from './components/dashboard/SearchMentors'
import Discussions from './components/dashboard/Discussions'
import DiscussionForum from './components/dashboard/DiscussionForum'
import PublicPostsPage from './pages/PublicPostsPage'
import StudentAlumniRegistrationPage from './pages/StudentAlumniRegistrationPage.jsx'
import CheckPosts from './components/dashboard/CheckPosts.jsx'

//aditya
function App() {

  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>

              {/* Student and Alumni Dashboard */}
              <Route path='/dashboard' element={<Dashboard />}>
                <Route path='/dashboard' context={{ locationState: 'Dashboard' }} element={<DashboardMainPage />} />
                <Route path='/dashboard/profile' element={<Profile />} />
                <Route path='/dashboard/mentors' element={<Mentors />} />
                <Route path='/dashboard/search-mentors' element={<SearchMentors />} />
                <Route path='/dashboard/goals' element={<Goals />} />
                <Route path='/dashboard/discussions' element={<Discussions />} />
                <Route path='/dashboard/webinars' element={<Discussions />} />
                <Route path='/dashboard/webinars/:id' element={<Discussions />} />
                <Route path='/dashboard/discussions/:id' element={<DiscussionForum />} />
                <Route path='/dashboard/posts' element={<CheckPosts />} />
              </Route>


              {/* Admin  Dashboard  */}
              <Route path='/admin/dashboard' element={<Dashboard type='admin' />}>
                <Route index element={<DashboardMainPage />} />
                <Route path='/admin/dashboard/profile' element={<Profile />} />
                <Route path='/admin/dashboard/mentors' element={<Mentors />} />
                <Route path='/admin/dashboard/students' element={<Goals />} />
                <Route path='/admin/dashboard/alumni' element={<Goals />} />

              </Route>

              {/* Mentors Layout */}
              <Route path='/mentor/dashboard' element={<Dashboard type='mentor' />}>
                <Route index element={<DashboardMainPage />} />
                <Route path='/mentor/dashboard/mentoring-group' element={<MentoringGroup />} />
                <Route path='/mentor/dashboard/profile' element={<Profile />} />
                <Route path='/mentor/dashboard/mentors' element={<Mentors />} />
                <Route path='/mentor/dashboard/goals' element={<Goals />} />
                <Route path='/mentor/dashboard/posts' element={<CheckPosts />} />
                
              </Route>

              {/* Website Layout */}
              <Route path='/' element={<MainLayout />}>
                <Route path='/' context={{ locationState: "home" }} element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/goals' element={<Goals />} />
                <Route path='/public-posts' element={<PublicPostsPage />} />
                <Route path='/alumni-registration' element={<StudentAlumniRegistrationPage type="alumni" />} />

                {/* Mentors Routes */}
                <Route path='/mentor/login' element={<LoginPage type='mentor' />} />

                {/* Admin Routes */}
                <Route path='/admin/login' element={<LoginPage type='admin' />} />


              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
