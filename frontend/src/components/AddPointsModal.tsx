import { Check, Pencil, X } from 'lucide-react';
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/30">
          <div className="flex justify-between items-center mb-8">
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
                    className="flex-1 text-2xl font-black tracking-tight dark:text-white bg-gray-100/50 dark:bg-gray-900/50 px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={handleSaveRename}
                      className="p-2 rounded-full text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all active:scale-90"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-90"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black tracking-tight dark:text-white bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    {businessName}
                  </h2>
                  <button
                    onClick={() => {
                      setEditedName(businessName);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all active:scale-90"
                  >
                    <Pencil size={16} />
                  </button>
                </>
              )}
            </div>
            {!isEditingName && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
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
                  className="w-24 px-4 py-3 text-center text-3xl font-black text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all"
                />
              </div>

              <div className="px-1">
                <div className="relative w-full h-8 flex items-center">
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
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-gray-400 dark:text-gray-500 mt-1">
                  <span>1 pt</span>
                  <span>{Math.floor(maxPoints / 2)} pts</span>
                  <span>{maxPoints} pts</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform transition-all active:scale-[0.98] active:brightness-90"
              >
                Add Points
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmResetOpen(true)}
                  className="bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 py-3 rounded-2xl font-bold hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all active:scale-[0.98]"
                >
                  Reset Points
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 py-3 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
                >
                  Delete Card
                </button>
              </div>
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
        confirmButtonClass="bg-orange-600 hover:bg-orange-500 shadow-orange-500/30"
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
        confirmButtonClass="bg-red-600 hover:bg-red-500 shadow-red-500/30"
      />
    </>
  );
}
