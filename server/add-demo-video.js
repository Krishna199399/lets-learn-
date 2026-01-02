// Quick script to add demo video URL to a course
// Run this with: node add-demo-video.js

const mongoose = require('mongoose');
require('dotenv').config();

const updateCourse = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const Course = mongoose.model('Course', new mongoose.Schema({}, { strict: false }));

        // Update the first course with a demo video
        const result = await Course.findOneAndUpdate(
            { title: 'Class 1-10 Complete Learning' }, // Or use any course title
            { demoVideoUrl: 'http://localhost:5000/videos/demo-countdown.mp4' },
            { new: true }
        );

        if (result) {
            console.log('✅ Demo video URL added successfully!');
            console.log('Course:', result.title);
            console.log('Demo URL:', result.demoVideoUrl);
        } else {
            console.log('❌ Course not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateCourse();
