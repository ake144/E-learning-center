import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Course } from '@/utils/data/course';

interface CartState {
    items: Course[];
    addItem: (course: Course) => void;
    removeItem: (courseSlug: string) => void;
    clearCart: () => void;
    isInCart: (courseSlug: string) => boolean;
    total: number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            total: 0,

            addItem: (course: Course) => {
                const { items } = get();
                if (!items.find(item => item.slug === course.slug)) {
                    const newItems = [...items, course];
                    set({
                        items: newItems,
                        total: newItems.reduce((sum, item) => sum + item.price, 0)
                    });
                }
            },

            removeItem: (courseSlug: string) => {
                const { items } = get();
                const newItems = items.filter(item => item.slug !== courseSlug);
                set({
                    items: newItems,
                    total: newItems.reduce((sum, item) => sum + item.price, 0)
                });
            },

            clearCart: () => {
                set({ items: [], total: 0 });
            },

            isInCart: (courseSlug: string) => {
                return !!get().items.find(item => item.slug === courseSlug);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
