import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import DashboardHeader from '../components/layout/DashboardHeader/DashboardHeader'
import './layouts.css'
export default function StAlumDashboard() {
    return (
        <>
            <div className="dashboard-container">
                <Sidebar />
                <div className="dashboard-content">
                    <DashboardHeader />

                    <div className="dashboard-pages">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}
