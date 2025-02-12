import React, { useState } from 'react';
import { Category } from '../types';
import { PlusCircle } from 'lucide-react';

interface FlashcardFormProps {
  categories: Category[];
  onSubmit: (data: { front: string; back: string; category: string }) => void;
}

export function FlashcardForm({ categories, onSubmit }: FlashcardFormProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    
    onSubmit({ front, back, category });
    setFront('');
    setBack('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="front" className="block text-sm font-medium text-gray-700">
          Front
        </label>
        <input
          type="text"
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter the question or term"
        />
      </div>
      
      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700">
          Back
        </label>
        <input
          type="text"
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter the answer or definition"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Flashcard
      </button>
    </form>
  );
}