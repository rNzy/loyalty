import { X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmButtonClass?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black tracking-tight dark:text-white bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-medium">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-200 py-3 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 text-white py-3 rounded-2xl font-bold transition-all transform active:scale-[0.98] shadow-lg ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

