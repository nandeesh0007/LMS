const mongoose = require('mongoose');
const Course = require('./models/Course');

// Sample course data with YouTube videos
const coursesData = [
  {
    title: 'Java Programming for Beginners',
    description: 'Learn Java programming from scratch with hands-on examples and projects.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/eIrMbAQU34w/maxresdefault.jpg',
    totalDuration: '8 hours',
    sections: [
      {
        title: 'Introduction to Java',
        description: 'Get started with Java programming basics and environment setup.',
        videoUrl: 'https://www.youtube.com/watch?v=eIrMbAQU34w',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Variables and Data Types',
        description: 'Understanding variables, data types, and type conversion in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=7CfbYx2kjyU',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Control Flow Statements',
        description: 'Learn about if-else, switch, and loop statements in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=kjC1vjkqk0g',
        duration: '50 min',
        order: 3
      },
      {
        title: 'Arrays and Strings',
        description: 'Working with arrays and string manipulation in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=G1Q_7A_3M2c',
        duration: '45 min',
        order: 4
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Understanding classes, objects, inheritance, and polymorphism.',
        videoUrl: 'https://www.youtube.com/watch?v=pSiI3ToJ1Bk',
        duration: '60 min',
        order: 5
      },
      {
        title: 'Exception Handling',
        description: 'Learn how to handle errors and exceptions in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=2l22_3J1o3E',
        duration: '35 min',
        order: 6
      },
      {
        title: 'File I/O Operations',
        description: 'Reading and writing files in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=8P7e-9Lia70',
        duration: '40 min',
        order: 7
      },
      {
        title: 'Collections Framework',
        description: 'Working with List, Set, and Map interfaces.',
        videoUrl: 'https://www.youtube.com/watch?v=8Zniumd9JLQ',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Multithreading',
        description: 'Introduction to concurrent programming in Java.',
        videoUrl: 'https://www.youtube.com/watch?v=Y4-XA5JgQpM',
        duration: '50 min',
        order: 9
      },
      {
        title: 'Lambda Expressions',
        description: 'Functional programming concepts in Java 8+.',
        videoUrl: 'https://www.youtube.com/watch?v=2j5NK9p7rOc',
        duration: '30 min',
        order: 10
      },
      {
        title: 'Building a Simple Application',
        description: 'Apply your knowledge to build a complete Java application.',
        videoUrl: 'https://www.youtube.com/watch?v=QjJe2dE8B8k',
        duration: '60 min',
        order: 11
      }
    ]
  },
  {
    title: 'Python Programming Complete Course',
    description: 'Master Python programming from basics to advanced concepts.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    totalDuration: '10 hours',
    sections: [
      {
        title: 'Python Introduction and Setup',
        description: 'Getting started with Python and setting up development environment.',
        videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        duration: '40 min',
        order: 1
      },
      {
        title: 'Python Basics and Syntax',
        description: 'Understanding Python syntax, variables, and basic operations.',
        videoUrl: 'https://www.youtube.com/watch?v=Y8Tko2YC5hA',
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
        title: 'Virtual Environments',
        description: 'Managing dependencies with virtual environments.',
        videoUrl: 'https://www.youtube.com/watch?v=N5vscPTWKOk',
        duration: '25 min',
        order: 9
      },
      {
        title: 'Web Development with Flask',
        description: 'Building web applications using Flask framework.',
        videoUrl: 'https://www.youtube.com/watch?v=Z1RdNhVxRzY',
        duration: '70 min',
        order: 10
      },
      {
        title: 'Data Analysis with Pandas',
        description: 'Introduction to data manipulation with Pandas.',
        videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        duration: '65 min',
        order: 11
      },
      {
        title: 'Python Project',
        description: 'Build a complete Python project from scratch.',
        videoUrl: 'https://www.youtube.com/watch?v=XGf2GcyH28c',
        duration: '75 min',
        order: 12
      }
    ]
  },
  {
    title: 'Web Development with HTML & CSS',
    description: 'Learn to build beautiful websites with HTML5 and CSS3.',
    category: 'Web Development',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/mU6anWqZJjU/maxresdefault.jpg',
    totalDuration: '6 hours',
    sections: [
      {
        title: 'HTML5 Fundamentals',
        description: 'Introduction to HTML5 and basic tags.',
        videoUrl: 'https://www.youtube.com/watch?v=mU6anWqZJjU',
        duration: '45 min',
        order: 1
      },
      {
        title: 'HTML Forms and Input',
        description: 'Creating forms and handling user input.',
        videoUrl: 'https://www.youtube.com/watch?v=f5F7gv4HE1k',
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
        title: 'CSS Preprocessors',
        description: 'Introduction to SASS and LESS.',
        videoUrl: 'https://www.youtube.com/watch?v=Zz5wo8p9AsQ',
        duration: '30 min',
        order: 9
      },
      {
        title: 'Building a Portfolio Website',
        description: 'Create a complete portfolio website project.',
        videoUrl: 'https://www.youtube.com/watch?v=IXJ_dzdwM8w',
        duration: '60 min',
        order: 10
      }
    ]
  },
  {
    title: 'Data Science Fundamentals',
    description: 'Learn the fundamentals of data science and machine learning.',
    category: 'Data Science',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/ua-CiDNTj4Y/maxresdefault.jpg',
    totalDuration: '12 hours',
    sections: [
      {
        title: 'Introduction to Data Science',
        description: 'What is data science and career opportunities.',
        videoUrl: 'https://www.youtube.com/watch?v=ua-CiDNTj4Y',
        duration: '40 min',
        order: 1
      },
      {
        title: 'Statistics for Data Science',
        description: 'Essential statistical concepts for data analysis.',
        videoUrl: 'https://www.youtube.com/watch?v=XX0lQcJrI6s',
        duration: '60 min',
        order: 2
      },
      {
        title: 'Data Visualization with Matplotlib',
        description: 'Creating effective data visualizations.',
        videoUrl: 'https://www.youtube.com/watch?v=UO98lJQ3QGI',
        duration: '55 min',
        order: 3
      },
      {
        title: 'NumPy and Pandas',
        description: 'Data manipulation with NumPy and Pandas.',
        videoUrl: 'https://www.youtube.com/watch?v=vmL5rnckpYI',
        duration: '70 min',
        order: 4
      },
      {
        title: 'Data Cleaning and Preprocessing',
        description: 'Techniques for cleaning and preparing data.',
        videoUrl: 'https://www.youtube.com/watch?v=Gh54lBvLx_I',
        duration: '50 min',
        order: 5
      },
      {
        title: 'Exploratory Data Analysis',
        description: 'Methods for exploring and understanding data.',
        videoUrl: 'https://www.youtube.com/watch?v=k0k9T-3A8GQ',
        duration: '65 min',
        order: 6
      },
      {
        title: 'Introduction to Machine Learning',
        description: 'Basic concepts and types of machine learning.',
        videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
        duration: '55 min',
        order: 7
      },
      {
        title: 'Supervised Learning Algorithms',
        description: 'Linear regression, logistic regression, and decision trees.',
        videoUrl: 'https://www.youtube.com/watch?v=fSytzGwwBVw',
        duration: '70 min',
        order: 8
      },
      {
        title: 'Unsupervised Learning',
        description: 'Clustering and dimensionality reduction techniques.',
        videoUrl: 'https://www.youtube.com/watch?v=Xv1a3J7k9vE',
        duration: '60 min',
        order: 9
      },
      {
        title: 'Model Evaluation and Validation',
        description: 'Techniques for evaluating machine learning models.',
        videoUrl: 'https://www.youtube.com/watch?v=3k0y9UJqEaE',
        duration: '45 min',
        order: 10
      },
      {
        title: 'Feature Engineering',
        description: 'Creating and selecting features for better models.',
        videoUrl: 'https://www.youtube.com/watch?v=89NqALM3QmQ',
        duration: '50 min',
        order: 11
      },
      {
        title: 'Building a Data Science Project',
        description: 'Complete end-to-end data science project.',
        videoUrl: 'https://www.youtube.com/watch?v=JwSS70SZdyM',
        duration: '80 min',
        order: 12
      }
    ]
  },
  {
    title: 'SQL Database Mastery',
    description: 'Complete SQL course from basics to advanced queries.',
    category: 'Database',
    level: 'Beginner',
    thumbnail: 'https://img.youtube.com/vi/FR4QIeZaPeM/maxresdefault.jpg',
    totalDuration: '7 hours',
    sections: [
      {
        title: 'Introduction to SQL',
        description: 'What is SQL and database fundamentals.',
        videoUrl: 'https://www.youtube.com/watch?v=FR4QIeZaPeM',
        duration: '35 min',
        order: 1
      },
      {
        title: 'Basic SQL Queries',
        description: 'SELECT, FROM, WHERE clauses and basic filtering.',
        videoUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Data Types and Constraints',
        description: 'Understanding data types and database constraints.',
        videoUrl: 'https://www.youtube.com/watch?v=7S_tz1aG8xI',
        duration: '30 min',
        order: 3
      },
      {
        title: 'Joins and Relationships',
        description: 'INNER JOIN, LEFT JOIN, and table relationships.',
        videoUrl: 'https://www.youtube.com/watch?v=0i1Xu23J6i8',
        duration: '50 min',
        order: 4
      },
      {
        title: 'Aggregate Functions',
        description: 'COUNT, SUM, AVG, MIN, MAX functions.',
        videoUrl: 'https://www.youtube.com/watch?v=KXgQ08z2-7c',
        duration: '35 min',
        order: 5
      },
      {
        title: 'Group By and Having',
        description: 'Grouping data and filtering groups.',
        videoUrl: 'https://www.youtube.com/watch?v=QO9k3nJX8hI',
        duration: '40 min',
        order: 6
      },
      {
        title: 'Subqueries and Nested Queries',
        description: 'Writing complex nested queries.',
        videoUrl: 'https://www.youtube.com/watch?v=3jC9jSsoG8o',
        duration: '45 min',
        order: 7
      },
      {
        title: 'Database Design',
        description: 'Principles of good database design.',
        videoUrl: 'https://www.youtube.com/watch?v=Juj2MA0hG0I',
        duration: '50 min',
        order: 8
      },
      {
        title: 'Indexes and Performance',
        description: 'Optimizing database performance with indexes.',
        videoUrl: 'https://www.youtube.com/watch?v=vXb1xxm_iK8',
        duration: '40 min',
        order: 9
      },
      {
        title: 'Advanced SQL Functions',
        description: 'Window functions and advanced SQL features.',
        videoUrl: 'https://www.youtube.com/watch?v=H6t0q3pW2sY',
        duration: '55 min',
        order: 10
      }
    ]
  },
  {
    title: 'C++ Programming Complete Guide',
    description: 'Master C++ programming from basics to advanced concepts.',
    category: 'Programming',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/vi/8jLOx1hDqRo/maxresdefault.jpg',
    totalDuration: '9 hours',
    sections: [
      {
        title: 'C++ Introduction and Setup',
        description: 'Getting started with C++ development environment.',
        videoUrl: 'https://www.youtube.com/watch?v=8jLOx1hDqRo',
        duration: '40 min',
        order: 1
      },
      {
        title: 'Variables and Data Types',
        description: 'C++ data types, variables, and constants.',
        videoUrl: 'https://www.youtube.com/watch?v=vLnP0ZS1Y_A',
        duration: '35 min',
        order: 2
      },
      {
        title: 'Control Flow',
        description: 'If-else, switch, and loop statements in C++.',
        videoUrl: 'https://www.youtube.com/watch?v=GQc1y3N8GWQ',
        duration: '45 min',
        order: 3
      },
      {
        title: 'Functions and Parameters',
        description: 'Function definitions, parameters, and return values.',
        videoUrl: 'https://www.youtube.com/watch?v=8jLOx1hDqRo',
        duration: '50 min',
        order: 4
      },
      {
        title: 'Arrays and Pointers',
        description: 'Working with arrays and understanding pointers.',
        videoUrl: 'https://www.youtube.com/watch?v=17o59VMHcKE',
        duration: '60 min',
        order: 5
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, inheritance, and polymorphism.',
        videoUrl: 'https://www.youtube.com/watch?v=wNwqE5hJ83s',
        duration: '70 min',
        order: 6
      },
      {
        title: 'Templates and Generic Programming',
        description: 'Understanding C++ templates.',
        videoUrl: 'https://www.youtube.com/watch?v=IrcJ1kNGPmQ',
        duration: '45 min',
        order: 7
      },
      {
        title: 'STL Containers',
        description: 'Standard Template Library containers.',
        videoUrl: 'https://www.youtube.com/watch?v=RRvY2p9j2qo',
        duration: '55 min',
        order: 8
      },
      {
        title: 'Memory Management',
        description: 'Dynamic memory allocation and smart pointers.',
        videoUrl: 'https://www.youtube.com/watch?v=Shb_q5KJKG4',
        duration: '50 min',
        order: 9
      },
      {
        title: 'File I/O and Streams',
        description: 'File operations and stream processing.',
        videoUrl: 'https://www.youtube.com/watch?v=KpFgmc5uBhU',
        duration: '40 min',
        order: 10
      },
      {
        title: 'Exception Handling',
        description: 'Error handling in C++.',
        videoUrl: 'https://www.youtube.com/watch?v=amGYbfVao2M',
        duration: '35 min',
        order: 11
      }
    ]
  },
  {
    title: 'Data Structures and Algorithms',
    description: 'Master essential data structures and algorithms.',
    category: 'Computer Science',
    level: 'Intermediate',
    thumbnail: 'https://img.youtube.com/v/v=92hQ1kVJX9E/maxresdefault.jpg',
    totalDuration: '11 hours',
    sections: [
      {
        title: 'Introduction to Algorithms',
        description: 'What are algorithms and algorithm analysis.',
        videoUrl: 'https://www.youtube.com/watch?v=92hQ1kVJX9E',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Big O Notation',
        description: 'Understanding time and space complexity.',
        videoUrl: 'https://www.youtube.com/watch?v=v4cd1O4zkGw',
        duration: '40 min',
        order: 2
      },
      {
        title: 'Arrays and Linked Lists',
        description: 'Linear data structures comparison.',
        videoUrl: 'https://www.youtube.com/watch?v=8jLOx1hDqRo',
        duration: '55 min',
        order: 3
      },
      {
        title: 'Stacks and Queues',
        description: 'LIFO and FIFO data structures.',
        videoUrl: 'https://www.youtube.com/watch?v=2wM2dQkE8ZU',
        duration: '50 min',
        order: 4
      },
      {
        title: 'Trees and Binary Trees',
        description: 'Hierarchical data structures.',
        videoUrl: 'https://www.youtube.com/watch?v=oSWTXtYsl3o',
        duration: '60 min',
        order: 5
      },
      {
        title: 'Binary Search Trees',
        description: 'BST operations and implementations.',
        videoUrl: 'https://www.youtube.com/watch?v=gcULUE7NjIo',
        duration: '55 min',
        order: 6
      },
      {
        title: 'Heaps and Priority Queues',
        description: 'Heap data structure and applications.',
        videoUrl: 'https://www.youtube.com/watch?v=H0sl2Y_6mMY',
        duration: '50 min',
        order: 7
      },
      {
        title: 'Hash Tables',
        description: 'Hash functions and collision resolution.',
        videoUrl: 'https://www.youtube.com/watch?v=sh2pLpIvX8k',
        duration: '45 min',
        order: 8
      },
      {
        title: 'Sorting Algorithms',
        description: 'Bubble, selection, insertion, merge, and quick sort.',
        videoUrl: 'https://www.youtube.com/watch?v=7h1s2SjGpQo',
        duration: '70 min',
        order: 9
      },
      {
        title: 'Searching Algorithms',
        description: 'Linear and binary search techniques.',
        videoUrl: 'https://www.youtube.com/watch?v=P3YID7liBug',
        duration: '35 min',
        order: 10
      },
      {
        title: 'Graph Algorithms',
        description: 'Graph traversal and shortest path algorithms.',
        videoUrl: 'https://www.youtube.com/watch?v=09_LlHjEELw',
        duration: '80 min',
        order: 11
      },
      {
        title: 'Dynamic Programming',
        description: 'Introduction to dynamic programming concepts.',
        videoUrl: 'https://www.youtube.com/watch?v=OQ5js9Av5gI',
        duration: '65 min',
        order: 12
      }
    ]
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Complete machine learning course with practical examples.',
    category: 'Machine Learning',
    level: 'Advanced',
    thumbnail: 'https://img.youtube.com/vi/E1BbsQlFLAc/maxresdefault.jpg',
    totalDuration: '15 hours',
    sections: [
      {
        title: 'ML Introduction and Setup',
        description: 'Getting started with machine learning.',
        videoUrl: 'https://www.youtube.com/watch?v=E1BbsQlFLAc',
        duration: '45 min',
        order: 1
      },
      {
        title: 'Linear Regression',
        description: 'Understanding and implementing linear regression.',
        videoUrl: 'https://www.youtube.com/watch?v=nk2CQITm_eo',
        duration: '60 min',
        order: 2
      },
      {
        title: 'Logistic Regression',
        description: 'Classification with logistic regression.',
        videoUrl: 'https://www.youtube.com/watch?v=yIYKR4sgzI8',
        duration: '55 min',
        order: 3
      },
      {
        title: 'Decision Trees',
        description: 'Decision tree algorithms and applications.',
        videoUrl: 'https://www.youtube.com/watch?v=7VeUPuFGJHk',
        duration: '65 min',
        order: 4
      },
      {
        title: 'Random Forest',
        description: 'Ensemble learning with random forests.',
        videoUrl: 'https://www.youtube.com/watch?v=v6VJ2RO66Ag',
        duration: '50 min',
        order: 5
      },
      {
        title: 'Support Vector Machines',
        description: 'SVM theory and implementation.',
        videoUrl: 'https://www.youtube.com/watch?v=efR1C6CvhuE',
        duration: '70 min',
        order: 6
      },
      {
        title: 'K-Nearest Neighbors',
        description: 'KNN algorithm for classification and regression.',
        videoUrl: 'https://www.youtube.com/watch?v=4ObCXssJLYI',
        duration: '40 min',
        order: 7
      },
      {
        title: 'Clustering Algorithms',
        description: 'K-means and hierarchical clustering.',
        videoUrl: 'https://www.youtube.com/watch?v=Xv1a3J7k9vE',
        duration: '60 min',
        order: 8
      },
      {
        title: 'Neural Networks Basics',
        description: 'Introduction to artificial neural networks.',
        videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
        duration: '80 min',
        order: 9
      },
      {
        title: 'Deep Learning Fundamentals',
        description: 'Deep learning concepts and frameworks.',
        videoUrl: 'https://www.youtube.com/watch?v=V4Vjz3X_9Xk',
        duration: '75 min',
        order: 10
      },
      {
        title: 'Natural Language Processing',
        description: 'NLP techniques and applications.',
        videoUrl: 'https://www.youtube.com/watch?v=8HxyahsKi_I',
        duration: '70 min',
        order: 11
      },
      {
        title: 'Computer Vision',
        description: 'Image processing and computer vision basics.',
        videoUrl: 'https://www.youtube.com/watch?v=QvtWtCniD_U',
        duration: '80 min',
        order: 12
      },
      {
        title: 'ML Project Development',
        description: 'Building a complete machine learning project.',
        videoUrl: 'https://www.youtube.com/watch?v=NWXXaU3r9ZQ',
        duration: '90 min',
        order: 13
      }
    ]
  }
];

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB');
    
    try {
        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses');
        
        // Insert new courses
        await Course.insertMany(coursesData);
        console.log('Courses seeded successfully');
        
        console.log(`Seeded ${coursesData.length} courses`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding courses:', error);
        process.exit(1);
    }
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
