import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const AlumniProfile = forwardRef(({ type = 'page', isOpen = false, onClose }, ref) => {
    const [alumni, setAlumni] = useState(null);
    const { showNotification } = useNotification();
    const { user } = useAuth();

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
        <div className="bg-white shadow-lg m-1 rounded-lg overflow-y-hidden w-full max-w-3xl" 
             onClick={(e) => { e.stopPropagation() }} 
             style={type === 'page' ? {} : styling}>
            
            <h2 style={{ textAlign: 'center' }} className='mt-5 text-2xl font-bold text-gray-800'>
                {type === 'page' ? '' : 'Alumni Profile'}
            </h2>

            <div className="overflow-hidden border-t">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left text-gray-600 font-semibold">Details</th>
                            <th className="p-4 text-left text-gray-600 font-semibold">Value</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Username</td>
                            <td className="p-4 text-gray-900">{alumni?.username}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Email</td>
                            <td className="p-4 text-gray-900">{alumni?.email}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Name</td>
                            <td className="p-4 text-gray-900">{alumni?.name}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Graduation Year</td>
                            <td className="p-4 text-gray-900">{alumni?.graduationYear}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Department</td>
                            <td className="p-4 text-gray-900">{alumni?.department}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Current Job</td>
                            <td className="p-4 text-gray-900">{alumni?.currentJob || 'N/A'}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">Company</td>
                            <td className="p-4 text-gray-900">{alumni?.company || 'N/A'}</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-700">LinkedIn</td>
                            <td className="p-4 text-blue-500 hover:underline">
                                {alumni?.linkedIn ? (
                                    <a href={alumni.linkedIn} target="_blank" rel="noopener noreferrer">
                                        {alumni.linkedIn}
                                    </a>
                                ) : 'N/A'}
                            </td>
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
