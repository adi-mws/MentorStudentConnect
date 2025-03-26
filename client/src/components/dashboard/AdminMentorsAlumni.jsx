import { Link } from 'react-router-dom';
import { useState } from 'react';

const AdminMentorsAlumni = () => {
    // Initial data
    const initialMentors = [
        {
            id: 1,
            name: 'Aditya Raj',
            expertise: 'Full Stack Developer',
            group: 'Tech Mastery Group',
            category: 'technology',
            students: 8,
            description: 'Boost your skills and knowledge by seeking mentorship from multiple experts. More mentors provide you with different strategies and approaches.',
            isAlumni: false
        },
        {
            id: 2,
            name: 'Priya Sharma',
            expertise: 'Data Scientist',
            group: 'AI Innovators',
            category: 'technology',
            students: 12,
            description: 'Get mentored by data science experts and enhance your machine learning and AI skills with practical insights.',
            isAlumni: false
        }
    ];

    const initialAlumni = [
        {
            id: 3,
            name: 'Rahul Verma',
            expertise: 'UI/UX Designer',
            group: 'Design Gurus',
            category: 'design',
            students: 0,
            description: 'Learn the latest UI/UX trends and best practices by collaborating with experienced design professionals.',
            isAlumni: true
        },
        {
            id: 4,
            name: 'Piyush Verma',
            expertise: 'Project Manager',
            group: 'Business Leaders',
            category: 'business',
            students: 0,
            description: 'Master project management methodologies and leadership skills from industry veterans.',
            isAlumni: true
        }
    ];

    const [mentors, setMentors] = useState(initialMentors);
    const [alumni, setAlumni] = useState(initialAlumni);
    const [mentorSearchTerm, setMentorSearchTerm] = useState('');
    const [alumniSearchTerm, setAlumniSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [groupSizeFilter, setGroupSizeFilter] = useState('');
    const [showPromoteConfirm, setShowPromoteConfirm] = useState(false);
    const [showDemoteConfirm, setShowDemoteConfirm] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    // Filter functions
    const filterMentors = () => {
        return mentors.filter(mentor => {
            const matchesSearch = 
                mentor.name.toLowerCase().includes(mentorSearchTerm.toLowerCase()) ||
                mentor.expertise.toLowerCase().includes(mentorSearchTerm.toLowerCase()) ||
                mentor.group.toLowerCase().includes(mentorSearchTerm.toLowerCase());
            
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
    };

    const filterAlumni = () => {
        return alumni.filter(alum => {
            return (
                alum.name.toLowerCase().includes(alumniSearchTerm.toLowerCase()) ||
                alum.expertise.toLowerCase().includes(alumniSearchTerm.toLowerCase()) ||
                alum.group.toLowerCase().includes(alumniSearchTerm.toLowerCase())
            );
        });
    };

    const filteredMentors = filterMentors();
    const filteredAlumni = filterAlumni();

    // Promotion/demotion functions with confirmation
    const handlePromoteClick = (alum) => {
        setSelectedPerson(alum);
        setShowPromoteConfirm(true);
    };

    const handleDemoteClick = (mentor) => {
        setSelectedPerson(mentor);
        setShowDemoteConfirm(true);
    };

    const confirmPromote = () => {
        if (selectedPerson) {
            setAlumni(alumni.filter(a => a.id !== selectedPerson.id));
            setMentors([...mentors, { ...selectedPerson, isAlumni: false, students: 5 }]);
            setShowPromoteConfirm(false);
            setSelectedPerson(null);
        }
    };

    const confirmDemote = () => {
        if (selectedPerson) {
            setMentors(mentors.filter(m => m.id !== selectedPerson.id));
            setAlumni([...alumni, { ...selectedPerson, isAlumni: true, students: 0 }]);
            setShowDemoteConfirm(false);
            setSelectedPerson(null);
        }
    };

    const cancelAction = () => {
        setShowPromoteConfirm(false);
        setShowDemoteConfirm(false);
        setSelectedPerson(null);
    };

    return (
        <div className="SearchMentors">
            <div className="container p-2">
                {/* Confirmation Modals */}
                {showPromoteConfirm && (
                    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Promotion</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to promote {selectedPerson?.name} to mentor status?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={cancelAction}>Cancel</button>
                                    <button className="btn btn-success" onClick={confirmPromote}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showDemoteConfirm && (
                    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Demotion</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to change {selectedPerson?.name} to alumni status?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={cancelAction}>Cancel</button>
                                    <button className="btn btn-warning" onClick={confirmDemote}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mentors Section */}
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>Current Mentors</h3>
                        <div className="d-flex gap-3">
                            <div className="input-group" style={{ width: '300px' }}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search mentors..."
                                    value={mentorSearchTerm}
                                    onChange={(e) => setMentorSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-outline-primary" type="button">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                            <select 
                                className="form-select" 
                                style={{ width: '150px' }}
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="design">Design</option>
                            </select>
                            <select 
                                className="form-select" 
                                style={{ width: '180px' }}
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
                    
                    <div className="row">
                        {filteredMentors.map((mentor) => (
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
                                            <div className="d-flex align-items-center mt-1">
                                                <i className="fas fa-users me-1 text-muted small"></i>
                                                <small className="text-muted">{mentor.students} students</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="card-text">{mentor.description}</p>
                                    </div>

                                    <div className="d-flex justify-content-between mt-3">
                                        <button 
                                            className="btn btn-warning px-3"
                                            onClick={() => handleDemoteClick(mentor)}
                                        >
                                            <i className="fas fa-user-graduate me-2"></i> Make Alumni
                                        </button>
                                        <Link to={`/mentor-details/${mentor.id}`} className="btn btn-outline-secondary">
                                            More Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alumni Section */}
                <div className="mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>Alumni</h3>
                        <div className="input-group" style={{ width: '300px' }}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search alumni..."
                                value={alumniSearchTerm}
                                onChange={(e) => setAlumniSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-primary" type="button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="row">
                        {filteredAlumni.map((alum) => (
                            <div key={alum.id} className="col-md-4 mb-4">
                                <div 
                                    className="card shadow-lg border-0 rounded-3 p-3" 
                                    style={{ maxWidth: '400px', height: '100%' }}
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/imgs/hero-image.png"
                                            alt="Alumni"
                                            className="rounded-circle me-3"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                        <div>
                                            <h5 className="mb-1">{alum.name}</h5>
                                            <p className="text-muted mb-1">{alum.expertise}</p>
                                            <small className="text-primary">{alum.group} (Alumni)</small>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="card-text">{alum.description}</p>
                                    </div>

                                    <div className="d-flex justify-content-between mt-3">
                                        <button 
                                            className="btn btn-success px-3"
                                            onClick={() => handlePromoteClick(alum)}
                                        >
                                            <i className="fas fa-user-tie me-2"></i> Make Mentor
                                        </button>
                                        <Link to={`/alumni-details/${alum.id}`} className="btn btn-outline-secondary">
                                            More Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMentorsAlumni;