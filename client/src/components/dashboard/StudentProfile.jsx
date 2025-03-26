import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const StudentProfile = forwardRef(({ type = 'page', isOpen = false, onClose }, ref) => {
    const [student, setStudent] = useState(null);
    const { showNotification } = useNotification();
    const { user } = useAuth();

    const fetchStudentProfile = async (id = null) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/student/get/${id != null ? id : user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
            );
            setStudent(response.data.studentDetails);
        } catch (error) {
            console.error('Failed to fetch student profile', error);
            showNotification('error', 'Failed to fetch student profile');
        }
    };

    // Expose the fetch function to the parent using forwardRef
    useImperativeHandle(ref, () => ({
        fetchStudent: fetchStudentProfile
    }));

    const styling = {
        position: "fixed",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '90vh',
        overflowY: 'scroll !important',
        width: '70vw'
    }

    const overlayStyling = {
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: '30'
    }

    useEffect(() => {
        if (type == 'page') {
            fetchStudentProfile();
        }
    }, []);

    const profileContent = (
        <div className="bg-white shadow-lg m-1 rounded-lg overflow-y-hidden w-full max-w-3xl" onClick={(e) => { e.stopPropagation() }} style={type === 'page' ? {} : styling}>
            <h2 style={{ textAlign: 'center' }} className='mt-5'>
                {type === 'page' ? '' : 'Student Profile'}
            </h2>

            <div className="overflow-hidden border-t">
            <table class="table">
        <thead>
          <tr>
            <th scope="col">Details</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{student?.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{student?.email}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{student?.name}</td>
          </tr>
          <tr>
            <td>Registration Number</td>
            <td>{student?.registrationNumber}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{student?.department}</td>
          </tr>
          <tr>
            <td>Joining Year</td>
            <td>{student?.joiningYear}</td>
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

export default StudentProfile;
