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
let courses = [];

// Initialize with working courses
courses = [
  {
    id: '1',
    title: 'Java Programming for Beginners',
    description: 'Learn Java programming from scratch with hands-on examples.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/eIrMbAQU34w/maxresdefault.jpg',
    totalDuration: '8 hours',
    sections: [
      {
        title: 'Introduction to Java',
        description: 'Get started with Java programming basics.',
        videoUrl: 'https://www.youtube.com/watch?v=eIrMbAQU34w',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Variables and Data Types',
        description: 'Understanding variables and data types.',
        videoUrl: 'https://www.youtube.com/watch?v=7CfbYx2kjyU',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Control Flow',
        description: 'Learn about if-else and loops.',
        videoUrl: 'https://www.youtube.com/watch?v=kjC1vjkqk0g',
        duration: '50 min',
        order: 3
      },
      {
        title: 'Arrays',
        description: 'Working with arrays in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=G1Q_7A_3M2c',
        duration: '45 min',
        order: 4
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Understanding OOP concepts.',
        videoUrl: 'https://www.youtube.com/watch?v=pSiI3ToJ1Bk',
        duration: '60 min',
        order: 5
      },
      {
        title: 'Exception Handling',
        description: 'Learn error handling.',
        videoUrl: 'https://www.youtube.com/watch?v=2l22_3J1o3E',
        duration: '35 min',
        order: 6
      },
      {
        title: 'File I/O',
        description: 'Reading and writing files.',
        videoUrl: 'https://www.youtube.com/watch?v=8P7e-9Lia70',
        duration: '40 min',
        order: 7
      },
      {
        title: 'Collections',
        description: 'Working with collections.',
        videoUrl: 'https://www.youtube.com/watch?v=8Zniumd9JLQ',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Multithreading',
        description: 'Introduction to multithreading.',
        videoUrl: 'https://www.youtube.com/watch?v=Y4-XA5JgQpM',
        duration: '50 min',
        order: 9
      },
      {
        title: 'Lambda Expressions',
        description: 'Functional programming in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=2j5NK9p7rOc',
        duration: '30 min',
        order: 10
      }
    ]
  },
  {
    id: '2',
    title: 'Python Programming Complete Course',
    description: 'Master Python programming from basics to advanced.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    totalDuration: '10 hours',
    sections: [
      {
        title: 'Python Introduction',
        description: 'Getting started with Python.',
        videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        duration: '40 min',
        order: 1
      },
      {
        title: 'Python Basics',
        description: 'Understanding Python syntax.',
        videoUrl: 'https://www.youtube.com/watch?v=Y8Tko2YC5hA',
        duration: '45 min',
        order: 2
      },
      {
        title: 'Data Structures',
        description: 'Lists, tuples, dictionaries.',
        videoUrl: 'https://www.youtube.com/watch?v=8extk7x-1s0',
        duration: '50 min',
        order: 3
      },
      {
        title: 'Control Flow',
        description: 'Conditional statements and loops.',
        videoUrl: 'https://www.youtube.com/watch?v=DZwmZ8Usvnk',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Functions',
        description: 'Creating and using functions.',
        videoUrl: 'https://www.youtube.com/watch?v=ZDa-Z5JzRgM',
        duration: '60 min',
        order: 5
      },
      {
        title: 'File Handling',
        description: 'Reading and writing files.',
        videoUrl: 'https://www.youtube.com/watch?v=Uh2ebFW8O8M',
        duration: '35 min',
        order: 6
      },
      {
        title: 'Exception Handling',
        description: 'Error handling techniques.',
        videoUrl: 'https://www.youtube.com/watch?v=NIWwJbo-9_8',
        duration: '30 min',
        order: 7
      },
      {
        title: 'Modules',
        description: 'Working with modules.',
        videoUrl: 'https://www.youtube.com/watch?v=CqvZ3vGoGs0',
        duration: '40 min',
        order: 8
      },
      {
        title: 'Web Development',
        description: 'Building web apps with Flask.',
        videoUrl: 'https://www.youtube.com/watch?v=Z1RdNhVxRzY',
        duration: '70 min',
        order: 9
      },
      {
        title: 'Data Analysis',
        description: 'Introduction to Pandas.',
        videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: '65 min',
        order: 10
      }
    ]
  },
  {
    id: '3',
    title: 'Web Development with HTML & CSS',
    description: 'Learn to build beautiful websites.',
    category: 'Web Development',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/mU6anWqZJjU/maxresdefault.jpg',
    totalDuration: '6 hours',
    sections: [
      {
        title: 'HTML5 Fundamentals',
        description: 'Introduction to HTML5.',
        videoUrl: 'https://www.youtube.com/watch?v=mU6anWqZJjU',
        duration: '45 min',
        order: 1
      },
      {
        title: 'HTML Forms',
        description: 'Creating forms.',
        videoUrl: 'https://www.youtube.com/watch?v=f5F7gv4HE1k',
        duration: '40 min',
        order: 2
      },
      {
        title: 'CSS3 Basics',
        description: 'Introduction to CSS3.',
        videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
        duration: '50 min',
        order: 3
      },
      {
        title: 'CSS Layouts',
        description: 'Layouts and positioning.',
        videoUrl: 'https://www.youtube.com/watch?v=k32VoKqKvRI',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Responsive Design',
        description: 'Making websites responsive.',
        videoUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
        duration: '45 min',
        order: 5
      },
      {
        title: 'CSS Grid',
        description: 'Advanced CSS Grid.',
        videoUrl: 'https://www.youtube.com/watch?v=EOv8xHJJHOo',
        duration: '40 min',
        order: 6
      },
      {
        title: 'Animations',
        description: 'CSS animations.',
        videoUrl: 'https://www.youtube.com/watch?v=LaSaypFQ85s',
        duration: '35 min',
        order: 7
      },
      {
        title: 'Bootstrap',
        description: 'Bootstrap framework.',
        videoUrl: 'https://www.youtube.com/watch?v=F2mw9xv2bYI',
        duration: '50 min',
        order: 8
      },
      {
        title: 'Portfolio Project',
        description: 'Build a portfolio.',
        videoUrl: 'https://www.youtube.com/watch?v=IXJ_dzdwM8w',
        duration: '60 min',
        order: 9
      }
    ]
  },
  {
    id: '4',
    title: 'JavaScript Modern Development',
    description: 'Master modern JavaScript with ES6+.',
    category: 'Web Development',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
    totalDuration: '12 hours',
    sections: [
      {
        title: 'ES6 Fundamentals',
        description: 'Modern JavaScript syntax.',
        videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: '50 min',
        order: 1
      },
      {
        title: 'Arrow Functions',
        description: 'Arrow functions and closures.',
        videoUrl: 'https://www.youtube.com/watch?v=n1vR2Dk2Gjw',
        duration: '45 min',
        order: 2
      },
      {
        title: 'Async JavaScript',
        description: 'Promises and async/await.',
        videoUrl: 'https://www.youtube.com/watch?v=Vkr0BfLduNs',
        duration: '60 min',
        order: 3
      },
      {
        title: 'DOM Manipulation',
        description: 'Interactive web pages.',
        videoUrl: 'https://www.youtube.com/watch?v=2Ivo7F4Q9lY',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Event Handling',
        description: 'Working with events.',
        videoUrl: 'https://www.youtube.com/watch?v=XVHrRnKQ_6Y',
        duration: '40 min',
        order: 5
      },
      {
        title: 'Fetch API',
        description: 'Making HTTP requests.',
        videoUrl: 'https://www.youtube.com/watch?v=cuEtnrL9-H0',
        duration: '50 min',
        order: 6
      },
      {
        title: 'React Fundamentals',
        description: 'Introduction to React.',
        videoUrl: 'https://www.youtube.com/watch?v=Ke90TjeitVS',
        duration: '70 min',
        order: 7
      },
      {
        title: 'State Management',
        description: 'Managing state in React.',
        videoUrl: 'https://www.youtube.com/watch?v=QH1zvR2eG0g',
        duration: '65 min',
        order: 8
      },
      {
        title: 'React Hooks',
        description: 'Modern React development.',
        videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
        duration: '60 min',
        order: 9
      },
      {
        title: 'React Project',
        description: 'Build a React app.',
        videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        duration: '80 min',
        order: 10
      }
    ]
  },
  {
    id: '5',
    title: 'React Native Mobile Development',
    description: 'Build mobile apps with React Native.',
    category: 'Mobile Development',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/0-S5a0e2ypw/maxresdefault.jpg',
    totalDuration: '10 hours',
    sections: [
      {
        title: 'React Native Intro',
        description: 'Getting started.',
        videoUrl: 'https://www.youtube.com/watch?v=0-S5a0e2ypw',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Setup Environment',
        description: 'Setting up development.',
        videoUrl: 'https://www.youtube.com/watch?v=qSR6d2v8_kI',
        duration: '50 min',
        order: 2
      },
      {
        title: 'Components',
        description: 'Creating components.',
        videoUrl: 'https://www.youtube.com/watch?v=9fhMj4JjBqM',
        duration: '55 min',
        order: 3
      },
      {
        title: 'Navigation',
        description: 'App navigation.',
        videoUrl: 'https://www.youtube.com/watch?v=sR2K1tP7Z9k',
        duration: '60 min',
        order: 4
      },
      {
        title: 'State and Props',
        description: 'Managing state.',
        videoUrl: 'https://www.youtube.com/watch?v=3xQJvnH8E8s',
        duration: '45 min',
        order: 5
      },
      {
        title: 'Lists',
        description: 'Working with lists.',
        videoUrl: 'https://www.youtube.com/watch?v=CBT1R8oG1eM',
        duration: '40 min',
        order: 6
      },
      {
        title: 'User Input',
        description: 'Forms and input.',
        videoUrl: 'https://www.youtube.com/watch?v=QkIcJ_n8bLc',
        duration: '50 min',
        order: 7
      },
      {
        title: 'API Integration',
        description: 'Connecting to APIs.',
        videoUrl: 'https://www.youtube.com/watch?v=OaI8-2GxqPA',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Device Features',
        description: 'Camera, GPS, etc.',
        videoUrl: 'https://www.youtube.com/watch?v=6jFX8WjXQFw',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Publishing Apps',
        description: 'Build and publish.',
        videoUrl: 'https://www.youtube.com/watch?v=8kK0d1t4F9E',
        duration: '70 min',
        order: 10
      }
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
      passwordHash: hashedPassword,
      enrolledCourses: [],
      progress: {}
    };
    users.push(user);

    // Create token
    const token = createToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        enrolledCourses: user.enrolledCourses,
        progress: user.progress
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
        email: user.email,
        enrolledCourses: user.enrolledCourses,
        progress: user.progress
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
  console.log(`Server running on port ${PORT}`);
  console.log('Simple server with working videos');
});
