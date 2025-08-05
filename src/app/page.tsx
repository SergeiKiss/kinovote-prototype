'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, PlayCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ContentCard } from '@/components/content-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export type ContentItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'movie' | 'series';
  votes: {
    up: number;
    down: number;
  };
  trailerUrl?: string;
  aiHint: string;
};

const mockData: ContentItem[] = [
    { id: 1, title: 'Cosmic Echoes', description: 'A lone astronaut discovers a mysterious signal from the edge of the galaxy, forcing her to question reality itself.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1204, down: 58 }, aiHint: 'astronaut space' },
    { id: 2, title: 'Cyber City Chronicles', description: 'In a neon-drenched metropolis, a detective hunts a rogue AI that has learned to manipulate human memories.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2589, down: 112 }, aiHint: 'cyberpunk city' },
    { id: 3, title: 'The Last Kingdom', description: 'A historical drama about the birth of England, seen through the eyes of a Saxon nobleman raised by Vikings.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 3450, down: 230 }, aiHint: 'viking warrior' },
    { id: 4, title: 'Ocean\'s Depths', description: 'A deep-sea exploration team uncovers an ancient civilization, but they are not alone in the abyss.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 987, down: 45 }, aiHint: 'underwater exploration' },
    { id: 5, title: 'Project Chimera', description: 'A secret government experiment to create super-soldiers goes horribly wrong, unleashing a new threat on the world.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 1876, down: 301 }, aiHint: 'science fiction' },
    { id: 6, title: 'Zero Gravity', description: 'Rival corporations battle for control of a rare resource found only on asteroids, leading to a war in space.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1543, down: 99 }, aiHint: 'spaceship battle' },
    { id: 7, title: 'The Gilded Cage', description: 'In Victorian London, a young woman with a secret past infiltrates high society to expose a dark conspiracy.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2100, down: 150 }, aiHint: 'victorian london' },
    { id: 8, title: 'Nomad\'s Land', description: 'After a global catastrophe, a lone wanderer journeys across a desolate landscape in search of a rumored sanctuary.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1120, down: 88 }, aiHint: 'post apocalyptic' },
];

function DetailedView({
  item,
  onBack,
  onVote,
  userVote,
}: {
  item: ContentItem;
  onBack: () => void;
  onVote: (itemId: number, voteType: 'up' | 'down') => void;
  userVote: 'up' | 'down' | null | undefined;
}) {
  return (
    <div className="animate-in fade-in-50">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-foreground/80 hover:text-foreground"
      >
        <X className="mr-2 h-4 w-4" />
        Back to list
      </Button>
      <div className="relative md:flex md:space-x-8">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <Image
            src={item.image}
            alt={`Poster for ${item.title}`}
            width={400}
            height={600}
            className="rounded-lg object-cover w-full shadow-2xl shadow-black"
            data-ai-hint={item.aiHint}
          />
        </div>
        <div className="mt-6 md:mt-0">
          <Badge variant="outline" className="mb-2 border-primary text-primary">
            {item.type.toUpperCase()}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {item.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{item.description}</p>

          <div className="mt-8 flex items-center space-x-6">
            <Button size="lg">
              <PlayCircle className="mr-2" />
              Play Trailer
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full h-14 w-14',
                  userVote === 'up' && 'bg-primary/20 text-primary'
                )}
                onClick={() => onVote(item.id, 'up')}
                aria-label="Upvote"
              >
                <ThumbsUp className="h-7 w-7" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full h-14 w-14',
                  userVote === 'down' && 'bg-destructive/20 text-destructive'
                )}
                onClick={() => onVote(item.id, 'down')}
                aria-label="Downvote"
              >
                <ThumbsDown className="h-7 w-7" />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-6 text-foreground/70">
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

const WelcomeBanner = () => (
  <Card className="mb-8 overflow-hidden bg-gradient-to-tr from-primary/20 to-primary/5 border-primary/20 animate-in fade-in-50">
    <CardContent className="p-0">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-8 md:w-1/2">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Welcome to KinoVote</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Your hub for discovering and rating the best movies and series. Vote for your favorites and see what's trending!
          </p>
          <Button size="lg" className="mt-6">
            Start Voting
          </Button>
        </div>
        <div className="relative md:w-1/2 h-64 md:h-auto md:self-stretch">
          <Image
            src="https://placehold.co/600x400"
            alt="Cinema"
            fill
            className="object-cover"
            data-ai-hint="cinema"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const TopVotedSection = ({
  items,
  onItemClick,
}: {
  items: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}) => {
  const topItems = useMemo(() => {
    return [...items]
      .sort((a, b) => b.votes.up - a.votes.up)
      .slice(0, 4);
  }, [items]);

  return (
    <div className="mt-12 animate-in fade-in-50">
      <h3 className="text-3xl font-bold tracking-tight mb-6">
        Лидеры голосования
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {topItems.map(item => (
          <ContentCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  const [activeSection, setActiveSection] = useState('voting');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});

  const handleVote = useCallback((itemId: number, voteType: 'up' | 'down') => {
    setUserVotes(prevVotes => {
      const currentVote = prevVotes[itemId];
      if (currentVote === voteType) {
        return { ...prevVotes, [itemId]: null };
      }
      return { ...prevVotes, [itemId]: voteType };
    });
  }, []);

  const displayedContent = useMemo(() => {
    if (activeSection === 'movies') return mockData.filter(item => item.type === 'movie');
    if (activeSection === 'series') return mockData.filter(item => item.type === 'series');
    return mockData;
  }, [activeSection]);

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    setSelectedItem(null);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <SidebarInset>
          <ScrollArea className="h-screen">
            <div className="p-4 md:p-8">
              {selectedItem ? (
                <DetailedView
                  item={selectedItem}
                  onBack={() => setSelectedItem(null)}
                  onVote={handleVote}
                  userVote={userVotes[selectedItem.id]}
                />
              ) : (
                <>
                  <WelcomeBanner />
                  <h2 className="text-3xl font-bold tracking-tight capitalize mb-6 animate-in fade-in-50">
                    {activeSection}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 md:gap-6 animate-in fade-in-50">
                    {displayedContent.map(item => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                  <TopVotedSection items={mockData} onItemClick={setSelectedItem} />
                </>
              )}
            </div>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
