import React from 'react'
import PublicPosts from './../Posts/PublicPost'
import PostForm from './../Forms/PostForm.jsx'

export default function CheckPosts() {
    const alumniArticles = [
        {
          alumniName: "Rahul Sharma",
          heading: "Navigating Your First Job: Tips for Fresh Graduates",
          content: "Starting your first job can be overwhelming. Focus on learning, be proactive, and seek mentorship. Soft skills are just as important as technical knowledge. Stay curious, and never stop improving!"
        },
        {
          alumniName: "Priya Mehta",
          heading: "The Importance of Networking in Your Career",
          content: "Networking isn't just about making connections; it's about building relationships. Attend events, join LinkedIn groups, and connect with professionals in your field. You never know when a connection might lead to an opportunity."
        },
        {
          alumniName: "Amit Verma",
          heading: "How to Stay Motivated During Job Search",
          content: "Job searching can be tough, but consistency is key. Set daily goals, improve your resume, and keep learning new skills. Rejections are part of the journey—stay positive and persistent!"
        },
        {
          alumniName: "Neha Kapoor",
          heading: "Why Internships Matter: My Personal Experience",
          content: "Internships bridge the gap between academics and the real world. My first internship helped me develop problem-solving skills, build confidence, and land my dream job. Never underestimate the power of real-world experience!"
        },
        {
          alumniName: "Vikram Singh",
          heading: "Balancing Studies and Side Projects: A Success Formula",
          content: "Having side projects alongside academics helps you stand out. It shows initiative and passion for learning beyond textbooks. Manage your time wisely and build something that excites you!"
        },
        {
          alumniName: "Sneha Patil",
          heading: "The Role of Soft Skills in Technical Careers",
          content: "Technical skills get you hired, but soft skills keep you growing. Communication, teamwork, and adaptability are crucial in any career. Invest in improving them alongside your technical expertise."
        },
        {
          alumniName: "Rohan Desai",
          heading: "Mistakes I Made in College and What I Learned",
          content: "From not networking enough to ignoring internships, I made many mistakes. Learn from my experience: get involved in communities, take on real-world projects, and never stop asking questions."
        },
        {
          alumniName: "Anjali Nair",
          heading: "Overcoming Imposter Syndrome as a Student",
          content: "Feeling like you're not good enough? You're not alone! Imposter syndrome affects many students. The key is to acknowledge your achievements, seek mentorship, and remind yourself that learning is a process."
        },
        {
          alumniName: "Kunal Joshi",
          heading: "How to Ace Your Technical Interviews",
          content: "Practice coding problems daily, understand core concepts, and work on projects. Mock interviews help a lot. Confidence and structured thinking are just as important as knowing the right answer."
        },
        {
          alumniName: "Megha Sethi",
          heading: "Why Giving Back to Your University Matters",
          content: "Mentoring juniors, contributing to open-source projects, and sharing knowledge strengthen your skills. Teaching is one of the best ways to learn and make a meaningful impact!"
        }
      ];
      
      
      
  return (
    <div className='CheckPosts'>
        <h1 style={{margin:"1rem"}}>Your Posts</h1>
        <PostForm/>
        {alumniArticles.map((article) => (
            <PublicPosts data = {article}/>
        ))}
    </div>
  )
}
