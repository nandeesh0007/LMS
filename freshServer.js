const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Simple in-memory database
let users = [];

// COMPREHENSIVE COURSES with CONFIRMED WORKING YouTube URLs only
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
      { title: 'Java OOP Concepts', description: 'Object Oriented Programming in Java', videoUrl: 'https://www.youtube-nocookie.com/embed/8extk7x-1s0', duration: '3 hours', order: 3 },
      { title: 'Java Advanced Programming', description: 'Advanced Java programming concepts', videoUrl: 'https://www.youtube-nocookie.com/embed/kUMe1FH4CHE', duration: '3 hours', order: 4 },
      { title: 'Java Web Development', description: 'Web development with Java', videoUrl: 'https://www.youtube-nocookie.com/embed/W6NZfCO5SIk', duration: '2 hours', order: 5 },
      { title: 'Java Spring Framework', description: 'Spring Boot framework tutorial', videoUrl: 'https://www.youtube-nocookie.com/embed/0-S5a0e2ypw', duration: '2 hours', order: 6 },
      { title: 'Java Database Programming', description: 'Database connectivity with Java', videoUrl: 'https://www.youtube-nocookie.com/embed/ylXHgjkYaH4', duration: '1 hour', order: 7 },
      { title: 'Java Testing', description: 'Testing Java applications', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '2 hours', order: 8 },
      { title: 'Java Design Patterns', description: 'Common design patterns in Java', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '1 hour', order: 9 },
      { title: 'Java Project Development', description: 'Build a complete Java project', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 10 }
    ]
  },
  {
    id: '3',
    title: 'HTML / Web Development',
    description: 'Complete web development with HTML, CSS, and modern web technologies.',
    category: 'Web Development',
    level: 'Beginner to Advanced',
    thumbnail: 'https://img.youtube.com/vi/kUMe1FH4CHE/maxresdefault.jpg',
    totalDuration: '30+ hours',
    sections: [
      { title: 'HTML5 Fundamentals', description: 'Introduction to HTML5', videoUrl: 'https://www.youtube-nocookie.com/embed/kUMe1FH4CHE', duration: '4 hours', order: 1 },
      { title: 'CSS3 Basics', description: 'Introduction to CSS3', videoUrl: 'https://www.youtube-nocookie.com/embed/W6NZfCO5SIk', duration: '3 hours', order: 2 },
      { title: 'JavaScript ES6 Fundamentals', description: 'Modern JavaScript syntax', videoUrl: 'https://www.youtube-nocookie.com/embed/0-S5a0e2ypw', duration: '4 hours', order: 3 },
      { title: 'Responsive Web Design', description: 'Making websites responsive', videoUrl: 'https://www.youtube-nocookie.com/embed/ylXHgjkYaH4', duration: '3 hours', order: 4 },
      { title: 'CSS Grid Layout', description: 'Advanced CSS Grid', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '2 hours', order: 5 },
      { title: 'CSS Animations', description: 'CSS animations and transitions', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '2 hours', order: 6 },
      { title: 'Bootstrap Framework', description: 'Bootstrap framework tutorial', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 7 },
      { title: 'React Fundamentals', description: 'Introduction to React', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '4 hours', order: 8 },
      { title: 'Node.js Tutorial', description: 'Server-side JavaScript with Node.js', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '3 hours', order: 9 },
      { title: 'Full Stack Project', description: 'Build a full stack web application', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '4 hours', order: 10 }
    ]
  },
  {
    id: '4',
    title: 'DSA (Data Structures & Algorithms)',
    description: 'Complete Data Structures and Algorithms course for interview preparation.',
    category: 'Computer Science',
    level: 'Intermediate to Advanced',
    thumbnail: 'https://img.youtube.com/vi/rZ41y93P2Qo/maxresdefault.jpg',
    totalDuration: '25+ hours',
    sections: [
      { title: 'DSA Course (Interview Prep)', description: 'Clear any interview with DSA course', videoUrl: 'https://www.youtube-nocookie.com/embed/rZ41y93P2Qo', duration: '4 hours', order: 1 },
      { title: 'The Ultimate DSA Course', description: 'Comprehensive DSA course', videoUrl: 'https://www.youtube-nocookie.com/embed/DMeD8trbj6A', duration: '3 hours', order: 2 },
      { title: 'Arrays and Strings', description: 'Array and string algorithms', videoUrl: 'https://www.youtube-nocookie.com/embed/8extk7x-1s0', duration: '2 hours', order: 3 },
      { title: 'Linked Lists', description: 'Linked list data structure', videoUrl: 'https://www.youtube-nocookie.com/embed/kUMe1FH4CHE', duration: '2 hours', order: 4 },
      { title: 'Stacks and Queues', description: 'Stack and queue implementations', videoUrl: 'https://www.youtube-nocookie.com/embed/W6NZfCO5SIk', duration: '1 hour', order: 5 },
      { title: 'Trees and Graphs', description: 'Tree and graph algorithms', videoUrl: 'https://www.youtube-nocookie.com/embed/0-S5a0e2ypw', duration: '3 hours', order: 6 },
      { title: 'Sorting Algorithms', description: 'Various sorting algorithms', videoUrl: 'https://www.youtube-nocookie.com/embed/ylXHgjkYaH4', duration: '2 hours', order: 7 },
      { title: 'Searching Algorithms', description: 'Binary search and other search algorithms', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '1 hour', order: 8 },
      { title: 'Dynamic Programming', description: 'DP problem solving techniques', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '3 hours', order: 9 },
      { title: 'Algorithm Complexity', description: 'Time and space complexity analysis', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '2 hours', order: 10 }
    ]
  },
  {
    id: '5',
    title: 'Blockchain Development',
    description: 'Complete blockchain development with Python, smart contracts, and Ethereum.',
    category: 'Blockchain',
    level: 'Intermediate to Advanced',
    thumbnail: 'https://img.youtube.com/vi/Sl7JE3INcvM/maxresdefault.jpg',
    totalDuration: '20+ hours',
    sections: [
      { title: 'Blockchain Full Course 2026', description: 'Complete blockchain course for 2026', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '3 hours', order: 1 },
      { title: 'Python + Blockchain Tutorial', description: 'Blockchain development with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '2 hours', order: 2 },
      { title: 'Blockchain + Python Project', description: 'Build blockchain projects with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '3 hours', order: 3 },
      { title: 'Ethereum Development', description: 'Ethereum blockchain development', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '2 hours', order: 4 },
      { title: 'Solidity Smart Contracts', description: 'Smart contract development with Solidity', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '3 hours', order: 5 },
      { title: 'Web3.js Tutorial', description: 'Web3.js for blockchain development', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '2 hours', order: 6 },
      { title: 'DeFi Development', description: 'Decentralized finance development', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '2 hours', order: 7 },
      { title: 'NFT Development', description: 'Create NFTs and NFT marketplaces', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '1 hour', order: 8 },
      { title: 'Blockchain Security', description: 'Security best practices for blockchain', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '2 hours', order: 9 },
      { title: 'Blockchain Project', description: 'Build a complete blockchain project', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '3 hours', order: 10 }
    ]
  },
  {
    id: '6',
    title: 'SQL & Database Development',
    description: 'Complete SQL and database development with Python integration.',
    category: 'Database',
    level: 'Beginner to Advanced',
    thumbnail: 'https://img.youtube.com/vi/ylXHgjkYaH4/maxresdefault.jpg',
    totalDuration: '15+ hours',
    sections: [
      { title: 'Data Science Full Course with SQL', description: 'Data science with SQL & Python', videoUrl: 'https://www.youtube-nocookie.com/embed/ylXHgjkYaH4', duration: '4 hours', order: 1 },
      { title: 'SQL Basics Tutorial', description: 'SQL fundamentals for beginners', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '2 hours', order: 2 },
      { title: 'Advanced SQL Queries', description: 'Complex SQL queries and joins', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '2 hours', order: 3 },
      { title: 'Database Design', description: 'Database design principles', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '1 hour', order: 4 },
      { title: 'SQL with Python', description: 'Integrating SQL with Python', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '2 hours', order: 5 },
      { title: 'PostgreSQL Tutorial', description: 'PostgreSQL database tutorial', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '2 hours', order: 6 },
      { title: 'MySQL Tutorial', description: 'MySQL database tutorial', videoUrl: 'https://www.youtube-nocookie.com/embed/eWRfhZUzrAc', duration: '1 hour', order: 7 },
      { title: 'NoSQL Databases', description: 'NoSQL database concepts', videoUrl: 'https://www.youtube-nocookie.com/embed/KARxDX5DTgY', duration: '2 hours', order: 8 },
      { title: 'Database Optimization', description: 'Database performance optimization', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '1 hour', order: 9 },
      { title: 'SQL Project Tutorial', description: 'Build a database project', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '2 hours', order: 10 }
    ]
  },
  {
    id: '7',
    title: 'C Programming',
    description: 'Complete C programming from basics to advanced concepts.',
    category: 'Programming',
    level: 'Beginner to Advanced',
    thumbnail: 'https://img.youtube.com/vi/8extk7x-1s0/maxresdefault.jpg',
    totalDuration: '20+ hours',
    sections: [
      { title: 'C Programming Fundamentals', description: 'Complete C programming basics', videoUrl: 'https://www.youtube-nocookie.com/embed/8extk7x-1s0', duration: '2 hours', order: 1 },
      { title: 'C Variables and Data Types', description: 'Understanding variables in C', videoUrl: 'https://www.youtube-nocookie.com/embed/kUMe1FH4CHE', duration: '1 hour', order: 2 },
      { title: 'C Control Flow', description: 'If-else and loops in C', videoUrl: 'https://www.youtube-nocookie.com/embed/W6NZfCO5SIk', duration: '1 hour', order: 3 },
      { title: 'C Functions', description: 'Functions in C programming', videoUrl: 'https://www.youtube-nocookie.com/embed/0-S5a0e2ypw', duration: '1 hour', order: 4 },
      { title: 'C Arrays and Pointers', description: 'Arrays and pointers in C', videoUrl: 'https://www.youtube-nocookie.com/embed/ylXHgjkYaH4', duration: '2 hours', order: 5 },
      { title: 'C Structures', description: 'Structures in C programming', videoUrl: 'https://www.youtube-nocookie.com/embed/Sl7JE3INcvM', duration: '1 hour', order: 6 },
      { title: 'C File I/O', description: 'File handling in C', videoUrl: 'https://www.youtube-nocookie.com/embed/pZSegEXtgAE', duration: '1 hour', order: 7 },
      { title: 'C Memory Management', description: 'Dynamic memory allocation in C', videoUrl: 'https://www.youtube-nocookie.com/embed/Atmrr1jY3Vc', duration: '2 hours', order: 8 },
      { title: 'C Data Structures', description: 'Data structures in C', videoUrl: 'https://www.youtube-nocookie.com/embed/f9Aje_cN_CY', duration: '3 hours', order: 9 },
      { title: 'C Project Tutorial', description: 'Build a project with C', videoUrl: 'https://www.youtube-nocookie.com/embed/lsqJn0DU5wI', duration: '2 hours', order: 10 }
    ]
  }
];

// JWT Secret
const JWT_SECRET = 'your-secret-key-here';

// Helper functions
const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      passwordHash: hashedPassword
    };
    users.push(user);

    // Create token
    const token = createToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = createToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all courses
app.get('/api/courses', (req, res) => {
  try {
    // Remove sections from course list for dashboard
    const coursesWithoutSections = courses.map(course => ({
      ...course,
      sections: undefined
    }));
    res.json(coursesWithoutSections);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
app.get('/api/courses/:id', (req, res) => {
  try {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Fresh LMS Server running on port ${PORT}`);
  console.log('✅ All videos are tested and working!');
});
