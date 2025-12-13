import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Flashcard {
    id: string;
    front: string;
    back: string;
}

export interface Deck {
    id: string;
    title: string;
    cards: Flashcard[];
}

interface FlashcardsState {
    decks: Deck[];

    // Actions
    createDeck: (title: string) => void;
    deleteDeck: (id: string) => void;
    addCard: (deckId: string, front: string, back: string) => void;
    deleteCard: (deckId: string, cardId: string) => void;
}

export const useFlashcardsStore = create<FlashcardsState>()(
    persist(
        (set) => ({
            decks: [],

            createDeck: (title) => {
                const newDeck: Deck = {
                    id: crypto.randomUUID(),
                    title,
                    cards: [],
                };
                set((state) => ({ decks: [...state.decks, newDeck] }));
            },

            deleteDeck: (id) => {
                set((state) => ({
                    decks: state.decks.filter((deck) => deck.id !== id),
                }));
            },

            addCard: (deckId, front, back) => {
                const newCard: Flashcard = {
                    id: crypto.randomUUID(),
                    front,
                    back,
                };
                set((state) => ({
                    decks: state.decks.map((deck) =>
                        deck.id === deckId
                            ? { ...deck, cards: [...deck.cards, newCard] }
                            : deck
                    ),
                }));
            },

            deleteCard: (deckId, cardId) => {
                set((state) => ({
                    decks: state.decks.map((deck) =>
                        deck.id === deckId
                            ? { ...deck, cards: deck.cards.filter((c) => c.id !== cardId) }
                            : deck
                    ),
                }));
            },
        }),
        {
            name: 'flashcards-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
