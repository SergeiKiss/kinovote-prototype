'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentCard } from '@/components/content-card';
import { ContentItem } from '@/lib/types';

export default function MoviesPage({
  content,
  onItemClick,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}) {
  return (
    <ScrollArea className="h-full flex-grow">
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight capitalize mb-8 animate-in fade-in-50">
          Фильмы
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 animate-in fade-in-50">
          {content.map(item => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
