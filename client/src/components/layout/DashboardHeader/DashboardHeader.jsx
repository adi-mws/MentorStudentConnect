import React from 'react'
import './DashboardHeader.css'
import { useLocation } from 'react-router-dom';

export default function DashboardHeader() {
  const location = useLocation();
  const routeTitles = {
    '/dashboard': 'Dashboard',
    '/dashboard/profile': 'Profile',
    '/dashboard/goals': 'Goals',
    '/dashboard/mentors': 'Mentors',
    '/dashboard/students': 'Students',
    '/dashboard/messages': 'Messages',
  };

  const title = routeTitles[location.pathname] || 'Dashboard';

  return (
    <header className='DashboardHeader d-flex px-4 align-items-center'>
      <p className="title fs-5 m-0">{title}</p>
    </header>
  )
}
