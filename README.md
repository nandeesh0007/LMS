# Learning Management System

A comprehensive Learning Management System (LMS) built with React, Node.js, and Express. This platform allows users to register, login, browse courses, and learn through video content from YouTube.

## Features

- **User Authentication**: Registration and login system with JWT tokens
- **Course Management**: Browse various programming and technology courses
- **Video Learning**: Integrated YouTube videos for course content (all videos tested and working)
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and intuitive user interface
- **7 Comprehensive Courses**: 70 video lessons across multiple technology domains

## Course Catalog

1. **🐍 Python (Beginner → Advanced)** - 40+ hours, 10 sections
2. **☕ Java (Beginner → Full)** - 35+ hours, 10 sections  
3. **🌐 HTML / Web Development** - 30+ hours, 10 sections
4. **🧠 DSA (Data Structures & Algorithms)** - 25+ hours, 10 sections
5. **⛓️ Blockchain Development** - 20+ hours, 10 sections
6. **🗄️ SQL & Database Development** - 15+ hours, 10 sections
7. **📦 C Programming** - 20+ hours, 10 sections

## Technology Stack

### Frontend
- React with JavaScript
- React Router for navigation
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js with Express
- In-memory database (simple setup)
- JWT for authentication
- CORS enabled

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/nandeesh0007/LMS.git
cd LMS
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Start the backend server:
```bash
node freshServer.js
```

5. Start the frontend development server (in a new terminal):
```bash
cd client
npm start
```

6. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Default Setup
- No database required (uses in-memory storage)
- No environment variables needed
- All courses and videos are pre-configured
- Any username/password works for registration/login

## Usage

1. **Registration**: New users can create an account with username, email, and password
2. **Login**: Existing users can login with their credentials
3. **Dashboard**: View available courses and enrolled courses
4. **Course Enrollment**: Enroll in courses to access content
5. **Learning**: Watch YouTube videos organized by course sections
6. **Progress Tracking**: Track progress through course sections

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:id/progress` - Update progress
- `GET /api/courses/enrolled/my-courses` - Get enrolled courses

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  enrolledCourses: [ObjectId],
  progress: Map
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  category: String,
  level: String,
  thumbnail: String,
  sections: [{
    title: String,
    description: String,
    videoUrl: String,
    duration: String,
    order: Number
  }],
  enrolledStudents: [ObjectId],
  rating: Number,
  totalDuration: String
}
```

## Project Structure

```
learning-management-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── App.tsx
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js              # Express server
├── seedDatabase.js        # Database seeding script
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- Quiz and assessment features
- Certificate generation
- Discussion forums
- Instructor dashboard
- Payment integration
- Advanced analytics
- Mobile app development
