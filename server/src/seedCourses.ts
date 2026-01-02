import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const courses = [
    {
        title: '1st & 2nd PUC Science',
        description: 'Complete PUC science course with Physics, Chemistry, Mathematics, and Biology. Perfect preparation for competitive exams',
        instructor: 'Science Faculty',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Add your demo video URL here
        price: 24999,
        originalPrice: 34999,
        rating: 4.8,
        studentsEnrolled: 0,
        duration: '180 hours',
        category: 'PUC',
        level: 'intermediate',
        lessons: [
            {
                title: 'Introduction to Web Development',
                description: 'Learn the basics of web development',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '10:30',
                order: 1,
            },
            {
                title: 'HTML Fundamentals',
                description: 'Master HTML from scratch',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '15:45',
                order: 2,
            },
        ],
    },
    {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and deploy them.',
        instructor: 'Tech Instructor',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Add your demo video URL here
        price: 4999,
        originalPrice: 9999,
        rating: 4.9,
        studentsEnrolled: 0,
        duration: '50 hours',
        category: 'School Education',
        level: 'beginner',
        lessons: [
            {
                title: 'Getting Started',
                description: 'Introduction to the course',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '5:00',
                order: 1,
            },
        ],
    },
    {
        title: 'Python for Beginners',
        description: 'Start your programming journey with Python. Learn fundamentals, data structures, and build projects.',
        instructor: 'Programming Expert',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        demoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Add your demo video URL here
        price: 3499,
        originalPrice: 6999,
        rating: 4.7,
        studentsEnrolled: 0,
        duration: '40 hours',
        category: 'Language',
        level: 'beginner',
        lessons: [],
    },
    {
        title: 'FREE Introduction to Programming',
        description: 'A completely free course to get started with programming concepts. No prerequisites required!',
        instructor: 'Community Instructor',
        thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
        price: 0,
        rating: 4.5,
        studentsEnrolled: 0,
        duration: '10 hours',
        category: 'School Education',
        level: 'beginner',
        lessons: [],
    },
];

async function seedCourses() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('✅ Connected to MongoDB');

        // Import Course model
        const { Course } = await import('./models/Course.js');

        // Clear existing courses (optional - comment out if you want to keep existing)
        // await Course.deleteMany({});
        // console.log('🗑️  Cleared existing courses');

        // Insert sample courses
        const insertedCourses = await Course.insertMany(courses);
        console.log(`✅ Successfully added ${insertedCourses.length} courses:`);

        insertedCourses.forEach((course) => {
            console.log(`   - ${course.title} (₹${course.price})`);
        });

        console.log('\n🎉 Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedCourses();
