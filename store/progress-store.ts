import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
    completedLessons: string[]; // Array of lesson IDs (e.g., "courseSlug-lessonId")

    // Actions
    markLessonComplete: (courseSlug: string, lessonId: number) => void;
    markLessonIncomplete: (courseSlug: string, lessonId: number) => void;
    isLessonCompleted: (courseSlug: string, lessonId: number) => boolean;
    getCourseProgress: (courseSlug: string, totalLessons: number) => number;
}

export const useProgressCourseStore = create<ProgressState>()(
    persist(
        (set, get) => ({
            completedLessons: [],

            markLessonComplete: (courseSlug: string, lessonId: number) => {
                const key = `${courseSlug}-${lessonId}`;
                const current = get().completedLessons;
                if (!current.includes(key)) {
                    set({ completedLessons: [...current, key] });
                }
            },

            markLessonIncomplete: (courseSlug: string, lessonId: number) => {
                const key = `${courseSlug}-${lessonId}`;
                set({ completedLessons: get().completedLessons.filter((id) => id !== key) });
            },

            isLessonCompleted: (courseSlug: string, lessonId: number) => {
                return get().completedLessons.includes(`${courseSlug}-${lessonId}`);
            },

            getCourseProgress: (courseSlug: string, totalLessons: number) => {
                if (totalLessons === 0) return 0;
                const completedCount = get().completedLessons.filter((id) =>
                    id.startsWith(`${courseSlug}-`)
                ).length;
                return Math.round((completedCount / totalLessons) * 100);
            },
        }),
        {
            name: 'progress-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
