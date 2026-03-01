import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { courseService } from '../services/courseService';
import './Dashboard.css';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string;
  enrolledStudents: string[];
  rating: number;
  totalDuration: string;
}

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const allCourses = await courseService.getAllCourses();
      setCourses(allCourses);
    } catch (err) {
      console.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogout = () => {
    logout();
    navigate('/register');
  };

  
  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Learning Management System</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        
        <section className="all-courses">
          <h2>All Courses</h2>
          <div className="course-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <img src={course.thumbnail} alt={course.title} />
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="category">{course.category}</span>
                    <span className="level">{course.level}</span>
                    <span className="duration">{course.totalDuration}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="continue-btn"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
