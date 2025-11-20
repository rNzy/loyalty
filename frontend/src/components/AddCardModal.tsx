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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Add Loyalty Card</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g. Coffee Shop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Points</label>
            <input
              type="number"
              required
              min="1"
              value={targetPoints}
              onChange={(e) => setTargetPoints(Number(e.target.value))}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
}
