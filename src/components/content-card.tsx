import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { ContentItem } from '@/app/page';

interface ContentCardProps {
  item: ContentItem;
  onClick: () => void;
}

export function ContentCard({ item, onClick }: ContentCardProps) {
  return (
    <Card
      className="w-full overflow-hidden border-0 bg-transparent cursor-pointer transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.title}`}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative">
          <Image
            src={item.image}
            alt={`Poster for ${item.title}`}
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
