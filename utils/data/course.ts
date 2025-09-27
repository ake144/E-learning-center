export interface Lesson {
  id: number;
  title: string;
  duration: string;
  overview: string;
  transcript: string;
  resources: string[];
  completed: boolean;
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
            overview: "Understand the essentials of professional email communication.",
            transcript: "Learn how to write clear, polite, and effective business emails.",
            resources: ["Email etiquette guide", "Sample business emails", "Checklist for professional emails"],
            completed: true,
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
            overview: "Develop skills for effective teamwork and collaboration.",
            transcript: "Explore strategies for working well in teams and collaborating with colleagues.",
            resources: ["Teamwork exercises", "Collaboration tools overview", "Case studies"],
            completed: false,
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
            overview: "Discover how to upskill using online learning platforms.",
            transcript: "This lesson introduces top platforms and strategies for continuous learning.",
            resources: ["List of online platforms", "Upskilling roadmap", "Success stories"],
            completed: false,
          },
        ],
      },
    ],
  },
  // Add more courses as needed
];