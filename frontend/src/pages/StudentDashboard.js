import React, { useState, useEffect } from 'react';
import './styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [student, setStudent] = useState({
    name: '',
    id: '',
    marks: 0,
  });
  const [isEligible, setIsEligible] = useState(null);

  useEffect(() => {
    // Fetch available scholarships (universities)
    const fetchScholarships = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scholarships`);
        if (!response.ok) {
          throw new Error('Failed to fetch scholarships');
        }
        const data = await response.json();
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, []);

  const handleEligibilityCheck = () => {
    if (student.marks > 85) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  const handleApply = (university) => {
    alert(`Application submitted to ${university.name}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Student Eligibility Test</h1>

        <div className="student-info">
          <div className="student-info-item">
            <label>Name:</label>
            <input
              type="text"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              placeholder="Enter Name"
            />
          </div>
          <div className="student-info-item">
            <label>ID:</label>
            <input
              type="text"
              value={student.id}
              onChange={(e) => setStudent({ ...student, id: e.target.value })}
              placeholder="Enter ID"
            />
          </div>
          <div className="student-info-item">
            <label>Marks:</label>
            <input
              type="number"
              value={student.marks}
              onChange={(e) => setStudent({ ...student, marks: e.target.value })}
              placeholder="Enter Marks"
            />
          </div>

          <button className="check-eligibility" onClick={handleEligibilityCheck}>
            Check Eligibility
          </button>

          {isEligible !== null && (
            <p className={`eligibility-status ${isEligible ? 'eligible' : 'not-eligible'}`}>
              {isEligible ? 'You are eligible to apply!' : 'You are not eligible to apply.'}
            </p>
          )}
        </div>

        {isEligible && (
          <>
            <h1 className="dashboard-title">Available Scholarships</h1>
            <p className="dashboard-subtitle">Explore and apply for scholarships that match your interests and needs.</p>

            <div className="scholarship-list">
              {scholarships.map((scholarship, index) => (
                <div
                  key={scholarship.id}
                  className={`scholarship-card colorful-card ${index > 2 ? 'second-row' : ''}`}
                >
                  <h3>{scholarship.name}</h3>
                  <p>{scholarship.description.substring(0, 60)}...</p>
                  {/* Removed Amount Option */}
                  <button className="apply-button" onClick={() => handleApply(scholarship)}>
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
