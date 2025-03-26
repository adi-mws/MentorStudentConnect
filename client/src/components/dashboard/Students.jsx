import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Students() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/student/get-All`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })

                if (response.status === 200) {
                    console.log(response.data);
                    setStudents(response.data.students);
                }
                else {
                    console.log(response.data)
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='Students'>
            <div className='Students p-2'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Registration No.</th>
                            <th scope="col">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((item, index) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.registrationNumber}</td>
                                <td>{item.department}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
