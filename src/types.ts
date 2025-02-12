export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  mastered: boolean;
  lastReviewed?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}