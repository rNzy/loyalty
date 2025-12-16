import { CreditCard, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddCard: () => void;
}

export function EmptyState({ onAddCard }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-full mb-6">
        <CreditCard size={64} className="text-purple-600 dark:text-purple-400" />
      </div>
      
      <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
        No Loyalty Cards Yet
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8 leading-relaxed">
        Start building your digital wallet by adding your favorite stores' loyalty cards. 
        Track your points and never miss a reward!
      </p>
      
      <button
        onClick={onAddCard}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <Plus size={20} />
        Add Your First Card
      </button>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📱</div>
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Digital Wallet</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Keep all your loyalty cards in one place</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎯</div>
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Track Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Watch your points grow with each visit</p>
        </div>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎁</div>
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Never Miss Rewards</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when rewards are ready</p>
        </div>
      </div>
    </div>
  );
}

