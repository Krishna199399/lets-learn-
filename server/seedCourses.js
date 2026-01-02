const mongoose = require('mongoose');

// Course Schema
const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: String, required: true },
    order: { type: Number, required: true },
});

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        instructor: { type: String, required: true },
        thumbnail: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        studentsEnrolled: { type: Number, default: 0 },
        duration: { type: String, required: true },
        category: { type: String, required: true },
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        lessons: [LessonSchema],
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);

// Sample courses
const courses = [
    {
        title: '1st & 2nd PUC Science',
        description: 'Complete PUC science course with Physics, Chemistry, Mathematics, and Biology. Perfect preparation for competitive exams',
        instructor: 'Science Faculty',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        price: 24999,
        originalPrice: 34999,
        rating: 4.8,
        studentsEnrolled: 1,
        duration: '180 hours',
        category: 'PUC',
        level: 'intermediate',
        lessons: [
            {
                title: 'Introduction to Physics',
                description: 'Basic concepts of physics',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '45:00',
                order: 1,
            },
            {
                title: 'Chemistry Fundamentals',
                description: 'Core chemistry principles',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '50:00',
                order: 2,
            },
        ],
    },
    {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and deploy them.',
        instructor: 'Tech Instructor',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        price: 4999,
        originalPrice: 9999,
        rating: 4.9,
        studentsEnrolled: 156,
        duration: '50 hours',
        category: 'School Education',
        level: 'beginner',
        lessons: [
            {
                title: 'Getting Started with Web Dev',
                description: 'Introduction to web development',
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                duration: '15:00',
                order: 1,
            },
        ],
    },
    {
        title: 'Python Programming Masterclass',
        description: 'Start your programming journey with Python. Learn fundamentals, data structures, OOP, and build projects.',
        instructor: 'Programming Expert',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        price: 3499,
        originalPrice: 6999,
        rating: 4.7,
        studentsEnrolled: 234,
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
        studentsEnrolled: 567,
        duration: '10 hours',
        category: 'School Education',
        level: 'beginner',
        lessons: [],
    },
    {
        title: 'Advanced JavaScript ES6+',
        description: 'Master modern JavaScript features including async/await, promises, modules, and more.',
        instructor: 'JS Expert',
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
        price: 5999,
        originalPrice: 11999,
        rating: 4.9,
        studentsEnrolled: 89,
        duration: '35 hours',
        category: 'Language',
        level: 'advanced',
        lessons: [],
    },
];

async function seedCourses() {
    try {
        // Get MongoDB URI from environment or use a default
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/education';

        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB!');

        // Optional: Clear existing courses
        // const deletedCount = await Course.deleteMany({});
        // console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing courses`);

        // Insert courses
        const insertedCourses = await Course.insertMany(courses);
        console.log(`\n✅ Successfully added ${insertedCourses.length} courses:\n`);

        insertedCourses.forEach((course, index) => {
            console.log(`${index + 1}. ${course.title}`);
            console.log(`   Price: ₹${course.price.toLocaleString()}`);
            console.log(`   Category: ${course.category}`);
            console.log(`   Students: ${course.studentsEnrolled}\n`);
        });

        console.log('🎉 Database seeding complete!');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        console.error('\n💡 Make sure:');
        console.error('   1. MongoDB is running');
        console.error('   2. MONGODB_URI in .env is correct');
        console.error('   3. You have internet connection (for MongoDB Atlas)');
        process.exit(1);
    }
}

seedCourses();
