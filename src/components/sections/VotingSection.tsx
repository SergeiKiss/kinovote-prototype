'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/content-card';
import { Film, Tv } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
// убран ползунок громкости — используем точки-индикаторы

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

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const updateFromApi = () => setSelectedIndex(api.selectedScrollSnap());
    const updateCount = () => setSlideCount(api.scrollSnapList().length);
    updateCount();
    updateFromApi();
    api.on('select', updateFromApi);
    api.on('reInit', () => {
      updateCount();
      updateFromApi();
    });
    return () => {
      api.off('select', updateFromApi);
    };
  }, [api]);

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
          <Carousel opts={{ align: 'center' }} setApi={setApi} className="w-full">
            <CarouselContent className="ml-0">
              {content.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-full pl-0"
                >
                  <ContentCard item={item} onClick={() => onItemClick(item)} layout="vertical" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        {slideCount > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                data-active={selectedIndex === i}
                className="h-2.5 w-2.5 rounded-full bg-foreground/30 data-[active=true]:bg-primary transition-colors"
                aria-label={`Перейти к слайду ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


