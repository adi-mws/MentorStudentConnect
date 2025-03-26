import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNotification } from '../../contexts/NotificationContext';
import StudentProfile from './StudentProfile';
import { useRef } from 'react';
import RegistrationPage from '../../pages/StudentAlumniRegistrationPage';
export default function Students() {
    const { showNotification } = useNotification();
    const [students, setStudents] = useState([]);
    const [showProfilePopUp, setShowProfilePopUp] = useState(false);
    const profileRef = useRef();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const handleRefreshProfile = (id) => {
        profileRef.current?.fetchStudent(id);
    };
    const showProfile = (id) => {
        setShowProfilePopUp(true);
        handleRefreshProfile(id);
    }

    const onClose = () => {
        setShowProfilePopUp(false);
    }

    const deleteStudent = async (id) => {
        const student = students.filter((item) => id == item._id)
        const confirmValue = confirm(`Do you want to delete student ${student.name}? `)
        try {
            if (!confirmValue) return;
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users/student/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                },
            });

            if (response.status === 200) {
                setStudents((prev) => prev.filter((item) => item._id != id))
                showNotification('success', 'Student deleted Successfully');
            } else {
                showNotification('error', 'Failed to delete student');
            }

        } catch (error) {
            console.error('Error deleting student:', error);
            showNotification('error', 'An error occurred while deleting the student');
        }

    };
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
                <div style={{ width: '100%'}} className="d-flex flex-row p-2 justify-content-center">
                    <button className='btn btn-primary' onClick={() => {setShowRegistrationForm(!showRegistrationForm); }}> <i className={`fa-solid fa-${showRegistrationForm ? 'close' : 'plus'} me-2`}></i> {showRegistrationForm ? 'Close Form' : 'Add Student'}</button>
                </div>
                
                <RegistrationPage display={showRegistrationForm ? 'flex' : 'none'} />

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Registration No.</th>
                            <th scope="col">Department</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {students?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.registrationNumber}</td>
                                <td>{item.department}</td>
                                <td className='d-flex flex-row'>
                                    <button className='mx-2 nav-link'><i className="fa-solid fa-eye" style={{ color: 'dimgray' }} onClick={() => { showProfile(item._id) }}></i></button>
                                    <button className='mx-2 nav-link'><i className="fa-solid fa-edit" style={{ color: 'dimgray' }}></i></button>
                                    <button className='mx-2 nav-link'><i className="fa-solid fa-trash" style={{ color: 'dimgray' }} onClick={() => { deleteStudent(item._id) }}></i></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <StudentProfile ref={profileRef} onClose={onClose} type='popup' isOpen={showProfilePopUp} />

            </div>
        </div>
    )
}
