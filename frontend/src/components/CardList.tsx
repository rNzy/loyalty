import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getCardsControllerFindAllQueryKey, useCardsControllerFindAll, useCardsControllerUpdate } from '../api/endpoints/cards/cards';
import type { Card } from '../api/model';
import { AddPointsModal } from './AddPointsModal';
import { CardItem } from './CardItem';

export function CardList() {
  const { data: response, isLoading, error } = useCardsControllerFindAll();
  const queryClient = useQueryClient();
  const { mutate: updateCard } = useCardsControllerUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCardsControllerFindAllQueryKey() });
      }
    }
  });

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

  const cards = Array.isArray(response?.data) ? response.data : [];

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsPointsModalOpen(true);
  };

  const handleAddPoints = (points: number) => {
    if (!selectedCard) return;
    updateCard({
      id: selectedCard.id.toString(),
      data: { points: selectedCard.points + points }
    });
  };

  if (isLoading) return <div className="p-8 text-center">Loading cards...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading cards</div>;

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
            updateCard({
              id: selectedCard.id.toString(),
              data: { points: 0 }
            });
          }}
          businessName={selectedCard.businessName}
          maxPoints={selectedCard.targetPoints}
        />
      )}
    </>
  );
}
