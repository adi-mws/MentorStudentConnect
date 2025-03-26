import React, { useState, useEffect } from 'react';

const WebinarCard = ({ webinar }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(webinar.dateTime));
  const [canJoin, setCanJoin] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(webinar.dateTime);
      setTimeLeft(newTimeLeft);
      
      // Enable join button if 1 hour or less remains
      const hoursLeft = newTimeLeft.hours + (newTimeLeft.days * 24);
      setCanJoin(hoursLeft <= 1 && newTimeLeft.minutes >= 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [webinar.dateTime]);

  function calculateTimeLeft(endTime) {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const formatDateTime = (dateTime) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4 transition-transform hover:shadow-lg hover-translate-up" style={{ transition: "0.3s" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3" style={{color: 'var(--primary-color)'}}>{webinar.title}</h5>

        <p className="card-text text-secondary" style={{ maxHeight: "90px", overflow: "hidden", textOverflow: "ellipsis" }}>
          {webinar.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-user-circle me-2 text-muted"></i>
            <span className="text-muted">{webinar.host}</span>
          </div>

          <div className="d-flex align-items-center">
            <i className="fa-solid fa-clock me-1 text-muted"></i>
            <span className="text-muted">{formatDateTime(webinar.dateTime)}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-users me-2 text-muted"></i>
            <span className="text-muted">{webinar.participants} Joined</span>
          </div>

          <button 
            className="btn btn-primary btn-md px-4" 
            disabled={!canJoin}
            onClick={() => alert(`Joining webinar: ${webinar.title}`)}
          >
            {canJoin ? 'Join Now →' : `Starts in ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Webinars() {
  const [webinars, setWebinars] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Learn about advanced React patterns including compound components, render props, and hooks optimization.",
      host: "Jane Smith",
      dateTime: "2025-04-15T14:00:00",
      participants: 42
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning concepts and practical applications for beginners.",
      host: "Dr. Alan Turing",
      dateTime: "2025-04-20T10:30:00",
      participants: 87
    },
    {
      id: 3,
      title: "Cloud Architecture Best Practices",
      description: "Exploring modern cloud architecture patterns and deployment strategies.",
      host: "Sarah Johnson",
      dateTime: "2025-04-25T16:00:00",
      participants: 35
    },
    {
      id: 4,
      title: "UX Design Principles",
      description: "Master the fundamentals of user experience design and interface best practices.",
      host: "Mike Chen",
      dateTime: "2025-05-01T11:00:00",
      participants: 28
    },
    {
      id: 5,
      title: "Blockchain Development",
      description: "Hands-on workshop for building decentralized applications on Ethereum.",
      host: "Elena Rodriguez",
      dateTime: "2025-05-05T13:30:00",
      participants: 63
    }
  ]);

  return (
    <div className='Webinars'>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{margin:"1rem"}} className="text-2xl font-bold">Upcoming Webinars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>
      </div>
    </div>
  );
}