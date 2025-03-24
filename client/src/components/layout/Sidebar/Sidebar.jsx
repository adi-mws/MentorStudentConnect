import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar({}) {

  return (
    <div className='Sidebar'>
        <ul className="sidebar-category head">
            <h5>Student Mentorship</h5>
            <p className="greeting">Welcome, Aditya Raj</p>
            <span className="tag">Student</span>
        </ul>
        <ul className='sidebar-category '>
            <li ><Link to="/dashboard" className='sidebar-item'>Dashboard</Link></li>
            <li ><Link to="/dashboard/profile" className='sidebar-item'>Profile</Link></li>
            <li ><Link to="/dashboard/mentors" className='sidebar-item'>Mentors</Link></li>
            <li ><Link to="/dashboard/goals" className='sidebar-item'>Goals</Link></li>
        </ul>
        <ul className="sidebar-category">
            <h3 className='sidebar-category-item'>Others</h3>
            <li><Link to="/dashboard/goals" className='sidebar-item'>Home</Link></li>
            <li><Link to="/dashboard/about" className='sidebar-item'>About</Link></li>
        </ul>
    </div>
  )
}
