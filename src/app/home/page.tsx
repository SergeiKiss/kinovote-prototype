'use client';

import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WelcomeBanner } from '@/components/welcome-banner';
import { TopVotedSection } from '@/components/top-voted-section';
import { ContentItem } from '@/lib/types';

export default function HomePage({
  content,
  onItemClick,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
  onCTAClick: () => void;
}) {
  const router = useRouter();

  return (
    <ScrollArea className="h-full flex-grow">
      <div className="p-6 md:p-8">
        <WelcomeBanner onCTAClick={() => router.push('/voting')} />
        <TopVotedSection items={content} onItemClick={onItemClick} />
      </div>
    </ScrollArea>
  );
}
