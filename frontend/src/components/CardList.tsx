import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getCardsControllerFindAllQueryKey, useCardsControllerFindAll, useCardsControllerRemove, useCardsControllerUpdate } from '../api/endpoints/cards/cards';
import type { Card } from '../api/model';
import { AddPointsModal } from './AddPointsModal';
import { CardItem } from './CardItem';
import { EmptyState } from './EmptyState';
import { Fireworks } from './Fireworks';

interface CardListProps {
  onAddCard?: () => void;
}

export function CardList({ onAddCard }: CardListProps) {
  const { data: response, isLoading, error } = useCardsControllerFindAll();
  const queryClient = useQueryClient();
  const { mutate: updateCard } = useCardsControllerUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCardsControllerFindAllQueryKey() });
      }
    }
  });
  
  const { mutate: deleteCard } = useCardsControllerRemove({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCardsControllerFindAllQueryKey() });
      }
    }
  });

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworksColor, setFireworksColor] = useState<string | undefined>();
  const [fireworksBusinessName, setFireworksBusinessName] = useState<string | undefined>();

  const cards = Array.isArray(response?.data) ? response.data : [];

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsPointsModalOpen(true);
  };

  const handleAddPoints = (points: number) => {
    if (!selectedCard) return;
    
    const wasNotFulfilled = selectedCard.points < selectedCard.targetPoints;
    const newPoints = selectedCard.points + points;
    const willBeFulfilled = newPoints >= selectedCard.targetPoints;
    
    if (wasNotFulfilled && willBeFulfilled) {
      setFireworksColor(selectedCard.color);
      setFireworksBusinessName(selectedCard.businessName);
      setShowFireworks(true);
    }
    
    updateCard({
      id: selectedCard.id.toString(),
      data: { points: newPoints }
    });
  };

  const handleRename = (newName: string) => {
    if (!selectedCard) return;
    updateCard({
      id: selectedCard.id.toString(),
      data: { businessName: newName }
    });
  };

  if (isLoading) return <div className="p-8 text-center">Loading cards...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading cards</div>;

  if (cards.length === 0) {
    return <EmptyState onAddCard={() => onAddCard?.()} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            {...card}
            onAddPoints={() => handleCardClick(card)}
          />
        ))}
      </div>

      {selectedCard && (
        <AddPointsModal
          isOpen={isPointsModalOpen}
          onClose={() => setIsPointsModalOpen(false)}
          onSubmit={handleAddPoints}
          onReset={() => {
            if (!selectedCard) return;
            const remainingPoints = Math.max(0, selectedCard.points - selectedCard.targetPoints);
            updateCard({
              id: selectedCard.id.toString(),
              data: { points: remainingPoints }
            });
          }}
          onDelete={() => {
            if (!selectedCard) return;
            deleteCard({ id: selectedCard.id.toString() });
            setIsPointsModalOpen(false);
          }}
          onRename={handleRename}
          businessName={selectedCard.businessName}
          maxPoints={selectedCard.targetPoints}
          currentPoints={selectedCard.points}
        />
      )}

      <Fireworks
        isVisible={showFireworks}
        onDismiss={() => setShowFireworks(false)}
        color={fireworksColor}
        businessName={fireworksBusinessName}
      />
    </>
  );
}
