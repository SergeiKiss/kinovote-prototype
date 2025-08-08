'use client';

import { useCallback, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ContentCard } from '@/components/content-card';
import { SimpleSlider } from '@/components/simple-slider';
import { Film, Tv, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Карусель удалена — используем статичную сетку

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

  // Карусель на Embla: свайп/drag по умолчанию

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

  const baseTopMovies = useMemo(
    () => [...content].filter((c) => c.type === 'movie').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [content]
  );
  const baseTopSeries = useMemo(
    () => [...content].filter((c) => c.type === 'series').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [content]
  );

  const filteredMovies = useMemo(
    () => [...filtered].filter((c) => c.type === 'movie').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [filtered]
  );
  const filteredSeries = useMemo(
    () => [...filtered].filter((c) => c.type === 'series').sort((a, b) => b.votes.up - a.votes.up).slice(0, 3),
    [filtered]
  );

  const useMoviesFallback = filteredMovies.length === 0 && selectedGenre !== 'Все жанры';
  const useSeriesFallback = filteredSeries.length === 0 && selectedGenre !== 'Все жанры';

  const topMovies = useMoviesFallback ? baseTopMovies : filteredMovies;
  const topSeries = useSeriesFallback ? baseTopSeries : filteredSeries;

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
        <div className="flex flex-wrap gap-6 mb-8">
          <Card className="p-4 bg-card w-[500px]">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Топ-3 фильмов</h3>
            </div>
            <ul className="space-y-3">
              {topMovies.map((item, idx) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="text-sm w-5 text-muted-foreground">{idx + 1}.</div>
                  <div className="flex-1">
                    <div className="font-medium leading-tight cursor-pointer hover:underline" onClick={() => onItemClick(item)}>
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-foreground/70">
                      <span className="inline-flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5 text-green-500" />{item.votes.up.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1"><ThumbsDown className="h-3.5 w-3.5 text-red-500" />{item.votes.down.toLocaleString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-4 bg-card w-[500px]">
            <div className="flex items-center gap-2 mb-4">
              <Tv className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Топ-3 сериалов</h3>
            </div>
            <ul className="space-y-3">
              {topSeries.map((item, idx) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="text-sm w-5 text-muted-foreground">{idx + 1}.</div>
                  <div className="flex-1">
                    <div className="font-medium leading-tight cursor-pointer hover:underline" onClick={() => onItemClick(item)}>
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-foreground/70">
                      <span className="inline-flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5 text-green-500" />{item.votes.up.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1"><ThumbsDown className="h-3.5 w-3.5 text-red-500" />{item.votes.down.toLocaleString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Карточка нового контента</h2>
        <SimpleSlider>
          {content.map((item) => (
            <ContentCard key={item.id} item={item} onClick={() => onItemClick(item)} layout="vertical" />
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
}


