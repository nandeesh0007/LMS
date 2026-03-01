import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
      setCourse(response.data);
    } catch (err) {
      setError('Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (index) => {
    setCurrentSection(index);
  };

  if (loading) {
    return <div className="loading">Loading course...</div>;
  }

  if (error || !course) {
    return <div className="error">{error || 'Course not found'}</div>;
  }

  return (
    <div className="course-detail">
      <header className="course-header">
        <div className="header-content">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span className="category">{course.category}</span>
            <span className="level">{course.level}</span>
            <span className="duration">{course.totalDuration}</span>
          </div>
        </div>
      </header>

      <main className="course-main">
        <div className="course-content">
          <div className="video-section">
            <div className="video-container">
              <iframe
                src={course.sections[currentSection]?.videoUrl}
                title={course.sections[currentSection]?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', height: '400px', borderRadius: '8px' }}
              />
              <div className="video-info">
                <h3>{course.sections[currentSection]?.title}</h3>
                <p>{course.sections[currentSection]?.description}</p>
                <span className="duration">{course.sections[currentSection]?.duration}</span>
              </div>
            </div>
          </div>

          <div className="sections-sidebar">
            <h3>Course Content</h3>
            <div className="sections-list">
              {course.sections.map((section, index) => (
                <div
                  key={index}
                  className={`section-item ${currentSection === index ? 'active' : ''}`}
                  onClick={() => handleSectionClick(index)}
                >
                  <div className="section-number">{index + 1}</div>
                  <div className="section-info">
                    <h4>{section.title}</h4>
                    <p>{section.description}</p>
                    <span className="section-duration">{section.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
