import React from 'react'
import './Homepage.css'

export default function HomePage() {
  return (
    <div className='HomePage'>
      <div className="hero-section">
        <div className="hero-left">
          <p className="hero-title">Bridging Students with Alumni Mentors</p>
          <p className="hero-description"> Learn from Those Wh've Walked the Path - Gain real-world insights, achieve your goals, and shape your future with personalized mentorship.</p>
          <div className="hero-redirections">
            <button className='btn btn-primary'>Find Your Mentor</button>
          </div>
        </div>
        <div className="hero-right">
          <img src="/imgs/hero-image.png" alt="" />
        </div>
      </div>
    </div>
  )
}
