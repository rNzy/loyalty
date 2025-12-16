import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddCardModal } from './components/AddCardModal';
import { CardList } from './components/CardList';

const queryClient = new QueryClient();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Loyalty Wallet
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold hover:opacity-80 transition-opacity"
          >
            <Plus size={20} />
            Add Card
          </button>
        </header>

        <main className="max-w-7xl mx-auto">
          <CardList onAddCard={() => setIsModalOpen(true)} />
        </main>

        <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
