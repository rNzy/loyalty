import { twMerge } from 'tailwind-merge';

interface CardProps {
  businessName: string;
  points: number;
  targetPoints: number;
  color: string;
  onAddPoints?: () => void;
}

export function CardItem({ businessName, points, targetPoints, color, onAddPoints }: CardProps) {
  const progress = Math.min((points / targetPoints) * 100, 100);
  const isFulfilled = points >= targetPoints;

  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-xl p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer",
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      )}
      style={{ borderTop: `4px solid ${color}` }}
      onClick={onAddPoints}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{businessName}</h3>
        <div className="text-sm font-medium opacity-70">{points} / {targetPoints} pts</div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
        <div
          className="h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>

      {isFulfilled && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-bl-lg animate-pulse">
          REWARD!
        </div>
      )}
    </div>
  );
}
