import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface FireworksProps {
  isVisible: boolean;
  onDismiss: () => void;
  color?: string;
  businessName?: string;
}

export function Fireworks({ isVisible, onDismiss, color, businessName }: FireworksProps) {
  useEffect(() => {
    if (!isVisible) return;

    const colors = color ? [color, '#FFD700', '#FFF'] : ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#FFF'];

    const fireConfetti = (origin: { x: number; y: number }, angle: number, spread: number) => {
      confetti({
        particleCount: 100,
        angle,
        spread,
        origin,
        colors,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        startVelocity: 45,
        shapes: ['circle', 'square'],
        scalar: 1.2,
      });
    };

    const fireBurst = (origin: { x: number; y: number }) => {
      const angles = [60, 90, 120];
      angles.forEach(angle => {
        fireConfetti(origin, angle, 60);
      });
    };

    fireBurst({ x: 0.25, y: 0.6 });
    
    setTimeout(() => fireBurst({ x: 0.75, y: 0.6 }), 300);
    setTimeout(() => fireBurst({ x: 0.5, y: 0.5 }), 600);
    setTimeout(() => {
      fireConfetti({ x: 0.5, y: 0.8 }, 90, 120);
    }, 900);

    const autoDismissTimer = setTimeout(() => {
      onDismiss();
    }, 4500);

    return () => {
      clearTimeout(autoDismissTimer);
    };
  }, [isVisible, onDismiss, color]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm cursor-pointer animate-fade-in flex items-center justify-center"
      style={{
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      {businessName && (
        <div 
          className="text-center px-8 py-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-2xl"
          style={{
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
            Congratulations!
          </h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {businessName}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Loyalty Card Complete!
          </p>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

