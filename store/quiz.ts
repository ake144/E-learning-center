import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Course } from '@/utils/data/course';
import api from '@/lib/api';

type ProgressState = {
  courses: Course[];
  fetchCourses: () => Promise<void>;
  updateVideoProgress: (courseSlug: string, lessonId: number, progress: number) => void;
  submitQuiz: (courseSlug: string, lessonId: number, answers: Record<string, string>) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      courses: [],

      fetchCourses: async () => {
        try {
          const response = await api.get('/courses');
          const fetchedCourses: Course[] = response.data;
          
          // Merge with existing progress if needed, or just overwrite if we trust the backend to have progress
          // For now, let's assume we want to keep local progress but update course structure
          // This is complex. Let's just load them and initialize progress if missing.
          
          set((state) => {
            const mergedCourses = fetchedCourses.map(fetchedCourse => {
              const existingCourse = state.courses.find(c => c.slug === fetchedCourse.slug);
              if (existingCourse) {
                // Keep existing progress
                return existingCourse; 
                // Note: This doesn't handle course updates (new lessons). 
                // Ideally we should merge lesson by lesson.
              }
              
              // Initialize new course
              return {
                ...fetchedCourse,
                progress: 0,
                modules: fetchedCourse.modules.map(module => ({
                  ...module,
                  progress: 0,
                  lessons: module.lessons.map((lesson: any) => ({
                    ...lesson,
                    completed: false,
                    videoProgress: 0,
                    hasQuiz: (Array.isArray(lesson?.quiz) && lesson.quiz.length > 0) || (Array.isArray(lesson?.questions) && lesson.questions.length > 0),
                    quiz: lesson?.quiz || lesson?.questions || [],
                    quizAnswers: {},
                    quizScore: 0,
                    quizCompleted: false,
                  })),
                })),
              };
            });
            return { courses: mergedCourses };
          });
        } catch (error) {
          console.error("Failed to fetch courses", error);
        }
      },
      
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