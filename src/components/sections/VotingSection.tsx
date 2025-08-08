'use client';

import { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/content-card';
import { Film, Tv } from 'lucide-react';
import { ContentItem } from '@/lib/types';
// Горизонтальная прокрутка на нативном скролле с snap

export default function VotingSection({
  content,
  onItemClick,
  onNavigate,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  onNavigate: (section: 'home' | 'movies' | 'series' | 'voting') => void;
}) {
  const goMovies = useCallback(() => onNavigate('movies'), [onNavigate]);
  const goSeries = useCallback(() => onNavigate('series'), [onNavigate]);

  // интерфейс без контролов — все свайпом/скроллом

  return (
    <div className="flex flex-col h-full animate-in fade-in-50 p-6 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Топы недели</h2>
        <div className="flex flex-wrap gap-6 mb-8">
          <Card
            className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer"
            onClick={goMovies}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Топы фильмов</h3>
              </div>
              <p className="text-sm text-muted-foreground">Самые популярные фильмы недели</p>
            </div>
            <div className="text-right mt-4">
              <Button variant="ghost" size="sm">Перейти</Button>
            </div>
          </Card>
          <Card
            className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer"
            onClick={goSeries}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tv className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Топы сериалов</h3>
              </div>
              <p className="text-sm text-muted-foreground">Самые популярные сериалы недели</p>
            </div>
            <div className="text-right mt-4">
              <Button variant="ghost" size="sm">Перейти</Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Карточка нового контента</h2>
        <div className="relative">
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-6 snap-x snap-mandatory">
              {content.map((item) => (
                <div
                  key={item.id}
                  className="snap-start shrink-0 w-[60vw] sm:w-[48vw] md:w-[34vw] lg:w-[24vw] xl:w-[20vw] 2xl:w-[16vw]"
                >
                  <ContentCard
                    item={item}
                    onClick={() => onItemClick(item)}
                    layout="vertical"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


