const express = require('express');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().select('-sections');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get course by ID with sections
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already enrolled
        if (course.enrolledStudents.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        // Add user to course
        course.enrolledStudents.push(req.user._id);
        await course.save();

        // Add course to user
        req.user.enrolledCourses.push(course._id);
        await req.user.save();

        res.json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update progress
router.post('/:id/progress', auth, async (req, res) => {
    try {
        const { sectionIndex, progress } = req.body;
        
        // Update user progress
        req.user.progress.set(req.params.id, progress);
        await req.user.save();

        res.json({ message: 'Progress updated' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get enrolled courses
router.get('/enrolled/my-courses', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses');
        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
