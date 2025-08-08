'use client';

import Image from 'next/image';
import { ThumbsUp, ThumbsDown, PlayCircle, X, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StatisticsModal } from '@/components/statistics-modal';
import { ContentItem, Vote } from '@/lib/types';

export function DetailedView({
  item,
  onBack,
  onVote,
  userVote,
}: {
  item: ContentItem;
  onBack: () => void;
  onVote: (itemId: number, voteType: 'up' | 'down') => void;
  userVote: Vote;
}) {
    const typeText = item.type === 'movie' ? 'Фильм' : 'Сериал';
  return (
    <div className="animate-in fade-in-50">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-lg text-foreground/80 hover:text-foreground"
      >
        <X className="mr-2 h-5 w-5" />
        Назад к списку
      </Button>
      <div className="relative md:flex md:space-x-8">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="aspect-[2/3] relative bg-card rounded-lg shadow-lg shadow-black/30">
            <Image
              src={item.image}
              alt={`Постер для ${item.title}`}
              width={400}
              height={600}
              className="rounded-lg object-cover w-full"
              data-ai-hint={item.aiHint}
            />
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:w-2/3">
          <Badge variant="outline" className="mb-2 border-primary text-primary">
            {typeText.toUpperCase()}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {item.title}
          </h2>
          <p className="mt-4 text-base text-foreground/70">{item.description}</p>
          
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-foreground/80">
              <div><strong className="font-semibold text-foreground">Жанр:</strong> {item.genre}</div>
              <div><strong className="font-semibold text-foreground">Страна:</strong> {item.country}</div>
              <div><strong className="font-semibold text-foreground">Режиссер:</strong> {item.director}</div>
              <div><strong className="font-semibold text-foreground">Актеры:</strong> {item.actors.join(', ')}</div>
          </div>

          <div className="mt-8 flex items-center space-x-6">
            <Button size="lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              Смотреть трейлер
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full h-14 w-14',
                  userVote === 'up' && 'bg-primary/20 text-primary',
                  'disabled:opacity-50'
                )}
                onClick={() => onVote(item.id, 'up')}
                aria-label="Голосовать за"
                disabled={!!userVote}
              >
                <ThumbsUp className="h-7 w-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full h-14 w-14',
                  userVote === 'down' && 'bg-destructive/20 text-destructive',
                  'disabled:opacity-50'
                )}
                onClick={() => onVote(item.id, 'down')}
                aria-label="Голосовать против"
                disabled={!!userVote}
              >
                <ThumbsDown className="h-7 w-7" />
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <BarChart2 className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <StatisticsModal item={item} />
            </Dialog>
          </div>
          <div className="mt-4 flex items-center space-x-6 text-foreground/70 text-base">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <span>{item.votes.up.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <span>{item.votes.down.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
