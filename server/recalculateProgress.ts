import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from './src/models/Course';
import { Enrollment } from './src/models/Enrollment';
import { VideoProgress } from './src/models/VideoProgress';

dotenv.config();

/**
 * This script recalculates and fixes all enrollment completion percentages
 * based on actual VideoProgress data
 */
async function recalculateEnrollmentProgress() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/websit-edu');
        console.log('✅ Connected to MongoDB');

        // Get all enrollments
        const enrollments = await Enrollment.find({ status: 'paid' });
        console.log(`📊 Found ${enrollments.length} enrollments to process`);

        let updated = 0;

        for (const enrollment of enrollments) {
            const { userId, courseId } = enrollment;

            // Get the course
            const course = await Course.findById(courseId);
            if (!course) {
                console.log(`⚠️  Course not found for enrollment ${enrollment._id}`);
                continue;
            }

            // Calculate total lessons from sections structure
            let totalLessons = 0;
            if (course.sections) {
                for (const section of course.sections) {
                    for (const subsection of section.subsections || []) {
                        totalLessons += subsection.content?.length || 0;
                    }
                }
            }

            // Get all video progress for this user and course
            const allProgress = await VideoProgress.find({ userId, courseId });
            const completedLessons = allProgress.filter((p) => p.completed).length;

            // Calculate completion percentage
            const completionPercentage = totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;

            // Update if changed
            if (enrollment.completionPercentage !== completionPercentage) {
                enrollment.completionPercentage = completionPercentage;
                await enrollment.save();
                updated++;
                console.log(`✅ Updated enrollment ${enrollment._id}: ${completionPercentage}% (${completedLessons}/${totalLessons} lessons)`);
            }
        }

        console.log(`\n🎉 Done! Updated ${updated} out of ${enrollments.length} enrollments`);

        // Disconnect
        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

// Run the script
recalculateEnrollmentProgress();
