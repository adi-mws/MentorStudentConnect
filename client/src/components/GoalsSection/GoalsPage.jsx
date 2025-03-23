import {React,useState,useEffect} from 'react'
import './GoalsPage.css'

export default function GoalsPage() {
    const studentGoals = [
        {
          goal: "Improve Time Management",
          description: "Create a daily schedule to balance studies, assignments, and extracurricular activities effectively."
        },
        {
          goal: "Enhance Programming Skills",
          description: "Practice coding daily on platforms like LeetCode, CodeChef, or HackerRank to improve problem-solving skills."
        },
        {
          goal: "Maintain a High GPA",
          description: "Stay consistent with studies, take clear notes, and review material regularly before exams."
        },
        {
          goal: "Develop Public Speaking Skills",
          description: "Participate in debates, presentations, and group discussions to build confidence in speaking."
        },
        {
          goal: "Build a Strong Resume",
          description: "Gain experience through internships, projects, and certifications to enhance career opportunities."
        },
        {
          goal: "Learn a New Language",
          description: "Dedicate time to learning a foreign or programming language to broaden career prospects."
        },
        {
          goal: "Stay Physically Active",
          description: "Exercise regularly, join a sports club, or practice yoga to maintain physical and mental well-being."
        },
        {
          goal: "Expand Networking Skills",
          description: "Connect with peers, professors, and industry professionals to create valuable career opportunities."
        },
        {
          goal: "Master a Productivity Tool",
          description: "Learn tools like Notion, Trello, or Google Calendar to manage tasks efficiently."
        },
        {
          goal: "Develop a Portfolio Website",
          description: "Showcase projects, skills, and achievements through a personal website to impress potential employers."
        }
      ];
      
  return (

    <div className='GoalsPage'>
        <h1>Your Goals</h1>
        <div className="GoalsSection">
          {studentGoals.map(((goal,index) => (
            <div class="card">
            <h5 class="card-header">Goal {index+1}</h5>
            <div class="card-body">
                <h5 class="card-title">{goal.goal}</h5>
                <p class="card-text">{goal.description}</p>
                <a href="#" class="btn btn-primary">See Details</a>
            </div>
            </div>
          )))}
          
        </div>

    </div>
  )
}

