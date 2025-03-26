import { Link } from 'react-router-dom';
import { useState } from 'react';

const MentorCard = () => {
    const [allMentors, setAllMentors] = useState([
        {
            id: 1,
            name: 'Aditya Raj',
            expertise: 'Full Stack Developer',
            group: 'Tech Mastery Group',
            category: 'technology',
            students: 8,
            description: 'Boost your skills and knowledge by seeking mentorship from multiple experts. More mentors provide you with different strategies and approaches.'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            expertise: 'Data Scientist',
            group: 'AI Innovators',
            category: 'technology',
            students: 12,
            description: 'Get mentored by data science experts and enhance your machine learning and AI skills with practical insights.'
        },
        {
            id: 3,
            name: 'Rahul Verma',
            expertise: 'UI/UX Designer',
            group: 'Design Gurus',
            category: 'design',
            students: 5,
            description: 'Learn the latest UI/UX trends and best practices by collaborating with experienced design professionals.'
        },
        {
            id: 4,
            name: 'Piyush Verma',
            expertise: 'Project Manager',
            group: 'Business Leaders',
            category: 'business',
            students: 3,
            description: 'Master project management methodologies and leadership skills from industry veterans.'
        },
        {
            id: 5,
            name: 'Neha Gupta',
            expertise: 'Digital Marketing',
            group: 'Marketing Pros',
            category: 'business',
            students: 7,
            description: 'Learn cutting-edge digital marketing strategies and grow your online presence effectively.'
        },
        {
            id: 6,
            name: 'Ankit Patel',
            expertise: 'Cloud Architect',
            group: 'Tech Mastery Group',
            category: 'technology',
            students: 9,
            description: 'Deep dive into cloud technologies and infrastructure design with expert guidance.'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [groupSizeFilter, setGroupSizeFilter] = useState('');

    const filteredMentors = allMentors.filter(mentor => {

        const matchesSearch = 
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.group.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = 
            !categoryFilter || mentor.category === categoryFilter;
        
        let matchesGroupSize = true;
        if (groupSizeFilter === 'small') {
            matchesGroupSize = mentor.students <= 5;
        } else if (groupSizeFilter === 'medium') {
            matchesGroupSize = mentor.students > 5 && mentor.students <= 10;
        } else if (groupSizeFilter === 'large') {
            matchesGroupSize = mentor.students > 10;
        }
        
        return matchesSearch && matchesCategory && matchesGroupSize;
    });

    return (
        <div className="SearchMentors">
            <div className="container p-2">
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search mentors by name, expertise or group..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-primary" type="button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <select 
                            className="form-select" 
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="technology">Technology</option>
                            <option value="business">Business</option>
                            <option value="design">Design</option>
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <select 
                            className="form-select" 
                            value={groupSizeFilter}
                            onChange={(e) => setGroupSizeFilter(e.target.value)}
                        >
                            <option value="">Any Group Size</option>
                            <option value="small">Small (1-5 students)</option>
                            <option value="medium">Medium (6-10 students)</option>
                            <option value="large">Large (10+ students)</option>
                        </select>
                    </div>
                </div>

                {filteredMentors.length > 0 ? (
                    <div className="row">
                        {filteredMentors.map((mentor) => (
                            <div key={mentor.id} className="col-md-4 mb-4">
                                <div 
                                    className="card shadow-lg border-0 rounded-3 p-3 h-100" 
                                    style={{ maxWidth: '400px' }}
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
                                            <div className="d-flex align-items-center mt-1">
                                                <i className="fas fa-users me-1 text-muted small"></i>
                                                <small className="text-muted">{mentor.students} students</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="card-text">{mentor.description}</p>
                                    </div>

                                    <div className="d-flex justify-content-between mt-auto">
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
                ) : (
                    <div className="text-center py-5">
                        <h4 className="text-muted">No mentors found matching your criteria</h4>
                        <button 
                            className="btn btn-link text-primary mt-2"
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('');
                                setGroupSizeFilter('');
                            }}
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorCard;