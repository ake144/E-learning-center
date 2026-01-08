import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover?: string; // mapped from images
  images?: string;
  progress: number;
  longDescription?: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: string;
  priceETB?: number;
  pages?: number;
  language?: string;
  format?: string;
  Publisher?: string;
  edition?: string;
  isbn?: string;
  rating?: number;
  reviews?: number;
  downloadUrl?: string;
}

interface BooksState {
  purchasedBooks: Book[];
  isLoading: boolean;
  error: string | null;

  fetchPurchasedBooks: () => Promise<void>;
}

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      purchasedBooks: [],
      isLoading: false,
      error: null,

      fetchPurchasedBooks: async () => {
        set({ isLoading: true, error: null });
        try {
          // Assuming an endpoint exists to get purchased books
          // If not detailed, we might need to fetch user purchases and then book details,
          // or a dedicated /users/me/books endpoint.
          // For now, let's assume we can get it from an endpoint like /users/me/books or similar.
          // Adjust the endpoint as per actual backend implementation.
          
          const response = await api.get('/users/me/books'); 
          // Mapping data if necessary to match Book interface
          const books = response.data.map((item: any) => ({
            ...item.book,
            cover: item.book.images || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60", // Fallback or map
            progress: 0 // Initialize progress as 0 if not tracked yet, otherwise fetch from backend if available
          }));
          
          set({ purchasedBooks: books, isLoading: false });
        } catch (error: any) {
          console.error("Failed to fetch purchased books:", error);
          set({ error: error.message, isLoading: false });
        }
      },
    }),
    {
      name: 'books-storage',
    }
  )
);
