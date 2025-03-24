import React from 'react'
import './DashboardHeader.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

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

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }

  const title = routeTitles[location.pathname] || 'Dashboard';

  return (
    <header className='DashboardHeader d-flex px-4 align-items-center justify-content-between'>
      <p className="title fs-5 m-0">{title}</p>
      <Link className="btn px-5  text-danger" style={{ background: '#ffd9d1' }} onClick={handleLogout}>Logout  <i class="fa-solid fa-arrow-right-from-bracket ms-1"></i></Link>

    </header>
  )
}
