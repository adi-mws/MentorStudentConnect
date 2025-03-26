import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const AlumniProfile = forwardRef(({ type = 'page', isOpen = false, onClose }, ref) => {
    const [alumni, setAlumni] = useState(null);
    const { showNotification } = useNotification();
    const { user } = useAuth();

    // Fetch Alumni Profile Function
    const fetchAlumniProfile = async (id = null) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/alumni/get/${id != null ? id : user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
            );
            setAlumni(response.data.alumniDetails);
        } catch (error) {
            console.error('Failed to fetch alumni profile', error);
            showNotification('error', 'Failed to fetch alumni profile');
        }
    };

    // Expose the fetch function to the parent using forwardRef
    useImperativeHandle(ref, () => ({
        fetchAlumni: fetchAlumniProfile
    }));

    const styling = {
        position: "fixed",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '90vh',
        overflowY: 'scroll !important',
        width: '70vw'
    };

    const overlayStyling = {
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: '30'
    };

    useEffect(() => {
        if (type === 'page') {
            fetchAlumniProfile();
        }
    }, []);

    const profileContent = (
        <div className="bg-white shadow-lg m-1 rounded-lg overflow-y-hidden w-full max-w-3xl" onClick={(e) => e.stopPropagation()} style={type === 'page' ? {} : styling}>
            <h2 style={{ textAlign: 'center' }} className='mt-5'>
                {type === 'page' ? '' : 'Alumni Profile'}
            </h2>

            <div className="overflow-hidden border-t">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Details</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{alumni?.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{alumni?.email}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{alumni?.name}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{alumni?.department}</td>
                        </tr>
                        <tr>
                            <td>Registration Number</td>
                            <td>{alumni?.registrationNumber}</td>
                        </tr>
                        <tr>
                            <td>Joining Year</td>
                            <td>{alumni?.joiningYear}</td>
                        </tr>
                        <tr>
                            <td>Graduation Year</td>
                            <td>{alumni?.graduationYear}</td>
                        </tr>
                        <tr>
                            <td>Organisation</td>
                            <td>{alumni?.organisation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <>
            {type === 'page' ? (
                <div className="max-w-4xl mx-auto my-10 p-8">{profileContent}</div>
            ) : (
                isOpen && (
                    <div className="popup-overlay" onClick={onClose} style={overlayStyling}>
                        {profileContent}
                    </div>
                )
            )}
        </>
    );
});

export default AlumniProfile;
