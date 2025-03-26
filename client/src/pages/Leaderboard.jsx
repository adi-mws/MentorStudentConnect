import React, { useState, useEffect } from "react";

export default function Leaderboard() {
    const initialStudents = [
        { rank: 1, name: "Rohan Raj", score: 98 },
        { rank: 2, name: "Aditya Raj", score: 95 },
        { rank: 3, name: "Vishnu Verma", score: 92 },
        { rank: 4, name: "Alok Verma", score: 90 },
        { rank: 5, name: "Vedant Gupta", score: 88 },
        { rank: 6, name: "Vivek Coudhary", score: 87 },
        { rank: 7, name: "Gaurav Singh", score: 85 },
        { rank: 8, name: "Ashutosh Ranjan", score: 84 },
        { rank: 9, name: "Mantosh Kuman", score: 82 },
        { rank: 10, name: "Jaya Menon", score: 81 },
        { rank: 11, name: "Jiya Kumari", score: 79 },
        { rank: 12, name: "Lakshya Singh", score: 78 },
        { rank: 13, name: "Manish Yadav", score: 76 },
        { rank: 14, name: "Neha Kumari", score: 75 },
        { rank: 15, name: "Om Kashyap", score: 73 },
        { rank: 16, name: "Astitva Saraswati", score: 72 },
        { rank: 17, name: "Rahul Kumar", score: 70 },
        { rank: 18, name: "Sneha Kumari", score: 68 },
        { rank: 19, name: "Arpita Mishra", score: 66 },
        { rank: 20, name: "Vikram sinha", score: 65 },
      ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "asc" });

  useEffect(() => {
    let filtered = [...initialStudents];
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setStudents(filtered);
  }, [searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container py-4">

      <h2 className="text-center mb-4">Student Leaderboard</h2>
      
      <div className="mb-3" style={{ maxWidth: "300px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>
                <button
                  className="btn btn-link text-white text-decoration-none"
                  onClick={() => handleSort("rank")}
                >
                  Rank {sortConfig.key === "rank" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link text-white text-decoration-none"
                  onClick={() => handleSort("name")}
                >
                  Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link text-white text-decoration-none"
                  onClick={() => handleSort("score")}
                >
                  Score {sortConfig.key === "score" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rank}>
                <td>{student.rank}</td>
                <td>{student.name}</td>
                <td>{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}