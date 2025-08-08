'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentCard } from '@/components/content-card';
import { ContentItem } from '@/lib/types';

export default function MoviesSection({
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
        <div className="grid grid-cols-2 gap-8 animate-in fade-in-50">
          {content.map((item) => (
            <div key={item.id} className="w-[150px] h-[200px]">
              <ContentCard
                item={item}
                onClick={() => onItemClick(item)}
                layout="vertical"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}


