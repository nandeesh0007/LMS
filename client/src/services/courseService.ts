import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://lms-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string;
  sections: Section[];
  enrolledStudents: string[];
  rating: number;
  totalDuration: string;
}

interface Section {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses');
    return response.data;
  },

  getPublicCourses: async (): Promise<Course[]> => {
    const response = await api.get('/public-courses');
    return response.data;
  },

  getCourseById: async (id: string): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  enrollInCourse: async (courseId: string, token: string): Promise<void> => {
    const response = await api.post(`/courses/${courseId}/enroll`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProgress: async (courseId: string, sectionIndex: number, progress: number, token: string): Promise<void> => {
    const response = await api.post(`/courses/${courseId}/progress`, {
      sectionIndex,
      progress
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getEnrolledCourses: async (token: string): Promise<Course[]> => {
    const response = await api.get('/courses/enrolled/my-courses', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};
