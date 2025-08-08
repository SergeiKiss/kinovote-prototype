'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeBanner } from '@/components/welcome-banner';
import { TopVotedSection } from '@/components/top-voted-section';
import { ContentItem } from '@/lib/types';

export default function HomeSection({
  content,
  onItemClick,
  onCTAClick,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  onCTAClick: () => void;
}) {
  return (
    <ScrollArea className="h-full flex-grow">
      <div className="p-6 md:p-8">
        <WelcomeBanner onCTAClick={onCTAClick} />
        <TopVotedSection items={content} onItemClick={onItemClick} />
      </div>
    </ScrollArea>
  );
}


