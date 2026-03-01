const fs = require('fs');
const path = require('path');

// Simple file-based database for temporary use
class TempDatabase {
  constructor() {
    this.dbPath = path.join(__dirname, 'tempData.json');
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(this.dbPath)) {
        return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
      }
    } catch (error) {
      console.log('No existing data found, starting fresh');
    }
    return {
      users: [],
      courses: []
    };
  }

  saveData() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  // User methods
  findUserByEmail(email) {
    return this.data.users.find(user => user.email === email);
  }

  findUserByUsername(username) {
    return this.data.users.find(user => user.username === username);
  }

  createUser(userData) {
    const user = {
      id: Date.now().toString(),
      ...userData,
      enrolledCourses: [],
      progress: {},
      createdAt: new Date().toISOString()
    };
    this.data.users.push(user);
    this.saveData();
    return user;
  }

  // Course methods
  getAllCourses() {
    return this.data.courses;
  }

  addCourse(courseData) {
    const course = {
      id: Date.now().toString(),
      ...courseData,
      enrolledStudents: [],
      createdAt: new Date().toISOString()
    };
    this.data.courses.push(course);
    this.saveData();
    return course;
  }

  getCourseById(id) {
    return this.data.courses.find(course => course.id === id);
  }

  enrollUserInCourse(userId, courseId) {
    const user = this.data.users.find(u => u.id === userId);
    const course = this.data.courses.find(c => c.id === courseId);
    
    if (user && course) {
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
      }
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
      }
      this.saveData();
      return true;
    }
    return false;
  }

  getEnrolledCourses(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      return this.data.courses.filter(course => 
        user.enrolledCourses.includes(course.id)
      );
    }
    return [];
  }
}

module.exports = TempDatabase;
