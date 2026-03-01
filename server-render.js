const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LMS Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Public courses endpoint
app.get('/api/public-courses', (req, res) => {
  const courses = [
    {
      id: '1',
      title: 'Python (Beginner → Advanced)',
      description: 'Complete Python programming from beginner to advanced level with real-world projects.',
      category: 'Programming',
      level: 'Beginner to Advanced',
      thumbnail: 'https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg',
      totalDuration: '40+ hours',
      sections: [
        { title: 'Python Full Course for Beginners', description: 'Complete Python course by freeCodeCamp', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '4 hours', order: 1 },
        { title: 'Python Tutorial for Beginners', description: 'Full Python tutorial for beginners', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '2 hours', order: 2 },
        { title: 'Python Blockchain Project Course', description: 'Build blockchain projects with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '3 hours', order: 3 },
        { title: 'DSA Using Python', description: 'Data structures and algorithms with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 4 },
        { title: 'Python Course Comparisons', description: 'Compare different Python courses', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '1 hour', order: 5 },
        { title: 'Python Advanced Concepts', description: 'Advanced Python programming concepts', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '2 hours', order: 6 },
        { title: 'Python Web Development', description: 'Build web apps with Python frameworks', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '3 hours', order: 7 },
        { title: 'Python Data Science', description: 'Data science with Python libraries', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '4 hours', order: 8 },
        { title: 'Python Machine Learning', description: 'ML fundamentals with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 9 },
        { title: 'Python Project Tutorial', description: 'Build a complete Python project', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '3 hours', order: 10 }
      ]
    },
    {
      id: '2',
      title: 'Java (Beginner → Full)',
      description: 'Complete Java programming from basics to advanced with DSA and OOP concepts.',
      category: 'Programming',
      level: 'Beginner to Advanced',
      thumbnail: 'https://img.youtube.com/vi/rZ41y93P2Qo/maxresdefault.jpg',
      totalDuration: '35+ hours',
      sections: [
        { title: 'Java Tutorial for Beginners', description: 'Complete Java tutorial for beginners', videoUrl: 'https://www.youtube-nocookie.com/embed/rZ41y93P2Qo', duration: '4 hours', order: 1 },
        { title: 'DSA in Java', description: 'Clear DSA course for interviews', videoUrl: 'https://www.youtube-nocookie.com/embed/DMeD8trbj6A', duration: '4 hours', order: 2 },
        { title: 'Java Full Course', description: 'Complete Java programming course', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '5 hours', order: 3 },
        { title: 'Java OOP Concepts', description: 'Object-oriented programming in Java', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '3 hours', order: 4 },
        { title: 'Java Spring Boot', description: 'Build web apps with Spring Boot', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '4 hours', order: 5 },
        { title: 'Java Database Connectivity', description: 'Connect Java with databases', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 6 },
        { title: 'Java REST APIs', description: 'Build RESTful APIs with Java', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '3 hours', order: 7 },
        { title: 'Java Testing', description: 'Unit testing in Java', videoUrl: 'https://www.youtube-nocookie.com/embed/rZ41y93P2Qo', duration: '2 hours', order: 8 },
        { title: 'Java Advanced Topics', description: 'Advanced Java programming', videoUrl: 'https://www.youtube-nocookie.com/embed/DMeD8trbj6A', duration: '3 hours', order: 9 },
        { title: 'Java Project', description: 'Complete Java project', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '4 hours', order: 10 }
      ]
    }
  ];
  
  res.json({ 
    status: 'OK', 
    message: 'Public courses endpoint',
    data: courses,
    count: courses.length
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LMS Backend API is running',
    version: '1.0.0',
    endpoints: ['/health', '/api/public-courses']
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 LMS Backend running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`✅ API endpoint: http://localhost:${PORT}/api/public-courses`);
});
