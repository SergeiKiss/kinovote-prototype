'use client';

import { useMemo } from 'react';
import { ContentCard } from '@/components/content-card';
import { ContentItem } from '@/lib/types';

export const TopVotedSection = ({
  items,
  onItemClick,
}: {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}) => {
  const topItems = useMemo(() => {
    return [...items]
      .sort((a, b) => b.votes.up - a.votes.up)
      .slice(0, 3);
  }, [items]);

  return (
    <div className="mt-12 animate-in fade-in-50">
      <h3 className="text-2xl font-bold tracking-tight mb-6">
        Топ-3 премьеры
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topItems.map(item => (
          <ContentCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
};
