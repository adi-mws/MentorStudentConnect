import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation(); 
  const [locationState, setLocationState] = useState('');
  const routeTitles = {
    '/dashboard': 'dashboard',
    '/dashboard/profile': 'profile',
    '/dashboard/goals': 'goals',
    '/dashboard/mentors': 'mentors',
    '/dashboard/students': 'students',
    '/dashboard/messages': 'messages',
  };

  useEffect(() => {
    setLocationState(routeTitles[location.pathname] || '');
  }, [location.pathname])

  
  return (
    <div className='Sidebar'>
        <ul className="sidebar-category head">
            <h5>Student Mentorship</h5>
            <p className="greeting">Welcome, Aditya Raj</p>
            <span className="tag">Student</span>
        </ul>
        <ul className='sidebar-category '>
            <li ><Link to="/dashboard" className={`${locationState === 'dashboard' ? 'active': ''} sidebar-item`}><i class="fa-solid fa-chart-line"></i> Dashboard</Link></li>
            <li ><Link to="/dashboard/profile" className={`${locationState === 'profile' ? 'active': ''} sidebar-item`}><i class="fa-solid fa-circle-user"></i> Profile</Link></li>
            <li ><Link to="/dashboard/mentors" className={`${locationState === 'mentors' ? 'active': ''} sidebar-item`}><i class="fa-solid fa-user-tie"></i> Mentors</Link></li>
            <li ><Link to="/dashboard/goals" className={`${locationState === 'goals' ? 'active': ''} sidebar-item`}><i class="fa-solid fa-bullseye"></i> Goals</Link></li>
        </ul>
        <ul className="sidebar-category">
            <h3 className='sidebar-category-item'>Others</h3>
            <li><Link to="/" className='sidebar-item'>Home</Link></li>
            <li><Link to="/about" className='sidebar-item'>About</Link></li>
        </ul>
    </div>
  )
}
