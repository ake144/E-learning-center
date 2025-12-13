import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Note {
    id: string;
    title: string;
    content: string;
    subject: string;
    date: string;
    tags: string[];
    starred: boolean;
}

interface NotesState {
    notes: Note[];

    // Actions
    addNote: (note: Omit<Note, 'id' | 'date'>) => void;
    updateNote: (id: string, updates: Partial<Note>) => void;
    deleteNote: (id: string) => void;
    toggleNoteStar: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
    persist(
        (set) => ({
            notes: [],

            addNote: (noteData) => {
                const newNote: Note = {
                    id: crypto.randomUUID(),
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    ...noteData,
                };
                set((state) => ({ notes: [newNote, ...state.notes] }));
            },

            updateNote: (id, updates) => {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, ...updates } : note
                    ),
                }));
            },

            deleteNote: (id) => {
                set((state) => ({
                    notes: state.notes.filter((note) => note.id !== id),
                }));
            },

            toggleNoteStar: (id) => {
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, starred: !note.starred } : note
                    ),
                }));
            },
        }),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
