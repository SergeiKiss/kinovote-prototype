import Image from 'next/image';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import type { ContentItem } from '@/app/page';
import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
  onClick: () => void;
  layout?: 'vertical' | 'horizontal';
}

export function ContentCard({ item, onClick, layout = 'vertical' }: ContentCardProps) {
  if (layout === 'horizontal') {
      return (
      <Card
        className="w-full overflow-hidden border-2 border-transparent bg-card cursor-pointer transition-all duration-300 transform-gpu hover:border-primary hover:shadow-2xl hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background flex"
        onClick={onClick}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
        tabIndex={0}
        role="button"
        aria-label={`Показать детали для ${item.title}`}
      >
        <div className="aspect-[2/3] relative bg-card rounded-l-md w-1/3 flex-shrink-0">
          <Image
            src={item.image}
            alt={`Постер для ${item.title}`}
            fill
            className="object-cover rounded-l-md"
            sizes="(max-width: 768px) 33vw, 33vw"
            data-ai-hint={item.aiHint}
          />
        </div>
        <CardContent className="p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
            <p className="text-muted-foreground mt-2 line-clamp-3">{item.description}</p>
          </div>
          <div className="flex items-center space-x-6 text-foreground/70 mt-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <span>{item.votes.up.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <span>{item.votes.down.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      )
  }
    
  return (
    <Card
      className="w-full overflow-hidden border-2 border-transparent bg-card cursor-pointer transition-all duration-300 transform-gpu hover:scale-105 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`Показать детали для ${item.title}`}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative bg-card rounded-md">
          <Image
            src={item.image}
            alt={`Постер для ${item.title}`}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={item.aiHint}
          />
        </div>
      </CardContent>
    </Card>
  );
}
