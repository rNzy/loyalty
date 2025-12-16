import { X, Pencil, Check } from 'lucide-react';
import React, { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

interface AddPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (points: number) => void;
  onReset: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  businessName: string;
  maxPoints: number;
  currentPoints: number;
}

export function AddPointsModal({ isOpen, onClose, onSubmit, onReset, onDelete, onRename, businessName, maxPoints, currentPoints }: AddPointsModalProps) {
  const [points, setPoints] = useState(1);
  const [inputValue, setInputValue] = useState('1');
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(businessName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(points);
    onClose();
    setPoints(1);
    setInputValue('1');
  };

  const handleSaveRename = () => {
    if (editedName.trim() && editedName !== businessName) {
      onRename(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setEditedName(businessName);
    setIsEditingName(false);
  };

  const remainingPoints = Math.max(0, currentPoints - maxPoints);
  const resetMessage = remainingPoints > 0 
    ? `This will reset the card and keep ${remainingPoints} excess point${remainingPoints !== 1 ? 's' : ''}.`
    : 'This will reset all points to 0.';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 flex-1 mr-4">
              {isEditingName ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    className="flex-1 text-2xl font-bold dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveRename}
                    className="text-green-600 hover:text-green-700 dark:text-green-400"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold dark:text-white">Add Points to {businessName}</h2>
                  <button
                    onClick={() => {
                      setEditedName(businessName);
                      setIsEditingName(true);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    <Pencil size={18} />
                  </button>
                </>
              )}
            </div>
            {!isEditingName && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
                <X size={24} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Points to Add:
                </label>
                <input
                  type="number"
                  min="1"
                  max={maxPoints}
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    setInputValue(value);
                    
                    if (value !== '') {
                      const numValue = Number(value);
                      if (numValue >= 1 && numValue <= maxPoints) {
                        setPoints(numValue);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value === '' || Number(value) < 1) {
                      setPoints(1);
                      setInputValue('1');
                    } else if (Number(value) > maxPoints) {
                      setPoints(maxPoints);
                      setInputValue(String(maxPoints));
                    } else {
                      setPoints(Number(value));
                      setInputValue(value);
                    }
                  }}
                  className="w-24 px-3 py-2 text-center text-2xl font-bold text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                />
              </div>

              <div className="relative w-full h-6">
                <input
                  type="range"
                  min="1"
                  max={maxPoints}
                  value={points}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setPoints(value);
                    setInputValue(String(value));
                  }}
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
                onClick={() => setIsConfirmDeleteOpen(true)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmResetOpen(true)}
                className="flex-1 bg-orange-100 text-orange-700 py-2 rounded-lg font-bold hover:bg-orange-200 transition-colors"
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

      <ConfirmationModal
        isOpen={isConfirmResetOpen}
        onClose={() => setIsConfirmResetOpen(false)}
        onConfirm={() => {
          onReset();
          onClose();
        }}
        title="Reset Points?"
        message={resetMessage}
        confirmText="Reset"
        confirmButtonClass="bg-orange-600 hover:bg-orange-700"
      />

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={() => {
          onDelete();
          onClose();
        }}
        title="Delete Card?"
        message={`Are you sure you want to delete the ${businessName} loyalty card? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
      />
    </>
  );
}
