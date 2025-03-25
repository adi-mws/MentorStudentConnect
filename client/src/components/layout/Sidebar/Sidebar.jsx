import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'



const StudentSidebarComponents = ({ locationState }) => {

  return (
    <>
      <ul className='sidebar-category '>
        <li ><Link to="/dashboard" className={`${locationState === 'dashboard' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
        <li ><Link to="/dashboard/profile" className={`${locationState === 'profile' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-circle-user"></i> Profile</Link></li>
        <li ><Link to="/dashboard/mentors" className={`${locationState === 'mentors' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-user-tie"></i> Mentors</Link></li>
        <li ><Link to="/dashboard/discussions" className={`${location.pathname.includes('/dashboard/discussions') ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-comments"></i> Discussions</Link></li>
        <li ><Link to="/dashboard/webinars" className={`${locationState === 'webinars' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-earth"></i> Webinars</Link></li>
        <li ><Link to="/dashboard/goals" className={`${locationState === 'goals' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-bullseye"></i> Goals</Link></li>
      </ul>
      <ul className="sidebar-category">
        <h3 className='sidebar-category-item'>Others</h3>
        <li><Link to="/" className='sidebar-item'>Home</Link></li>
        <li><Link to="/about" className='sidebar-item'>About</Link></li>
      </ul>
    </>
  )
}

const MentorSidebarComponents = ({ locationState }) => {
  return (
    <>

      <ul className='sidebar-category '>
        <li ><Link to="/mentor/dashboard" className={`${locationState === 'dashboard' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
        <li ><Link to="/mentor/dashboard/profile" className={`${locationState === 'profile' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-circle-user"></i> Profile</Link></li>
        <li ><Link to="/mentor/dashboard/mentoring-group" className={`${locationState === 'mentoring-group' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-users"></i>  Mentoring Group</Link></li>
        <li ><Link to="/mentor/dashboard/goals" className={`${locationState === 'goals' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-bullseye"></i> Goals</Link></li>
      </ul>
      <ul className="sidebar-category">
        <h3 className='sidebar-category-item'>Others</h3>
        <li><Link to="/" className='sidebar-item'>Home</Link></li>
        <li><Link to="/about" className='sidebar-item'>About</Link></li>
      </ul>
    </>
  )
}


const AlumniSidebarComponents = ({ locationState }) => {
  return (
    <>

      <ul className='sidebar-category '>
        <li ><Link to="/dashboard" className={`${locationState === 'dashboard' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
        <li ><Link to="/dashboard/profile" className={`${locationState === 'profile' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-circle-user"></i> Profile</Link></li>
        <li ><Link to="/dashboard/mentors" className={`${locationState === 'mentors' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-user-tie"></i> Mentors</Link></li>
        <li ><Link to="/dashboard/goals" className={`${locationState === 'goals' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-bullseye"></i> Goals</Link></li>
      </ul>
      <ul className="sidebar-category">
        <h3 className='sidebar-category-item'>Others</h3>
        <li><Link to="/" className='sidebar-item'>Home</Link></li>
        <li><Link to="/about" className='sidebar-item'>About</Link></li>
      </ul>
    </>
  )
}

const AdminSidebarComponents = ({ locationState }) => {
  return (
    <>
      <ul className="sidebar-category">
        <li ><Link to="/admin/dashboard" className={`${locationState === 'dashboard' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-chart-line"></i> Dashboard</Link></li>
      </ul>

      <ul className='sidebar-category '>
        <h3>Roles</h3>
        <li ><Link to="/admin/dashboard/students" className={`${locationState === 'students' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-graduation-cap"></i> Students</Link></li>
        <li ><Link to="/admin/dashboard/alumni" className={`${locationState === 'alumni' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-users"></i> Alumni</Link></li>
        <li ><Link to="/admin/dashboard/mentors" className={`${locationState === 'mentors' ? 'active' : ''} sidebar-item`}><i className="fa-solid fa-user-tie"></i> Mentors</Link></li>
      </ul>

      <ul className="sidebar-category">
        <h3 className='sidebar-category-item'>Others</h3>
        <li><Link to="/" className='sidebar-item'>Home</Link></li>
        <li><Link to="/about" className='sidebar-item'>About</Link></li>
      </ul>
    </>
  )
}



export default function Sidebar({ type }) {
  const location = useLocation();
  const [locationState, setLocationState] = useState('');
  const { user } = useAuth();

  const routeTitles = {
    '/dashboard': 'dashboard',
    '/dashboard/profile': 'profile',
    '/dashboard/goals': 'goals',
    '/dashboard/mentors': 'mentors',
    '/dashboard/search-mentors': 'mentors',
    '/dashboard/students': 'students',
    '/dashboard/discussions': 'discussions',
    '/dashboard/webinars': 'webinars',

    '/dashboard/messages': 'messages',
    '/admin/dashboard': 'dashboard',
    '/admin/dashboard/students': 'students',
    '/admin/dashboard/alumni': 'alumni',
    '/admin/dashboard/mentors': 'mentors',
    // Dashboard Mentor 
    '/mentor/dashboard': 'dashboard',
    '/mentor/dashboard/profile': 'profile',
    '/mentor/dashboard/mentoring-group': 'mentoring-group',
    '/mentor/dashboard/goals': 'goals',
  };

  useEffect(() => {
    setLocationState(routeTitles[location.pathname] || '');
  }, [location.pathname])

  return (
    <div className='Sidebar'>
      <ul className="sidebar-category head">
        <h5>Student Mentorship</h5>
        <p className="greeting">Welcome, {user?.name}</p>
        <span className="tag">{type.toString().charAt(0).toUpperCase() + type.slice(1)}</span>
      </ul>
      {type === 'student' ?
        <StudentSidebarComponents locationState={locationState} />
        : type === 'mentor' ?
          <MentorSidebarComponents locationState={locationState} />
          : type === 'alumni' ?
            <AlumniSidebarComponents locationState={locationState} />
            : type === 'admin' ?
              <AdminSidebarComponents locationState={locationState} />
              : <></>
      }

    </div>
  )
}

