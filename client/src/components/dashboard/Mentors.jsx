  import React from 'react'
  import { Link, useNavigate } from 'react-router-dom'

  export default function Mentors() {
    const navigate = useNavigate();
    return (
      <div className='Mentors p-2'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>


        <div class="card text-center py-5 px-2">
          <div class="card-body">
            <h5 class="card-title">Enhance Your Learning Journey</h5>
            <p class="card-text">Boost your skills and knowledge by seeking mentorship from multiple experts. More mentors provide you with different strategies and approaches.</p>
            <Link href="#" class="btn btn-primary px-5" to='/dashboard/search-mentors'><i class="fa-solid fa-plus me-2"></i> Add Mentors</Link>
          </div>
        </div>
      </div>
    )
  }
