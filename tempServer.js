const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const TempDatabase = require('./tempDatabase');

const app = express();
const db = new TempDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Sample courses data
const sampleCourses = [
  {
    title: 'Java Programming for Beginners',
    description: 'Learn Java programming from scratch with hands-on examples and projects.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/GoXwIVyNvX0/maxresdefault.jpg',
    totalDuration: '8 hours',
    sections: [
      {
        title: 'Introduction to Java',
        description: 'Get started with Java programming basics and environment setup.',
        videoUrl: 'https://www.youtube.com/watch?v=GoXwIVyNvX0',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Variables and Data Types',
        description: 'Understanding variables, data types, and type conversion in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=9BKAA7AIx_Q',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Control Flow Statements',
        description: 'Learn about if-else, switch, and loop statements in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=9ydoa0aXhL8',
        duration: '50 min',
        order: 3
      },
      {
        title: 'Arrays and Strings',
        description: 'Working with arrays and string manipulation in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=Lpfpno0CZcM',
        duration: '45 min',
        order: 4
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Understanding classes, objects, inheritance, and polymorphism.',
        videoUrl: 'https://www.youtube.com/watch?v=ZIaO_V2kP8U',
        duration: '60 min',
        order: 5
      },
      {
        title: 'Exception Handling',
        description: 'Learn how to handle errors and exceptions in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=SvQK_z6k3uM',
        duration: '35 min',
        order: 6
      },
      {
        title: 'File I/O Operations',
        description: 'Reading and writing files in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=5K5TWqfbn5w',
        duration: '40 min',
        order: 7
      },
      {
        title: 'Collections Framework',
        description: 'Working with List, Set, and Map interfaces.',
        videoUrl: 'https://www.youtube.com/watch?v=JJfqmlga_QQ',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Multithreading',
        description: 'Introduction to concurrent programming in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=U7fJP_7mS5Y',
        duration: '50 min',
        order: 9
      },
      {
        title: 'Lambda Expressions',
        description: 'Functional programming concepts in Java 8+.',
        videoUrl: 'https://www.youtube.com/watch?v=VT6XmYg5jwE',
        duration: '30 min',
        order: 10
      }
    ]
  },
  {
    title: 'Python Programming Complete Course',
    description: 'Master Python programming from basics to advanced concepts.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/YYXdXT2l-Gg/maxresdefault.jpg',
    totalDuration: '10 hours',
    sections: [
      {
        title: 'Python Introduction and Setup',
        description: 'Getting started with Python and setting up development environment.',
        videoUrl: 'https://www.youtube.com/watch?v=YYXdXT2l-Gg',
        duration: '40 min',
        order: 1
      },
      {
        title: 'Python Basics and Syntax',
        description: 'Understanding Python syntax, variables, and basic operations.',
        videoUrl: 'https://www.youtube.com/watch?v=eWRfhZUzrAc',
        duration: '45 min',
        order: 2
      },
      {
        title: 'Data Structures in Python',
        description: 'Lists, tuples, dictionaries, and sets in Python.',
        videoUrl: 'https://www.youtube.com/watch?v=8extk7x-1s0',
        duration: '50 min',
        order: 3
      },
      {
        title: 'Control Flow and Functions',
        description: 'Conditional statements, loops, and function definitions.',
        videoUrl: 'https://www.youtube.com/watch?v=DZwmZ8Usvnk',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, inheritance, and polymorphism in Python.',
        videoUrl: 'https://www.youtube.com/watch?v=ZDa-Z5JzRgM',
        duration: '60 min',
        order: 5
      },
      {
        title: 'File Handling and I/O',
        description: 'Reading and writing files in Python.',
        videoUrl: 'https://www.youtube.com/watch?v=Uh2ebFW8O8M',
        duration: '35 min',
        order: 6
      },
      {
        title: 'Exception Handling',
        description: 'Error handling and debugging techniques.',
        videoUrl: 'https://www.youtube.com/watch?v=NIWwJbo-9_8',
        duration: '30 min',
        order: 7
      },
      {
        title: 'Modules and Packages',
        description: 'Working with Python modules and creating packages.',
        videoUrl: 'https://www.youtube.com/watch?v=CqvZ3vGoGs0',
        duration: '40 min',
        order: 8
      },
      {
        title: 'Web Development with Flask',
        description: 'Building web applications using Flask framework.',
        videoUrl: 'https://www.youtube.com/watch?v=Z1RdNhVxRzY',
        duration: '70 min',
        order: 9
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Introduction to data manipulation with Pandas.',
        videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: '65 min',
        order: 10
      }
    ]
  },
  {
    title: 'Web Development with HTML & CSS',
    description: 'Learn to build beautiful websites with HTML5 and CSS3.',
    category: 'Web Development',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/kUMe1FH4CHE/maxresdefault.jpg',
    totalDuration: '6 hours',
    sections: [
      {
        title: 'HTML5 Fundamentals',
        description: 'Introduction to HTML5 and basic tags.',
        videoUrl: 'https://www.youtube.com/watch?v=kUMe1FH4CHE',
        duration: '45 min',
        order: 1
      },
      {
        title: 'HTML Forms and Input',
        description: 'Creating forms and handling user input.',
        videoUrl: 'https://www.youtube.com/watch?v=G3e-cpL7w1k',
        duration: '40 min',
        order: 2
      },
      {
        title: 'CSS3 Basics',
        description: 'Introduction to CSS3 and styling basics.',
        videoUrl: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
        duration: '50 min',
        order: 3
      },
      {
        title: 'CSS Layouts and Positioning',
        description: 'Understanding CSS layouts, flexbox, and positioning.',
        videoUrl: 'https://www.youtube.com/watch?v=k32VoKqKvRI',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Responsive Design',
        description: 'Making websites responsive with media queries.',
        videoUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
        duration: '45 min',
        order: 5
      },
      {
        title: 'CSS Grid Layout',
        description: 'Advanced layout techniques with CSS Grid.',
        videoUrl: 'https://www.youtube.com/watch?v=EOv8xHJJHOo',
        duration: '40 min',
        order: 6
      },
      {
        title: 'CSS Animations and Transitions',
        description: 'Adding animations and transitions to web pages.',
        videoUrl: 'https://www.youtube.com/watch?v=LaSaypFQ85s',
        duration: '35 min',
        order: 7
      },
      {
        title: 'Bootstrap Framework',
        description: 'Building responsive layouts with Bootstrap.',
        videoUrl: 'https://www.youtube.com/watch?v=F2mw9xv2bYI',
        duration: '50 min',
        order: 8
      },
      {
        title: 'Building a Portfolio Website',
        description: 'Create a complete portfolio website project.',
        videoUrl: 'https://www.youtube.com/watch?v=IXJ_dzdwM8w',
        duration: '60 min',
        order: 9
      }
    ]
  },
  {
    title: 'JavaScript Modern Development',
    description: 'Master modern JavaScript with ES6+ features and frameworks.',
    category: 'Web Development',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg',
    totalDuration: '12 hours',
    sections: [
      {
        title: 'JavaScript ES6 Fundamentals',
        description: 'Learn modern JavaScript syntax and features.',
        videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        duration: '50 min',
        order: 1
      },
      {
        title: 'Arrow Functions and Closures',
        description: 'Understanding arrow functions and closure concepts.',
        videoUrl: 'https://www.youtube.com/watch?v=hS_WqKyUZ8c',
        duration: '45 min',
        order: 2
      },
      {
        title: 'Async JavaScript and Promises',
        description: 'Master asynchronous programming with promises.',
        videoUrl: 'https://www.youtube.com/watch?v=Vkr0BfLduNs',
        duration: '60 min',
        order: 3
      },
      {
        title: 'DOM Manipulation',
        description: 'Interactive web page development with DOM.',
        videoUrl: 'https://www.youtube.com/watch?v=2Ivo7F4Q9lY',
        duration: '55 min',
        order: 4
      },
      {
        title: 'Event Handling',
        description: 'Working with events and event listeners.',
        videoUrl: 'https://www.youtube.com/watch?v=XVHrRnKQ_6Y',
        duration: '40 min',
        order: 5
      },
      {
        title: 'Fetch API and AJAX',
        description: 'Making HTTP requests and working with APIs.',
        videoUrl: 'https://www.youtube.com/watch?v=cuEtnrL9-H0',
        duration: '50 min',
        order: 6
      },
      {
        title: 'React Fundamentals',
        description: 'Introduction to React and component-based development.',
        videoUrl: 'https://www.youtube.com/watch?v=Ke90TjeitVS',
        duration: '70 min',
        order: 7
      },
      {
        title: 'State Management',
        description: 'Managing state in React applications.',
        videoUrl: 'https://www.youtube.com/watch?v=QH1zvR2eG0g',
        duration: '65 min',
        order: 8
      },
      {
        title: 'React Hooks',
        description: 'Modern React development with hooks.',
        videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Building a React App',
        description: 'Complete React application project.',
        videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        duration: '80 min',
        order: 10
      }
    ]
  },
  {
    title: 'React Native Mobile Development',
    description: 'Build mobile apps for iOS and Android with React Native.',
    category: 'Mobile Development',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/0-S5a0e2ypw/maxresdefault.jpg',
    totalDuration: '10 hours',
    sections: [
      {
        title: 'React Native Introduction',
        description: 'Getting started with React Native development.',
        videoUrl: 'https://www.youtube.com/watch?v=0-S5a0e2ypw',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Setup and Environment',
        description: 'Setting up React Native development environment.',
        videoUrl: 'https://www.youtube.com/watch?v=Gc8tcJ5l6FM',
        duration: '50 min',
        order: 2
      },
      {
        title: 'Components and Styling',
        description: 'Creating and styling React Native components.',
        videoUrl: 'https://www.youtube.com/watch?v=9fhMj4JjBqM',
        duration: '55 min',
        order: 3
      },
      {
        title: 'Navigation',
        description: 'Implementing navigation in React Native apps.',
        videoUrl: 'https://www.youtube.com/watch?v=sR2K1tP7Z9k',
        duration: '60 min',
        order: 4
      },
      {
        title: 'State and Props',
        description: 'Managing state and passing props in React Native.',
        videoUrl: 'https://www.youtube.com/watch?v=3xQJvnH8E8s',
        duration: '45 min',
        order: 5
      },
      {
        title: 'Lists and ScrollView',
        description: 'Working with lists and scrollable content.',
        videoUrl: 'https://www.youtube.com/watch?v=CBT1R8oG1eM',
        duration: '40 min',
        order: 6
      },
      {
        title: 'Handling User Input',
        description: 'Forms and user input handling.',
        videoUrl: 'https://www.youtube.com/watch?v=QkIcJ_n8bLc',
        duration: '50 min',
        order: 7
      },
      {
        title: 'API Integration',
        description: 'Connecting React Native apps to APIs.',
        videoUrl: 'https://www.youtube.com/watch?v=OaI8-2GxqPA',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Device Features',
        description: 'Accessing camera, GPS, and other device features.',
        videoUrl: 'https://www.youtube.com/watch?v=6jFX8WjXQFw',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Publishing Apps',
        description: 'Building and publishing React Native apps.',
        videoUrl: 'https://www.youtube.com/watch?v=8kK0d1t4F9E',
        duration: '70 min',
        order: 10
      }
    ]
  },
  {
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    category: 'Backend Development',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/Oe421APjezM/maxresdefault.jpg',
    totalDuration: '11 hours',
    sections: [
      {
        title: 'Node.js Fundamentals',
        description: 'Introduction to Node.js and event-driven programming.',
        videoUrl: 'https://www.youtube.com/watch?v=Oe421APjezM',
        duration: '50 min',
        order: 1
      },
      {
        title: 'NPM and Package Management',
        description: 'Working with NPM and managing dependencies.',
        videoUrl: 'https://www.youtube.com/watch?v=KGjR4JxJQqg',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Express.js Framework',
        description: 'Building web applications with Express.',
        videoUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
        duration: '55 min',
        order: 3
      },
      {
        title: 'RESTful APIs',
        description: 'Designing and building RESTful APIs.',
        videoUrl: 'https://www.youtube.com/watch?v=S-ce1Bfj7WU',
        duration: '60 min',
        order: 4
      },
      {
        title: 'Database Integration',
        description: 'Connecting Node.js with MongoDB and SQL databases.',
        videoUrl: 'https://www.youtube.com/watch?v=vKJpN5lE_aA',
        duration: '65 min',
        order: 5
      },
      {
        title: 'Authentication and Security',
        description: 'Implementing authentication and securing APIs.',
        videoUrl: 'https://www.youtube.com/watch?v=6nsqP1u2YtE',
        duration: '70 min',
        order: 6
      },
      {
        title: 'Middleware and Error Handling',
        description: 'Creating middleware and handling errors.',
        videoUrl: 'https://www.youtube.com/watch?v=fgTGADljAeg',
        duration: '45 min',
        order: 7
      },
      {
        title: 'File Upload and Storage',
        description: 'Handling file uploads and cloud storage.',
        videoUrl: 'https://www.youtube.com/watch?v=m_yYzKx5ypg',
        duration: '50 min',
        order: 8
      },
      {
        title: 'Real-time Applications',
        description: 'Building real-time apps with Socket.io.',
        videoUrl: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Deployment and Scaling',
        description: 'Deploying Node.js applications and scaling.',
        videoUrl: 'https://www.youtube.com/watch?v=R5Xk2n2Gxjg',
        duration: '55 min',
        order: 10
      }
    ]
  },
  {
    title: 'DevOps and Cloud Computing',
    description: 'Learn DevOps practices and cloud deployment strategies.',
    category: 'DevOps',
    level: 'Advanced',
    thumbnail: 'https://img.youtube.com/vi=3c-iBn72dEU/maxresdefault.jpg',
    totalDuration: '13 hours',
    sections: [
      {
        title: 'DevOps Introduction',
        description: 'Understanding DevOps culture and practices.',
        videoUrl: 'https://www.youtube.com/watch?v=3c-iBn72dEU',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Version Control with Git',
        description: 'Advanced Git techniques and collaboration.',
        videoUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        duration: '50 min',
        order: 2
      },
      {
        title: 'CI/CD Pipelines',
        description: 'Building continuous integration and deployment.',
        videoUrl: 'https://www.youtube.com/watch?v=rdI9NQ6y5pQ',
        duration: '60 min',
        order: 3
      },
      {
        title: 'Docker Fundamentals',
        description: 'Containerization with Docker.',
        videoUrl: 'https://www.youtube.com/watch?v=pTFZFxdM8OQ',
        duration: '70 min',
        order: 4
      },
      {
        title: 'Kubernetes Basics',
        description: 'Orchestration with Kubernetes.',
        videoUrl: 'https://www.youtube.com/watch?v=X48VuDVWW0I',
        duration: '80 min',
        order: 5
      },
      {
        title: 'AWS Cloud Services',
        description: 'Working with Amazon Web Services.',
        videoUrl: 'https://www.youtube.com/watch?v=gyS9Qp2hNqE',
        duration: '75 min',
        order: 6
      },
      {
        title: 'Monitoring and Logging',
        description: 'Application monitoring and logging strategies.',
        videoUrl: 'https://www.youtube.com/watch?v=8nN_pE9k2I8',
        duration: '55 min',
        order: 7
      },
      {
        title: 'Infrastructure as Code',
        description: 'Terraform and infrastructure automation.',
        videoUrl: 'https://www.youtube.com/watch?v=l5k1X9b5xJ8',
        duration: '65 min',
        order: 8
      },
      {
        title: 'Security Best Practices',
        description: 'Securing cloud infrastructure and applications.',
        videoUrl: 'https://www.youtube.com/watch?v=7V3a_x6i7eE',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Performance Optimization',
        description: 'Optimizing cloud applications for performance.',
        videoUrl: 'https://www.youtube.com/watch?v=9hQF3v9S2dE',
        duration: '70 min',
        order: 10
      }
    ]
  },
  {
    title: 'Blockchain Development',
    description: 'Learn blockchain technology and cryptocurrency development.',
    category: 'Blockchain',
    level: 'Advanced',
    thumbnail: 'https://img.youtube.com/vi=SSo_EIwHSd4/maxresdefault.jpg',
    totalDuration: '14 hours',
    sections: [
      {
        title: 'Blockchain Fundamentals',
        description: 'Understanding blockchain technology and cryptography.',
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
        duration: '60 min',
        order: 1
      },
      {
        title: 'Smart Contracts',
        description: 'Introduction to smart contracts and Solidity.',
        videoUrl: 'https://www.youtube.com/watch?v=IPAdwrK-6YQ',
        duration: '70 min',
        order: 2
      },
      {
        title: 'Ethereum Development',
        description: 'Building decentralized applications on Ethereum.',
        videoUrl: 'https://www.youtube.com/watch?v=CoMxKGSv390',
        duration: '80 min',
        order: 3
      },
      {
        title: 'Web3.js Integration',
        description: 'Connecting web applications to blockchain.',
        videoUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbAQ',
        duration: '65 min',
        order: 4
      },
      {
        title: 'DeFi Applications',
        description: 'Building decentralized finance applications.',
        videoUrl: 'https://www.youtube.com/watch?v=5J2m5JkCQ-A',
        duration: '75 min',
        order: 5
      },
      {
        title: 'NFT Development',
        description: 'Creating and trading NFTs.',
        videoUrl: 'https://www.youtube.com/watch?v=Mq3hXJ2hF3U',
        duration: '70 min',
        order: 6
      },
      {
        title: 'Token Economics',
        description: 'Understanding tokenomics and token design.',
        videoUrl: 'https://www.youtube.com/watch?v=5kC8k5J1h6g',
        duration: '60 min',
        order: 7
      },
      {
        title: 'Security Audits',
        description: 'Security best practices for smart contracts.',
        videoUrl: 'https://www.youtube.com/watch?v=7K2Qx5l3L8g',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Layer 2 Solutions',
        description: 'Understanding Layer 2 scaling solutions.',
        videoUrl: 'https://www.youtube.com/watch?v=3m4K9J0M2pE',
        duration: '65 min',
        order: 9
      },
      {
        title: 'Building a DApp',
        description: 'Complete decentralized application project.',
        videoUrl: 'https://www.youtube.com/watch?v=8mH2XJ2p3kQ',
        duration: '90 min',
        order: 10
      }
    ]
  },
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity skills and ethical hacking.',
    category: 'Security',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi=inWWhr5tnEA/maxresdefault.jpg',
    totalDuration: '12 hours',
    sections: [
      {
        title: 'Introduction to Cybersecurity',
        description: 'Understanding cybersecurity landscape and threats.',
        videoUrl: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
        duration: '50 min',
        order: 1
      },
      {
        title: 'Network Security',
        description: 'Network protocols and security fundamentals.',
        videoUrl: 'https://www.youtube.com/watch?v=3kQX8J2p5kE',
        duration: '60 min',
        order: 2
      },
      {
        title: 'Cryptography Basics',
        description: 'Understanding encryption and cryptographic principles.',
        videoUrl: 'https://www.youtube.com/watch?v=9hQF3v9S2dE',
        duration: '55 min',
        order: 3
      },
      {
        title: 'Web Application Security',
        description: 'Common web vulnerabilities and prevention.',
        videoUrl: 'https://www.youtube.com/watch?v=7K2Qx5l3L8g',
        duration: '65 min',
        order: 4
      },
      {
        title: 'Ethical Hacking',
        description: 'Introduction to ethical hacking and penetration testing.',
        videoUrl: 'https://www.youtube.com/watch?v=5kC8k5J1h6g',
        duration: '70 min',
        order: 5
      },
      {
        title: 'Security Tools',
        description: 'Using cybersecurity tools and frameworks.',
        videoUrl: 'https://www.youtube.com/watch?v=3m4K9J0M2pE',
        duration: '60 min',
        order: 6
      },
      {
        title: 'Incident Response',
        description: 'Handling security incidents and breaches.',
        videoUrl: 'https://www.youtube.com/watch?v=8mH2XJ2p3kQ',
        duration: '55 min',
        order: 7
      },
      {
        title: 'Compliance and Regulations',
        description: 'Understanding security compliance frameworks.',
        videoUrl: 'https://www.youtube.com/watch?v=2j5NK9p7rOc',
        duration: '50 min',
        order: 8
      },
      {
        title: 'Security Architecture',
        description: 'Designing secure systems and architectures.',
        videoUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbAQ',
        duration: '65 min',
        order: 9
      },
      {
        title: 'Security Project',
        description: 'Complete cybersecurity project.',
        videoUrl: 'https://www.youtube.com/watch?v=5J2m5JkCQ-A',
        duration: '80 min',
        order: 10
      }
    ]
  }
];

// Initialize courses if they don't exist
if (db.getAllCourses().length === 0) {
  sampleCourses.forEach(course => db.addCourse(course));
  console.log('Sample courses initialized');
}

// JWT Secret
const JWT_SECRET = 'your-secret-key-here';

// Helper function to create token
const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Helper function to verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  req.userId = decoded.userId;
  next();
};

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = db.findUserByEmail(email) || db.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = db.createUser({
      username,
      email,
      passwordHash: hashedPassword
    });

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
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = db.findUserByEmail(email);
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
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all courses
app.get('/api/courses', (req, res) => {
  try {
    const courses = db.getAllCourses();
    // Remove sections from course list for dashboard
    const coursesWithoutSections = courses.map(course => ({
      ...course,
      sections: undefined
    }));
    res.json(coursesWithoutSections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
app.get('/api/courses/:id', (req, res) => {
  try {
    const course = db.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll in course
app.post('/api/courses/:id/enroll', authMiddleware, (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.userId;

    const success = db.enrollUserInCourse(userId, courseId);
    if (success) {
      res.json({ message: 'Successfully enrolled in course' });
    } else {
      res.status(400).json({ message: 'Failed to enroll' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get enrolled courses
app.get('/api/courses/enrolled/my-courses', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const enrolledCourses = db.getEnrolledCourses(userId);
    res.json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Using temporary file-based database');
});
