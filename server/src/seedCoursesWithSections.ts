import { Course } from './models/Course';
import { connectDB } from './config/database';

/**
 * Example seed script for courses with the new sections structure
 */

const exampleCoursesWithSections = [
    {
        title: "Complete React Development Course",
        description: "Master React from fundamentals to advanced concepts with hands-on projects",
        instructor: "Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        price: 2999,
        originalPrice: 5999,
        rating: 4.8,
        studentsEnrolled: 1250,
        duration: "40h",
        category: "Programming",
        level: "intermediate",
        demoVideoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        sections: [
            {
                title: "Introduction to React",
                description: "Get started with React fundamentals",
                order: 0,
                subsections: [
                    {
                        title: "Welcome & Setup",
                        description: "Course introduction and environment setup",
                        order: 0,
                        content: [
                            {
                                type: "video",
                                title: "Course Overview",
                                description: "What you'll learn in this course",
                                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                                duration: "10:30",
                                order: 0,
                                isFree: true
                            },
                            {
                                type: "video",
                                title: "Setting Up Development Environment",
                                description: "Install Node.js, VS Code, and React DevTools",
                                videoUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
                                duration: "15:45",
                                order: 1,
                                isFree: true
                            },
                            {
                                type: "article",
                                title: "Course Prerequisites",
                                description: "What you should know before starting",
                                articleContent: "This course assumes basic knowledge of HTML, CSS, and JavaScript. You should be comfortable with:\n\n• HTML5 fundamentals and semantic markup\n• CSS3 and basic styling concepts\n• JavaScript ES6+ features (arrow functions, destructuring, promises)\n• Basic command line/terminal usage\n\nDon't worry if you're not an expert in these areas - we'll review key concepts as we go. The important thing is that you have some exposure to web development before diving into React.",
                                duration: "5:00",
                                order: 2,
                                isFree: true
                            }
                        ]
                    },
                    {
                        title: "React Basics",
                        description: "Core React concepts",
                        order: 1,
                        content: [
                            {
                                type: "video",
                                title: "What is React?",
                                description: "Understanding React and its ecosystem",
                                videoUrl: "https://www.youtube.com/watch?v=N3AkSS5hXMA",
                                duration: "12:20",
                                order: 0,
                                isFree: false
                            },
                            {
                                type: "video",
                                title: "JSX Fundamentals",
                                description: "Writing JSX and understanding the syntax",
                                videoUrl: "https://www.youtube.com/watch?v=7fPXI_MnBOY",
                                duration: "18:15",
                                order: 1,
                                isFree: false
                            }
                        ]
                    }
                ]
            },
            {
                title: "Components & Props",
                description: "Building reusable components",
                order: 1,
                subsections: [
                    {
                        title: "Functional Components",
                        description: "Modern React with functional components",
                        order: 0,
                        content: [
                            {
                                type: "video",
                                title: "Creating Your First Component",
                                description: "Building functional components",
                                videoUrl: "https://www.youtube.com/watch?v=Y2qQ_uMRkbU",
                                duration: "20:30",
                                order: 0,
                                isFree: false
                            },
                            {
                                type: "video",
                                title: "Props Explained",
                                description: "Passing data with props",
                                videoUrl: "https://www.youtube.com/watch?v=DHjqpvDnNGE",
                                duration: "16:45",
                                order: 1,
                                isFree: false
                            },
                            {
                                type: "quiz",
                                title: "Components Quiz",
                                description: "Test your knowledge of components",
                                duration: "10:00",
                                order: 2,
                                isFree: false
                            }
                        ]
                    }
                ]
            },
            {
                title: "State Management",
                description: "Managing state in React applications",
                order: 2,
                subsections: [
                    {
                        title: "useState Hook",
                        description: "Managing local state",
                        order: 0,
                        content: [
                            {
                                type: "video",
                                title: "Introduction to useState",
                                description: "Understanding React hooks",
                                videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
                                duration: "22:10",
                                order: 0,
                                isFree: false
                            },
                            {
                                type: "assignment",
                                title: "Build a Counter App",
                                description: "Practice useState with a simple counter",
                                duration: "30:00",
                                order: 1,
                                isFree: false
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: "Python for Data Science",
        description: "Learn Python programming and data analysis with real-world projects",
        instructor: "Dr. Michael Chen",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
        price: 1999,
        originalPrice: 3999,
        rating: 4.9,
        studentsEnrolled: 2340,
        duration: "35h",
        category: "Data Science",
        level: "beginner",
        sections: [
            {
                title: "Python Fundamentals",
                description: "Start your Python journey",
                order: 0,
                subsections: [
                    {
                        title: "Getting Started",
                        order: 0,
                        content: [
                            {
                                type: "video",
                                title: "Installing Python",
                                description: "Set up your Python environment",
                                videoUrl: "https://www.youtube.com/watch?v=YYXdXT2l-Gg",
                                duration: "12:00",
                                order: 0,
                                isFree: true
                            },
                            {
                                type: "video",
                                title: "Python Basics",
                                description: "Variables, data types, and operators",
                                videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
                                duration: "25:30",
                                order: 1,
                                isFree: false
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

async function seedCoursesWithSections() {
    try {
        await connectDB();
        console.log('🔄 Starting seed: Courses with sections...');

        // Clear existing courses (optional - comment out if you want to keep existing data)
        // await Course.deleteMany({});

        // Insert new courses
        const inserted = await Course.insertMany(exampleCoursesWithSections);
        console.log(`✅ Successfully seeded ${inserted.length} courses with sections structure`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding courses:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    seedCoursesWithSections();
}

export { exampleCoursesWithSections, seedCoursesWithSections };
