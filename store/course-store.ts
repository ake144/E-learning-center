import { create } from 'zustand';
import api from '@/lib/api';
import { Course } from '@/utils/data/course';

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  
  fetchCourses: () => Promise<void>;
  getCourseBySlug: (slug: string) => Promise<Course | undefined>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/courses');
      set({ courses: response.data, isLoading: false });
    } catch (error: any) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || 'Failed to fetch courses' 
      });
    }
  },

  getCourseBySlug: async (slug: string) => {
    const existingCourse = get().courses.find(c => c.slug === slug);
    if (existingCourse) return existingCourse;

    try {
      const response = await api.get(`/courses/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch course details', error);
      return undefined;
    }
  }
}));
