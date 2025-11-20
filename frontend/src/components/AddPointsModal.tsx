import { X } from 'lucide-react';
import React, { useState } from 'react';

interface AddPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (points: number) => void;
  onReset: () => void;
  businessName: string;
  maxPoints: number;
}

export function AddPointsModal({ isOpen, onClose, onSubmit, onReset, businessName, maxPoints }: AddPointsModalProps) {
  const [points, setPoints] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(points);
    onClose();
    setPoints(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Add Points to {businessName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Points to Add: <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 ml-2">{points}</span>
            </label>

            <div className="relative w-full h-6">
              <input
                type="range"
                min="1"
                max={maxPoints}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>1</span>
              <span>{Math.floor(maxPoints / 2)}</span>
              <span>{maxPoints}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset points to 0?')) {
                  onReset();
                  onClose();
                }
              }}
              className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg font-bold hover:bg-red-200 transition-colors"
            >
              Reset Points
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Add Points
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
