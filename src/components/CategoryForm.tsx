import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface CategoryFormProps {
  onSubmit: (name: string, color: string) => void;
}

export function CategoryForm({ onSubmit }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit(name, color);
    setName('');
    setColor('#3b82f6');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900">Nouvelle Catégorie</h2>
      
      <div>
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Vocabulaire"
        />
      </div>
      
      <div>
        <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-700">
          Couleur
        </label>
        <input
          type="color"
          id="categoryColor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Ajouter la Catégorie
      </button>
    </form>
  );
}