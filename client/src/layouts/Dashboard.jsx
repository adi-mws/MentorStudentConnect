import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'
import './layouts.css'
export default function Dashboard({ type = 'student' }) {
    return (
        <>
            <div className="dashboard-container">
                <Sidebar type={type}/>
                <div className="dashboard-content">
                    <DashboardHeader type={type}/>

                    <div className="dashboard-pages">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}
