import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
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
import { Navigate } from 'react-router-dom'
import AdminRegistration from './pages/AdminRegistration.jsx'
import Students from './components/dashboard/Students.jsx'
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Student and Alumni Dashboard */}
      <Route path='/dashboard' element={user && (user.role === 'student' || user.role === 'alumni') ? <Dashboard /> : <Navigate to="/" />}>
        <Route path='/dashboard' context={{ locationState: 'Dashboard' }} element={<DashboardMainPage />} />
        <Route path='/dashboard/profile' element={<Profile />} />
        <Route path='/dashboard/mentors' element={<Mentors />} />
        <Route path='/dashboard/search-mentors' element={<SearchMentors />} />
        <Route path='/dashboard/goals' element={<Goals />} />
        <Route path='/dashboard/discussions' element={<Discussions />} />
        <Route path='/dashboard/webinars' element={<Discussions />} />
        <Route path='/dashboard/webinars/:id' element={<Discussions />} />
        <Route path='/dashboard/discussions/:id' element={<DiscussionForum />} />
      </Route>
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
      <Route path='/admin/dashboard' element={user && (user.role === 'admin') ? <Dashboard type='admin' /> : <Navigate to="/" />} >
        <Route index element={<DashboardMainPage />} />
        <Route path='/admin/dashboard/profile' element={<Profile />} />
        <Route path='/admin/dashboard/mentors' element={<Mentors />} />
        <Route path='/admin/dashboard/students' element={<Students />} />
        <Route path='/admin/dashboard/alumni' element={<Goals />} />

      </Route>

      {/* Mentors Layout */}
      <Route path='/mentor/dashboard' element={user && (user.role === 'mentor') ? <Dashboard type='mentor' /> : <Navigate to="/" />}>
        <Route index element={<DashboardMainPage />} />
        <Route path='/mentor/dashboard/mentoring-group' element={<MentoringGroup />} />
        <Route path='/mentor/dashboard/profile' element={<Profile />} />
        <Route path='/mentor/dashboard/mentors' element={<Mentors />} />
        <Route path='/mentor/dashboard/goals' element={<Goals />} />

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
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<StudentAlumniRegistrationPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/goals' element={<GoalsPage />} />
        <Route path='/public-posts' element={<PublicPostsPage />} />
        <Route path='/alumni-registration' element={<StudentAlumniRegistrationPage type="alumni" />} />
      </Route>
      {/* Alumni Routes */}
      <Route path='/alumni/registration' element={<StudentAlumniRegistrationPage />} />
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
      </Route>
      {/* Mentors Routes */}
      <Route path='/mentor/login' element={<LoginPage type='mentor' />} />

      {/* Admin Routes */}
      <Route path='/admin/login' element={<LoginPage type='admin' />} />
      <Route path='/admin/registration' element={<AdminRegistration />} />

    </Routes>
  )
}

  function App() {

    return (
      <>
        <AuthProvider>
          <NotificationProvider>
            <Router>

              <AppRoutes />
            </Router >

          </NotificationProvider>
        </AuthProvider>
      </>
    )
  }

  export default App;
