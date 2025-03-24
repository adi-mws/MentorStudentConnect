import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ForumCard = ({ post }) => {
    const navigate = useNavigate();
    return (
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4 transition-transform hover:shadow-lg hover-translate-up" style={{ transition: "0.3s" }}>
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3" style={{color: 'var(--primary-color)'}}>{post.title}</h5>
  
          <p className="card-text text-secondary" style={{ maxHeight: "90px", overflow: "hidden", textOverflow: "ellipsis" }}>
            {post.content}
          </p>
  
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-user-circle me-2 text-muted"></i>
              <span className="text-muted">{post.author}</span>
            </div>
  
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-clock me-1 text-muted"></i>
              <span className="text-muted">{new Date(post.createdAt).toDateString()}</span>
            </div>
          </div>
  
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-heart me-2 text-muted"></i>
              <span className="text-muted">{post.likes} Likes</span>
            </div>
  
          {/* <h5 className="m-0"><i className="fa-solid fa-comments me-2"></i>Discussion Chat</h5> */}
          <button className="btn btn-primary btn-md px-4" onClick={() => {navigate('/dashboard/discussions/1')}}>Read More →</button>
          </div>
        </div>
      </div>
    );
};

export default function Discussions() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setPosts([
            {
                "title": "Tips for Cracking Technical Interviews",
                "content": "Here are some tips to crack technical interviews: Practice coding daily, review data structures and algorithms, and do mock interviews.",
                "author": "65e2a7c9f1b4c5d09a12e5a1",
                "createdAt": "2025-03-20T10:30:00Z",
                "likes": 20
            },
            {
                "title": "Best Backend Frameworks in 2025",
                "content": "Node.js and Django continue to dominate the backend development space. Nest.js and FastAPI are also gaining popularity.",
                "author": "65e2a7c9f1b4c5d09a12e5a2",
                "createdAt": "2025-03-21T12:00:00Z",
                "likes": 50
            },
            {
                "title": "Top 10 React Libraries for Modern UI",
                "content": "Some of the top React libraries include Tailwind CSS, Zustand, React Query, Shadcn/ui, and Framer Motion.",
                "author": "65e2a7c9f1b4c5d09a12e5a3",
                "createdAt": "2025-03-22T14:45:00Z",
                "comments": 8
            },
            {
                "title": "How to Prepare for a Data Science Role?",
                "content": "Learn Python, SQL, and machine learning fundamentals. Work on projects and practice problem-solving on platforms like LeetCode.",
                "author": "65e2a7c9f1b4c5d09a12e5a4",
                "createdAt": "2025-03-23T09:15:00Z",
                "comments": 6
            },
            {
                "title": "Is Web Development Still in Demand?",
                "content": "Yes! With growing online businesses, skilled web developers are still in high demand. MERN stack and Next.js are trending.",
                "author": "65e2a7c9f1b4c5d09a12e5a5",
                "createdAt": "2025-03-24T16:30:00Z",
                "comments": 13
            }
        ]
        )
    }, []);



    return (
        <div className='Discussions'>

            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/create-post" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Create Post
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <ForumCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
