import React from 'react'

function MentorProfile() {
  return (
    <div className='MentorProfile'></div>
  )
}

function AlumniProfile() {
  return (
    <div className='AlumniProfile'></div>
  )
}
function StudentProfile() {
  return (
    <div className='AlumniProfile'></div>
  )
}
export default function Profile() {

  return (
    <>
      <StudentProfile />
      <AlumniProfile />
      <MentorProfile />
    </>
  )
}
