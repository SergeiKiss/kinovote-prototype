'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ContentCard } from '@/components/content-card';
import { Film, Tv } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const onWheelHorizontal = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    // конвертируем вертикальный скролл в горизонтальный
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }
  }, []);

  const genres = useMemo(() => {
    const set = new Set<string>(['Все жанры']);
    content.forEach((c) => set.add(c.genre));
    return Array.from(set);
  }, [content]);

  const [selectedGenre, setSelectedGenre] = useState<string>('Все жанры');

  const filtered = useMemo(() => {
    return selectedGenre === 'Все жанры'
      ? content
      : content.filter((c) => c.genre === selectedGenre);
  }, [content, selectedGenre]);

  const topMovies = useMemo(
    () => [...filtered].filter(c => c.type === 'movie').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [filtered]
  );
  const topSeries = useMemo(
    () => [...filtered].filter(c => c.type === 'series').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [filtered]
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in-50 p-6 md:p-8">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Топы недели</h2>
          <div className="w-56">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Топ-3 фильмов</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topMovies.map((item) => (
                <ContentCard key={item.id} item={item} onClick={() => onItemClick(item)} layout="horizontal" />
              ))}
            </div>
          </Card>
          <Card className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Tv className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Топ-3 сериалов</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topSeries.map((item) => (
                <ContentCard key={item.id} item={item} onClick={() => onItemClick(item)} layout="horizontal" />
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Карточка нового контента</h2>
        <div className="relative">
          <div
            ref={scrollerRef}
            onWheel={onWheelHorizontal}
            className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain"
          >
            <div className="flex gap-6 snap-x snap-mandatory pb-2">
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


