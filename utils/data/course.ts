export interface Resource {
  id: number;
  title: string;
  url: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  overview: string;
  transcript: string;
  resources: string[] | Resource[];
  quiz?: Quiz[] | undefined;
  questions?: Quiz[] | undefined;
  hasQuiz?: boolean;
  quizAnswers?: Record<string, string>; // question -> answer
  quizScore?: number; // 0-100
  quizCompleted?: boolean;
  videoProgress?: number; // 0-100
  completed: boolean;
  videoId: string;
}



export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
  progress: number; // 0-100
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  image?: string;
  modules: Module[];
  progress: number; // 0-100
  price: number;
  originalPrice?: number;
  currency: 'USD' | 'ETB';
  priceETB?: number; // Price in Ethiopian Birr for Chapa
  level?: string;
  duration?: string;
  lessons?: number;
}

export const courses: Course[] = [
  {
    slug: "global-scholarship-mastery",
    title: "Global Scholarship & Interview Mastery",
    description: "Learn how to find scholarships, prepare documents, and pass international interviews — step by step.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replaced with a relevant scholarship/study image
    progress: 0,
    price: 30,
    level: "All Levels",
    duration: "10h 30m",
    lessons: 24,
    currency: 'USD',
    priceETB: 3500, // Approx conversion, can be adjusted
    modules: [
      {
        id: 1,
        title: "Scholarship search strategy & shortlisting",
        progress: 0,
        lessons: [
          {
            id: 1,
            title: "Understanding Scholarship Types",
            duration: "10:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "Learn about different types of scholarships available globally.",
            transcript: "Introduction to merit-based, need-based, and country-specific scholarships.",
            resources: ["Scholarship Database List", "Search Strategy Template"],
            completed: false,
          },
          {
            id: 2,
            title: "Shortlisting the Best Opportunities",
            duration: "15:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "How to filter and select scholarships that match your profile.",
            transcript: "Techniques for efficient shortlisting and organizing applications.",
            resources: ["Shortlisting Spreadsheet"],
            completed: false,
          }
        ]
      },
      {
        id: 2,
        title: "Motivation letter / SOP structure",
        progress: 0,
        lessons: [
          {
            id: 3,
            title: "Structuring Your SOP",
            duration: "12:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "The ideal structure for a winning Statement of Purpose.",
            transcript: "Breakdown of introduction, body paragraphs, and conclusion.",
            resources: ["SOP Template", "Winning SOP Examples"],
            completed: false,
          },
          {
            id: 4,
            title: "Writing Compelling Hooks",
            duration: "08:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "How to start your essay with a strong hook.",
            transcript: "Examples of engaging opening lines.",
            resources: [],
            completed: false,
          }
        ]
      },
      {
        id: 3,
        title: "CV/Resume polishing for international reviewers",
        progress: 0,
        lessons: [
          {
            id: 5,
            title: "Academic vs. Professional CV",
            duration: "10:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "Differences between academic CVs and professional resumes.",
            transcript: "Tailoring your CV for scholarship committees.",
            resources: ["Academic CV Template", "Action Verbs List"],
            completed: false,
          }
        ]
      },
      {
        id: 4,
        title: "Recommendation letter guidance",
        progress: 0,
        lessons: [
          {
            id: 6,
            title: "Choosing the Right Referees",
            duration: "05:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "Who to ask for recommendation letters.",
            transcript: "Selecting referees who can vouch for your academic and personal qualities.",
            resources: ["Email Request Template"],
            completed: false,
          },
          {
            id: 7,
            title: "Drafting Guidance for Referees",
            duration: "07:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "How to help your referees write strong letters.",
            transcript: "Providing bullet points and context to your referees.",
            resources: ["LOR Guidelines PDF"],
            completed: false,
          }
        ]
      },
      {
        id: 5,
        title: "Interview preparation + mock questions",
        progress: 0,
        lessons: [
          {
            id: 8,
            title: "Common Interview Questions",
            duration: "20:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "Top questions asked in scholarship interviews.",
            transcript: "Analysis of common questions and how to answer them.",
            resources: ["Question Bank"],
            completed: false,
          },
          {
            id: 9,
            title: "Mock Interview Practice",
            duration: "25:00",
            videoId: "tjXIfam5qLE", // Placeholder
            overview: "Simulated interview session.",
            transcript: "Watch a mock interview and learn from the feedback.",
            resources: ["Self-Evaluation Checklist"],
            completed: false,
          }
        ]
      }
    ],
  }
];