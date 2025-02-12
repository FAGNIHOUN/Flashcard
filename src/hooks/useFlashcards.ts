import { useState, useEffect } from 'react';
import { Flashcard, Category } from '../types';

const STORAGE_KEY = 'flashcards-data';

interface FlashcardsData {
  cards: Flashcard[];
  categories: Category[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'General', color: '#3b82f6' },
  { id: '2', name: 'Languages', color: '#ef4444' },
  { id: '3', name: 'Science', color: '#10b981' },
];

const initialData: FlashcardsData = {
  cards: [],
  categories: DEFAULT_CATEGORIES,
};

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: FlashcardsData = JSON.parse(stored);
      setFlashcards(data.cards);
      setCategories(data.categories);
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cards: flashcards, categories }));
  }, [flashcards, categories]);

  const addCard = (card: Omit<Flashcard, 'id' | 'mastered'>) => {
    const newCard: Flashcard = {
      ...card,
      id: crypto.randomUUID(),
      mastered: false,
    };
    setFlashcards(prev => [...prev, newCard]);
  };

  const toggleMastery = (id: string) => {
    setFlashcards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, mastered: !card.mastered } : card
      )
    );
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  return {
    flashcards,
    categories,
    addCard,
    toggleMastery,
    addCategory,
    deleteCard,
  };
}