'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/content-card';
import { Film, Tv } from 'lucide-react';
import { ContentItem } from '@/lib/types';

export default function VotingPage({
  content,
  onItemClick,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full animate-in fade-in-50 p-6 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Топы недели</h2>
        <div className="flex flex-wrap gap-6 mb-8">
          <Card
            className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer"
            onClick={() => router.push('/movies')}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Топы фильмов</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Самые популярные фильмы недели
              </p>
            </div>
            <div className="text-right mt-4">
              <Button variant="ghost" size="sm">
                Перейти
              </Button>
            </div>
          </Card>
          <Card
            className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer"
            onClick={() => router.push('/series')}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tv className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Топы сериалов</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Самые популярные сериалы недели
              </p>
            </div>
            <div className="text-right mt-4">
              <Button variant="ghost" size="sm">
                Перейти
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Карточка нового контента</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
    </div>
  );
}
