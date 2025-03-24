import React from 'react';

export default function HomePage() {
  return (
    <div className='HomePage'>
      <div className="hero-section container py-5">
        <div className="row align-items-center">
          
          {/* Left Section */}
          <div className="col-lg-6 col-md-12 text-center text-lg-start mb-4 mb-lg-0">
            <p className="hero-title display-4 fw-bold" style={{ marginTop: '1em' }}>
              Bridging Students with Alumni Mentors
            </p>
            <p className="hero-description mt-3 lead">
              Learn from Those Who've Walked the Path – Gain real-world insights, achieve your goals, and shape your future with personalized mentorship.
            </p>
            <div className="hero-redirections mt-4">
              <button className='btn btn-primary btn-lg'>Find Your Mentor</button>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-6 col-md-12 text-center">
            <img 
              src="/imgs/hero-image.png" 
              className="img-fluid rounded shadow-sm" 
              alt="Hero" 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
