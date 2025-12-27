import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  enrolledCourses: string[]; // Array of course slugs
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  pendingEmail: string | null; // Email waiting for OTP verification
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  setUser: (user: User, token: string) => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setPendingEmail: (email: string | null) => void;
  enrollCourse: (courseSlug: string) => void;
  isEnrolled: (courseSlug: string) => boolean;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      pendingEmail: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { user, access_token } = response.data;
          const mappedUser = {
            ...user,
            enrolledCourses: user.enrollments?.map((e: any) => e.course.slug) || [],
          };
          set({
            user: mappedUser,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Login failed',
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', data);
          const { user, access_token } = response.data;
          const mappedUser = {
            ...user,
            enrolledCourses: user.enrollments?.map((e: any) => e.course.slug) || [],
          };
          set({
            user: mappedUser,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Registration failed',
          });
          throw error;
        }
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setPendingEmail: (email: string | null) => {
        set({ pendingEmail: email });
      },

      enrollCourse: (courseSlug: string) => {
        const currentUser = get().user;
        if (currentUser && !currentUser.enrolledCourses.includes(courseSlug)) {
          set({
            user: {
              ...currentUser,
              enrolledCourses: [...currentUser.enrolledCourses, courseSlug],
            },
          });
        }
      },

      isEnrolled: (courseSlug: string) => {
        const currentUser = get().user;
        return currentUser?.enrolledCourses.includes(courseSlug) ?? false;
      },

      signOut: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          pendingEmail: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
