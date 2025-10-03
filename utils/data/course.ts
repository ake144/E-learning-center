export interface Lesson {
  id: number;
  title: string;
  duration: string;
  overview: string;
  transcript: string;
  resources: string[];
  quiz?: Quiz[] | undefined;
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
  modules: Module[];
  progress: number; // 0-100
}

export const courses: Course[] = [
  {
    slug: "career-skills",
    title: "Career Skills",
    description: "Professional Development • Complete at your own pace",
    progress: 60,
    modules: [
      {
        id: 1,
        title: "Module 1: Self-Awareness & Career Foundations",
        progress: 100,
        lessons: [
          {
            id: 1,
            title: "Identifying strengths, weaknesses, and interests",
            duration: "5:30",
            hasQuiz: false,
            videoId: "JwNI1F21eK8",
            overview: "Learn to identify your strengths, weaknesses, and interests for career growth.",
            transcript: "This lesson covers self-assessment techniques to help you understand your professional profile.",
            resources: ["Self-assessment worksheet", "Career interest survey", "Recommended reading"],
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Building a Professional Identity",
        progress: 100,
        lessons: [
          {
            id: 2,
            title: "Writing an impactful one-page resume",
            duration: "6:15",
            videoId: "oroNbJYNkEc",
            hasQuiz: false,
            overview: "Master the art of resume writing for professional success.",
            transcript: "This lesson guides you through creating a concise and effective resume.",
            resources: ["Resume template", "Sample resumes", "Resume writing tips"],
            completed: true,
          },
        ],
      },
     {
        id: 3,
        title: "Module 3: Communication & Interview Skills",
        progress: 100,
        lessons: [
          {
            id: 3,
            title: "Business email etiquette",
            duration: "4:45",
            videoId: "ppf9j8x0LA8",
            overview: "Understand the essentials of professional email communication.",
            transcript: "Learn how to write clear, polite, and effective business emails.",
            resources: ["Email etiquette guide", "Sample business emails", "Checklist for professional emails"],
            completed: true,
            quiz: [
              {
                id: 1,
                question: "What is the most appropriate subject line for a follow-up email after a meeting?",
                options: ["Meeting Notes", "Quick Follow-Up on Our Discussion", "Update", "FYI"],
                correctAnswer: "Quick Follow-Up on Our Discussion"
              },
              {
                id: 2,
                question: "When addressing a colleague in an email, what is the best practice if you know their name?",
                options: ["Hey there", "Dear [Name]", "Hi everyone", "To whom it may concern"],
                correctAnswer: "Dear [Name]"
              },
              {
                id: 3,
                question: "How should you end a professional email?",
                options: ["Cheers", "Best regards", "TTYL", "See ya"],
                correctAnswer: "Best regards"
              },
              {
                id: 4,
                question: "What is the purpose of the CC field in an email?",
                options: ["To send a copy to someone for information", "To blind copy someone", "To attach files", "To set priority"],
                correctAnswer: "To send a copy to someone for information"
              },
              {
                id: 5,
                question: "Is it acceptable to use emojis in business emails?",
                options: ["Always encouraged", "Only in informal settings", "Never, as they can seem unprofessional", "Only in the subject line"],
                correctAnswer: "Only in informal settings"
              },
              {
                id: 6,
                question: "What should you do before hitting 'Send' on an important email?",
                options: ["Proofread for errors", "Add more attachments", "Change the font", "Ignore it"],
                correctAnswer: "Proofread for errors"
              }
            ]
          },
        ],
      },
      {
        id: 4,
        title: "Module 4: Workplace Readiness",
        progress: 0,
        lessons: [
          {
            id: 4,
            title: "Teamwork & collaboration",
            duration: "7:20",
            videoId: "QxOBgyitHek",
            overview: "Develop skills for effective teamwork and collaboration.",
            transcript: "Explore strategies for working well in teams and collaborating with colleagues.",
            resources: ["Teamwork exercises", "Collaboration tools overview", "Case studies"],
            completed: false,
            quiz: [
              {
                id: 1,
                question: "What is a key benefit of effective teamwork?",
                options: ["Increased individual workload", "Better problem-solving and innovation", "Less communication", "More competition"],
                correctAnswer: "Better problem-solving and innovation"
              },
              {
                id: 2,
                question: "Which tool is commonly used for real-time team collaboration?",
                options: ["Notepad", "Slack or Microsoft Teams", "Email only", "Paper and pen"],
                correctAnswer: "Slack or Microsoft Teams"
              },
              {
                id: 3,
                question: "How should you handle a conflict in a team setting?",
                options: ["Ignore it", "Discuss openly and find a compromise", "Blame others", "Leave the team"],
                correctAnswer: "Discuss openly and find a compromise"
              },
              {
                id: 4,
                question: "What does 'active listening' mean in collaboration?",
                options: ["Talking more than others", "Fully focusing on the speaker without interrupting", "Multitasking during meetings", "Checking your phone"],
                correctAnswer: "Fully focusing on the speaker without interrupting"
              },
              {
                id: 5,
                question: "Why is setting clear roles important in a team?",
                options: ["To create confusion", "To avoid overlap and ensure accountability", "To limit creativity", "To make meetings longer"],
                correctAnswer: "To avoid overlap and ensure accountability"
              },
              {
                id: 6,
                question: "What is an example of a collaboration best practice?",
                options: ["Working in silos", "Regular check-ins and feedback", "Avoiding questions", "Hoarding information"],
                correctAnswer: "Regular check-ins and feedback"
              }
            ]
          },
        ],
      },
      {
        id: 5,
        title: "Module 5: Career Growth & Future Skills",
        progress: 0,
        lessons: [
          {
            id: 5,
            title: "Upskilling with online platforms",
            duration: "5:10",
            videoId: "KmphskDulug",
            overview: "Discover how to upskill using online learning platforms.",
            transcript: "This lesson introduces top platforms and strategies for continuous learning.",
            resources: ["List of online platforms", "Upskilling roadmap", "Success stories"],
            completed: false,
            quiz: [
              {
                id: 1,
                question: "What is upskilling?",
                options: ["Learning new hobbies", "Acquiring new skills to advance in your career", "Reducing work hours", "Changing jobs frequently"],
                correctAnswer: "Acquiring new skills to advance in your career"
              },
              {
                id: 2,
                question: "Which platform is known for short, interactive courses?",
                options: ["Coursera", "LinkedIn Learning", "YouTube", "Wikipedia"],
                correctAnswer: "LinkedIn Learning"
              },
              {
                id: 3,
                question: "Why is continuous learning important for career growth?",
                options: ["To stay relevant in a changing job market", "To avoid promotions", "To work less", "To forget old skills"],
                correctAnswer: "To stay relevant in a changing job market"
              },
              {
                id: 4,
                question: "What should be the first step in an upskilling roadmap?",
                options: ["Assess your current skills and goals", "Buy expensive courses", "Ignore feedback", "Stop learning"],
                correctAnswer: "Assess your current skills and goals"
              },
              {
                id: 5,
                question: "Name a benefit of certifications from online platforms.",
                options: ["They are always free", "They validate your skills to employers", "They take no time", "They are unnecessary"],
                correctAnswer: "They validate your skills to employers"
              },
              {
                id: 6,
                question: "How often should you dedicate time to upskilling?",
                options: ["Once a year", "Regularly, like weekly or monthly", "Never", "Only when forced"],
                correctAnswer: "Regularly, like weekly or monthly"
              },
              {
                id: 7,
                question: "Which strategy helps maintain motivation for online learning?",
                options: ["Setting small, achievable goals", "Binge-learning everything at once", "Skipping practice", "Ignoring deadlines"],
                correctAnswer: "Setting small, achievable goals"
              }
            ]
          },
        ],
      }
    ],
  },
];