import React from 'react'
import './AboutPage.css'

export default function AboutPage() {
  const features = [
    {
      title: "Interactive Webinars",
      description: "Live webinars with industry experts, providing insights, career guidance, and skill-building sessions."
    },
    {
      title: "Personalized Dashboard",
      description: "A personalized dashboard displaying user progress."
    },
    {
      title: "Student Mentor Interaction",
      description: "One-on-one or group sessions with mentors for personalized career guidance, technical support, and networking opportunities."
    },
    {
      title: "Goal Tracking",
      description: "A feature that helps students set, track, and achieve learning goals with progress bars, milestones, and reminders."
    },
    {
      title: "Leaderboard",
      description: "A gamified system where students earn points and ranks based on their participation, achievements, and learning progress."
    },
    {
      title: "Public Posts by Alumni and Mentors",
      description: "A platform where mentors and alumni can share experiences, job opportunities, and industry insights to guide students."
    },
    {
      title: "Discussion Forums",
      description: "A community-driven space for students to ask questions, share knowledge, and collaborate on projects with peers and mentors."
    }
  ];
  
  console.log(features);
  

  return (
    <div className="AboutPage">
      <h1>About Us</h1>
      {features.map((feature,index) => (
        <div key={index} className="Feature">
          <h3 className="Heading">{feature.title}</h3>
          <p className="Discription">{feature.description}</p >
        </div>
      ))}
    </div>
  )
}
