import { Link } from 'react-router-dom';
import { useState } from 'react';

const MentorCard = () => {
    const [mentors, setMentors] = useState([
        {
            id: 1,
            name: 'Aditya Raj',
            expertise: 'Full Stack Developer',
            group: 'Tech Mastery Group',
            description: 'Boost your skills and knowledge by seeking mentorship from multiple experts. More mentors provide you with different strategies and approaches.'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            expertise: 'Data Scientist',
            group: 'AI Innovators',
            description: 'Get mentored by data science experts and enhance your machine learning and AI skills with practical insights.'
        },
        {
            id: 3,
            name: 'Rahul Verma',
            expertise: 'UI/UX Designer',
            group: 'Design Gurus',
            description: 'Learn the latest UI/UX trends and best practices by collaborating with experienced design professionals.'
        },
        {
            id: 4,
            name: 'Piyush Verma',
            expertise: 'Project Manager',
            group: 'Design Gurus',
            description: 'Learn the latest UI/UX trends and best practices by collaborating with experienced design professionals.'
        }
    ]);

    return (
        <div className="SearchMentors">
            <div className="container p-2">
                <div className="row">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="col-md-4 mb-4">
                            <div 
                                className="card shadow-lg border-0 rounded-3 p-3" 
                                style={{ maxWidth: '400px', height: '100%' }}
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src="/imgs/hero-image.png"
                                        alt="Mentor"
                                        className="rounded-circle me-3"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h5 className="mb-1">{mentor.name}</h5>
                                        <p className="text-muted mb-1">{mentor.expertise}</p>
                                        <small className="text-primary">{mentor.group}</small>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className="card-text">{mentor.description}</p>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <Link to="/dashboard/search-mentors" className="btn btn-primary px-4">
                                        <i className="fa-solid fa-plus me-2"></i> Add Mentor
                                    </Link>
                                    <Link to="/mentor-details" className="btn btn-outline-secondary">
                                        More Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorCard;
