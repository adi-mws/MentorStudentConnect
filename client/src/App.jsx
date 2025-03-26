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
import Webinars from './components/dashboard/Webinar.jsx'
import AdminMentorsAlumni from './components/dashboard/AdminMentorsAlumni.jsx'

//aditya
import { Navigate } from 'react-router-dom'
import AdminRegistration from './pages/AdminRegistration.jsx'
import Students from './components/dashboard/Students.jsx'
import StudentProfile from './components/dashboard/StudentProfile.jsx'
import Alumni from './components/dashboard/Alumni.jsx'
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Student and Alumni Dashboard */}
      <Route path='/dashboard' element={user && (user.role === 'student' || user.role === 'alumni') ? <Dashboard /> : <Navigate to="/" />}>
        <Route path='/dashboard' context={{ locationState: 'Dashboard' }} element={<DashboardMainPage />} />
        <Route path='/dashboard/profile' element={<StudentProfile isOpen='true' />} />
        <Route path='/dashboard/mentors' element={<Mentors />} />
        <Route path='/dashboard/search-mentors' element={<SearchMentors />} />
        <Route path='/dashboard/goals' element={<Goals />} />
        <Route path='/dashboard/discussions' element={<Discussions />} />
        <Route path='/dashboard/webinars' element={<Webinars />} />
        <Route path='/dashboard/webinars/:id' element={<Webinars />} />
        <Route path='/dashboard/discussions/:id' element={<DiscussionForum />} />
      </Route>



      {/* Admin  Dashboard  */}
      <Route path='/admin/dashboard' element={user && (user.role === 'admin') ? <Dashboard type='admin' /> : <Navigate to="/" />} >
        <Route index element={<DashboardMainPage />} />
        <Route path='/admin/dashboard/profile' element={<Profile />} />
        <Route path='/admin/dashboard/mentors' element={<Mentors />} />
        <Route path='/admin/dashboard/students' element={<Students />} />
        <Route path='/admin/dashboard/alumni' element={<Alumni />} />

      </Route>

      {/* Mentors Layout */}
      <Route path='/mentor/dashboard' element={user && (user.role === 'mentor') ? <Dashboard type='mentor' /> : <Navigate to="/" />}>
        <Route index element={<DashboardMainPage />} />
        <Route path='/mentor/dashboard/mentoring-group' element={<MentoringGroup />} />
        <Route path='/mentor/dashboard/profile' element={<Profile />} />
        <Route path='/mentor/dashboard/mentors' element={<Mentors />} />
        <Route path='/mentor/dashboard/goals' element={<Goals />} />

      </Route>


      {/* Website Layout */}
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={user ? <Navigate to={'/'}/>: <LoginPage /> } />
        <Route path='/registration' element={user ? <Navigate to={'/'}/>: <StudentAlumniRegistrationPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/goals' element={<Goals />} />
        <Route path='/public-posts' element={<PublicPostsPage />} />
        <Route path='/mentors-promotion' element={<AdminMentorsAlumni />} />
        <Route path='/alumni-registration' element={user ? <Navigate to={'/'}/> : <StudentAlumniRegistrationPage type="alumni" />} />
        {/* Mentors Routes */}
        <Route path='/mentor/login' element={user ? <Navigate to={'/'}/> : <LoginPage type='mentor' />} />
        <Route path='/alumni/login' element={user ? <Navigate to={'/'}/> : <LoginPage type='alumni' />} />
        {/* Alumni Routes */}
        <Route path='/alumni/registration' element={user ? <Navigate to={'/'}/> : <StudentAlumniRegistrationPage  type='alumni'/>} />
        {/* Admin Routes */}
        <Route path='/admin/login' element={user ? <Navigate to={'/'}/>: <LoginPage type='admin' />} />
        <Route path='/admin/registration' element={user ? <Navigate to={'/'}/> :<AdminRegistration />} />

      </Route>





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
