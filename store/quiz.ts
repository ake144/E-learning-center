import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Course, courses } from '@/utils/data/course'; // Your static data


// const cloneCourse = (course) => JSON.parse(JSON.stringify(course));
type ProgressState = {
  courses: Course[];
  updateVideoProgress: (courseSlug: string, lessonId: number, progress: number) => void;
  submitQuiz: (courseSlug: string, lessonId: number, answers: Record<string, string>) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Initial state: Load courses, default progress
      courses: courses.map(course => ({
        ...course,
        progress: 0, // Overall %
        modules: course.modules.map(module => ({
          ...module,
          progress: 0, 
          lessons: module.lessons.map(lesson => ({
            ...lesson,
            completed: false,
            videoProgress: 0, // 0-100
            hasQuiz: Array.isArray(lesson?.quiz) && lesson.quiz.length > 0, // Assume quiz is array in data
            quiz: lesson?.quiz || [],
            quizAnswers: {},
            quizScore: 0,
            quizCompleted: false,
          })),
        })),
      })),
      
      // Action: Update video progress (call from Plyr callback)
      updateVideoProgress: (courseSlug: string, lessonId: number, progress: number) => 
        set((state: ProgressState) => {
          const course = state.courses.find(c => c.slug === courseSlug);
          if (!course) return state;
          
          const targetLesson = course.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
          if (!targetLesson) return state;
          
          targetLesson.videoProgress = Math.round(progress * 100);
          
          // Mark complete if >=80% or ended
          const isComplete = progress >= 0.8;
          if (isComplete && !targetLesson.completed) {
            targetLesson.completed = true;
            if (targetLesson.hasQuiz) {
              targetLesson.quizCompleted = false; 
            }
          }
          
          // Recalc module/course progress

          updateProgress(course);
          return { courses: [...state.courses] }; // Trigger re-render
        }),
      
      // Action: Submit quiz
      submitQuiz: (courseSlug: string, lessonId: number, answers: Record<string, string>) => 
        set((state: ProgressState) => {
          const course = state.courses.find(c => c.slug === courseSlug);
          if (!course) return state;
          
          const targetLesson = course.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);
          if (!targetLesson) return state;
          
          targetLesson.quizAnswers = answers;
          let score = 0;
          const total = (targetLesson.quiz ?? []).length;
          (targetLesson.quiz ?? []).forEach(q => {
            if (answers[q.id] === q.correctAnswer) score++;
          });
          const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
          targetLesson.quizScore = percentage;
          targetLesson.quizCompleted = true; // Passing threshold
          
          if (targetLesson.quizCompleted && !targetLesson.completed) {
            targetLesson.completed = true;
          }
          
          // Recalc progress
          updateProgress(course);
          return { courses: [...state.courses] };
        }),
      
      // Helper to recalc progress (module: % lessons complete, course: avg module %)
      // Call this internally after updates
    }),
    {
      name: 'learning-progress', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Internal helper (not exposed)
const updateProgress = (course: Course) => {
  course.modules.forEach(module => {
    const completedLessons = module.lessons.filter(l => l.completed).length;
    module.progress = Math.round((completedLessons / module.lessons.length) * 100);
  });
  
  const avgModuleProgress = course.modules.reduce((sum, m) => sum + m.progress, 0) / course.modules.length;
  course.progress = Math.round(avgModuleProgress);
};