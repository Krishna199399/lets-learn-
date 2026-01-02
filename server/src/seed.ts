import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { Course } from './models/Course';
import { Product } from './models/Product';
import { Quiz } from './models/Quiz';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const courses = [
    {
        title: 'Class 1-10 Complete Learning',
        description: 'Comprehensive learning program for students from class 1 to 10 covering all subjects including Mathematics, Science, English, and Social Studies',
        instructor: 'Expert Teachers',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        price: 19999,
        originalPrice: 29999,
        rating: 4.9,
        studentsEnrolled: 0,
        duration: '200+ hours',
        category: 'School Education',
        level: 'beginner',
        lessons: [
            {
                title: 'Mathematics Fundamentals',
                description: 'Core mathematical concepts for classes 1-10',
                videoUrl: 'https://example.com/math1.mp4',
                duration: '45 mins',
                order: 1,
            },
            {
                title: 'Science Basics',
                description: 'Physics, Chemistry, and Biology fundamentals',
                videoUrl: 'https://example.com/science1.mp4',
                duration: '50 mins',
                order: 2,
            },
        ],
    },
    {
        title: '1st & 2nd PUC Science',
        description: 'Complete PUC science course with Physics, Chemistry, Mathematics, and Biology. Perfect preparation for competitive exams',
        instructor: 'Science Faculty',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
        price: 24999,
        originalPrice: 34999,
        rating: 4.8,
        studentsEnrolled: 0,
        duration: '180 hours',
        category: 'PUC',
        level: 'intermediate',
        lessons: [
            {
                title: 'Physics - Mechanics',
                description: 'Laws of motion, work, energy, and power',
                videoUrl: 'https://example.com/physics1.mp4',
                duration: '60 mins',
                order: 1,
            },
            {
                title: 'Chemistry - Organic Chemistry',
                description: 'Fundamentals of organic compounds',
                videoUrl: 'https://example.com/chem1.mp4',
                duration: '55 mins',
                order: 2,
            },
        ],
    },
    {
        title: 'General English',
        description: 'Master English grammar, reading comprehension, and writing skills. Build a strong foundation in English language',
        instructor: 'English Language Experts',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
        price: 8999,
        originalPrice: 14999,
        rating: 4.7,
        studentsEnrolled: 0,
        duration: '80 hours',
        category: 'Language',
        level: 'beginner',
        lessons: [
            {
                title: 'Grammar Fundamentals',
                description: 'Parts of speech, tenses, and sentence structure',
                videoUrl: 'https://example.com/english1.mp4',
                duration: '45 mins',
                order: 1,
            },
            {
                title: 'Reading Comprehension',
                description: 'Improve reading skills and vocabulary',
                videoUrl: 'https://example.com/english2.mp4',
                duration: '40 mins',
                order: 2,
            },
        ],
    },
    {
        title: 'Spoken English',
        description: 'Learn to speak English fluently with confidence. Focus on pronunciation, conversation skills, and practical usage in daily life',
        instructor: 'Communication Specialists',
        thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
        price: 6999,
        originalPrice: 11999,
        rating: 4.6,
        studentsEnrolled: 0,
        duration: '60 hours',
        category: 'Language',
        level: 'beginner',
        lessons: [
            {
                title: 'Pronunciation Basics',
                description: 'Correct pronunciation and accent training',
                videoUrl: 'https://example.com/spoken1.mp4',
                duration: '35 mins',
                order: 1,
            },
            {
                title: 'Conversation Practice',
                description: 'Daily conversation scenarios and role-plays',
                videoUrl: 'https://example.com/spoken2.mp4',
                duration: '45 mins',
                order: 2,
            },
        ],
    },
];

const products = [
    {
        name: 'Scientific Calculator',
        description: 'Advanced scientific calculator with 500+ functions',
        price: 1299,
        originalPrice: 1999,
        images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800'],
        category: 'Electronics',
        stock: 50,
        rating: 4.5,
    },
    {
        name: 'Premium Notebook Set',
        description: 'Set of 5 high-quality notebooks for students',
        price: 399,
        images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800'],
        category: 'Stationery',
        stock: 100,
        rating: 4.3,
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await Course.deleteMany({});
        await Product.deleteMany({});
        await Quiz.deleteMany({});
        await User.deleteMany({}); // Clear users

        // Create admin user
        console.log('👤 Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@letslearnandlead.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('✅ Admin user created');
        console.log('📧 Email: admin@letslearnandlead.com');
        console.log('🔑 Password: admin123');

        console.log('🌱 Seeding courses...');
        const createdCourses = await Course.insertMany(courses);
        console.log(`✅ Created ${createdCourses.length} courses`);

        console.log('🌱 Seeding products...');
        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Created ${createdProducts.length} products`);

        // Create a sample quiz for the first course
        const sampleQuiz = {
            courseId: createdCourses[0]._id,
            title: 'Web Development Basics Quiz',
            description: 'Test your knowledge of HTML and CSS',
            timeLimit: 30,
            passingScore: 70,
            questions: [
                {
                    question: 'What does HTML stand for?',
                    options: [
                        'Hyper Text Markup Language',
                        'High Tech Modern Language',
                        'Home Tool Markup Language',
                        'Hyperlinks and Text Markup Language'
                    ],
                    correctAnswer: 0,
                },
                {
                    question: 'Which property is used to change the background color in CSS?',
                    options: [
                        'color',
                        'bgcolor',
                        'background-color',
                        'bg-color'
                    ],
                    correctAnswer: 2,
                },
            ],
        };

        console.log('🌱 Seeding quiz...');
        const createdQuiz = await Quiz.create(sampleQuiz);
        console.log(`✅ Created quiz for course: ${createdCourses[0].title}`);

        // Update course with quiz reference
        await Course.findByIdAndUpdate(createdCourses[0]._id, { quizId: createdQuiz._id });

        console.log('✨ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
