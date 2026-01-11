import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { getCardsControllerFindAllQueryKey, useCardsControllerCreate } from '../api/endpoints/cards/cards';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const [businessName, setBusinessName] = useState('');
  const [targetPoints, setTargetPoints] = useState(10);
  const [color, setColor] = useState('#000000');

  const queryClient = useQueryClient();
  const { mutate: createCard } = useCardsControllerCreate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCardsControllerFindAllQueryKey() });
        onClose();
        setBusinessName('');
        setTargetPoints(10);
      }
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCard({
      data: {
        businessName,
        targetPoints: Number(targetPoints),
        color,
        points: 0
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/30">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black tracking-tight dark:text-white bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Add Loyalty Card
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Coffee Shop"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Target Points</label>
            <input
              type="number"
              required
              min="1"
              value={targetPoints}
              onChange={(e) => setTargetPoints(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl dark:text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Card Color</label>
            <div className="flex items-center gap-3 p-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 border-none bg-transparent cursor-pointer scale-150"
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">{color}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform transition-all active:scale-[0.98] active:brightness-90 mt-4"
          >
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
}
