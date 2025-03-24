import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';


export default function Header({ locationState = '' }) {
    const { logout } = useAuth();
    useEffect(() => {
    }, [locationState]);
    const navgiate = useNavigate();
    const handleLogout = () => {
        logout();
    }

    const handleDashboard = () => {
        
    }
    return (
        <div className='Header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand " to="/">Mentor Connect</Link>
                    <div className="collapse navbar-collapse ms-5" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${locationState === 'home' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className={`nav-item `}>
                                <Link className={`nav-link ${locationState === 'about' ? 'active' : ''}`} to="/about">About Us</Link>
                            </li>

                        </ul>
                        <div className="auth-options-container d-flex flex-column flex-md-row">
                            <button className="btn px-5 flex-grow-1 mx-2" onClick={() => { navgiate('/mentor/login') }}>Mentor Login</button>
                            <button className="btn btn-primary px-5 flex-grow-1" onClick={() => {navgiate('/login')}}>Student Login</button>
                        </div>
                        {/* <div className="auth-options-container d-flex flex-column flex-md-row">
                            <Link className="btn px-5 flex-grow-1 mx-2" onClick={handleDashboard}>Dashboard</Link>
                            <Link className="btn px-5 flex-grow-1 text-danger" style={{ background: '#ffd9d1' }} onClick={handleLogout}>Logout </Link>
                        </div> */}

              
                    </div>
                </div>
            </nav>
        </div>
    )
}
