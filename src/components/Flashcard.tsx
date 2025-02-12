import React, { useState } from 'react';
import { Flashcard as FlashcardType, Category } from '../types';
import { Check, X, RotateCw } from 'lucide-react';

interface FlashcardProps {
  card: FlashcardType;
  category: Category;
  onToggleMastery: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Flashcard({ card, category, onToggleMastery, onDelete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative h-64 cursor-pointer perspective-1000 ${
        card.mastered ? 'opacity-75' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6"
          style={{ borderLeft: `4px solid ${category.color}` }}
        >
          <div className="flex justify-between items-start">
            <span
              className="inline-block px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: category.color + '20', color: category.color }}
            >
              {category.name}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMastery(card.id);
                }}
                className={`p-1 rounded-full ${
                  card.mastered
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="p-1 rounded-full bg-red-100 text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">{card.front}</p>
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <RotateCw className="w-5 h-5 mx-auto text-gray-400" />
          </div>
        </div>
        
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180"
          style={{ borderLeft: `4px solid ${category.color}` }}
        >
          <div className="h-full flex items-center justify-center">
            <p className="text-lg font-medium">{card.back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}