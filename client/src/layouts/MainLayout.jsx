import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import './layouts.css'
export default function MainLayout() {
    const context = useOutletContext() || {};
    const { locationState } = context;
    return (
        <>
            <Header locationState={locationState} />
            <Outlet />

        </>

    )
}
