import React from 'react'
import LineChart from '../../assets/Charts/LineChart'
import './StudentLanding.css'


export default function StudentLanding() {
  return (
    <div className='StudentLanding'>
        <div className="MentorProgress">
           <div><p>Mentor 1</p></div>
            <div className="chart"><LineChart/></div>
        </div>
        <div className="MentorProgress">
        <div><p>Mentor 2</p></div>
        <div className="chart"><LineChart/></div>
        </div>
        <div className="MentorProgress">
        <div><p>Mentor 3</p></div>
        <div className="chart"><LineChart/></div>
        </div>
    </div>
  )
}
