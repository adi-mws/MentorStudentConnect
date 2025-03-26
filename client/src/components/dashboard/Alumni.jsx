import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import AlumniProfile from './AlumniProfile';
import AlumniRegistrationPage from '../../pages/StudentAlumniRegistrationPage';

export default function Alumni() {
    const { showNotification } = useNotification();
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProfilePopUp, setShowProfilePopUp] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const profileRef = useRef();

    // Fetch Alumni Data
    const fetchAlumni = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/alumni/get-All`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });

            if (response.status === 200) {
                setAlumni(response.data.alumni);
            } else {
                showNotification('error', 'Failed to load alumni data');
            }
        } catch (error) {
            console.error('Error fetching alumni:', error);
            showNotification('error', 'An error occurred while fetching alumni');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlumni();
    }, []);

    // Show Profile Popup
    const showProfile = (id) => {
        setShowProfilePopUp(true);
        profileRef.current?.fetchAlumni(id);
    };

    // Close Profile Popup
    const onClose = () => {
        setShowProfilePopUp(false);
    };

    // Delete Alumni
    const deleteAlumni = async (id) => {
        const alumniToDelete = alumni.find((item) => item._id === id);
        if (!alumniToDelete) return;

        const confirmValue = window.confirm(`Do you want to delete alumni ${alumniToDelete.name}?`);

        if (!confirmValue) return;

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users/alumni/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
            });

            if (response.status === 200) {
                setAlumni((prev) => prev.filter((item) => item._id !== id));
                showNotification('success', 'Alumni deleted successfully');
            } else {
                showNotification('error', 'Failed to delete alumni');
            }
        } catch (error) {
            console.error('Error deleting alumni:', error);
            showNotification('error', 'An error occurred while deleting alumni');
        }
    };

    return (
        <div className='Alumni'>
            <div className='p-2'>
                <div className="d-flex flex-row p-2 justify-content-center">
                    <button className='btn btn-primary' onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
                        <i className={`fa-solid fa-${showRegistrationForm ? 'close' : 'plus'} me-2`}></i> 
                        {showRegistrationForm ? 'Close Form' : 'Add Alumni'}
                    </button>
                </div>

                <AlumniRegistrationPage type='alumni' display={showRegistrationForm ? 'flex' : 'none'} />

                {loading ? (
                    <div className="text-center my-4">Loading alumni...</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Graduation Year</th>
                                <th scope="col">Department</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {alumni?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.graduationYear}</td>
                                    <td>{item.department}</td>
                                    <td className='d-flex flex-row'>
                                        <button className='mx-2 nav-link' onClick={() => showProfile(item._id)}>
                                            <i className="fa-solid fa-eye" style={{ color: 'dimgray' }}></i>
                                        </button>
                                        <button className='mx-2 nav-link'>
                                            <i className="fa-solid fa-edit" style={{ color: 'dimgray' }}></i>
                                        </button>
                                        <button className='mx-2 nav-link' onClick={() => deleteAlumni(item._id)}>
                                            <i className="fa-solid fa-trash" style={{ color: 'dimgray' }}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <AlumniProfile ref={profileRef} onClose={onClose} type='popup' isOpen={showProfilePopUp} />
            </div>
        </div>
    );
}
