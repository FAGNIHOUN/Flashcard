import React, { useState } from 'react';
import { useFlashcards } from './hooks/useFlashcards';
import { FlashcardForm } from './components/FlashcardForm';
import { CategoryForm } from './components/CategoryForm';
import { Flashcard } from './components/Flashcard';
import { Brain } from 'lucide-react';

function App() {
  const { flashcards, categories, addCard, toggleMastery, deleteCard, addCategory } = useFlashcards();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMastered, setShowMastered] = useState(true);

  const filteredCards = flashcards.filter(
    (card) =>
      (selectedCategory === 'all' || card.category === selectedCategory) &&
      (showMastered || !card.mastered)
  );

  // Filter out cards with invalid categories
  const validCards = filteredCards.filter(card => 
    categories.some(cat => cat.id === card.category)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <CategoryForm onSubmit={addCategory} />
              
              <div className="mt-6">
                <FlashcardForm categories={categories} onSubmit={addCard} />
              </div>
              
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Filtres</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Catégorie
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="all">Toutes les Catégories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showMastered"
                      checked={showMastered}
                      onChange={(e) => setShowMastered(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="showMastered"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Afficher les cartes maîtrisées
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {validCards.map((card) => {
                  const category = categories.find((c) => c.id === card.category);
                  if (!category) return null;
                  
                  return (
                    <Flashcard
                      key={card.id}
                      card={card}
                      category={category}
                      onToggleMastery={toggleMastery}
                      onDelete={deleteCard}
                    />
                  );
                })}
                {validCards.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">Aucune flashcard trouvée. Créez-en une pour commencer !</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;