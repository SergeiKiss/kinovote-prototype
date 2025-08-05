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
import { useToast } from '@/hooks/use-toast';

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

const initialData: ContentItem[] = [
    { id: 1, title: 'Космические отголоски', description: 'Одинокий астронавт обнаруживает таинственный сигнал с края галактики, заставляющий ее усомниться в самой реальности.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1204, down: 58 }, aiHint: 'astronaut space' },
    { id: 2, title: 'Хроники кибер-города', description: 'В залитом неоном мегаполисе детектив охотится на вышедший из-под контроля ИИ, который научился манипулировать человеческими воспоминаниями.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2589, down: 112 }, aiHint: 'cyberpunk city' },
    { id: 3, title: 'Последнее королевство', description: 'Историческая драма о рождении Англии, увиденная глазами саксонского дворянина, воспитанного викингами.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 3450, down: 230 }, aiHint: 'viking warrior' },
    { id: 4, title: 'Глубины океана', description: 'Глубоководная исследовательская группа обнаруживает древнюю цивилизацию, но в бездне они не одни.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 987, down: 45 }, aiHint: 'underwater exploration' },
    { id: 5, title: 'Проект "Химера"', description: 'Секретный правительственный эксперимент по созданию суперсолдат проваливается, высвобождая новую угрозу для мира.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 1876, down: 301 }, aiHint: 'science fiction' },
    { id: 6, title: 'Нулевая гравитация', description: 'Конкурирующие корпорации сражаются за контроль над редким ресурсом, найденным только на астероидах, что приводит к войне в космосе.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1543, down: 99 }, aiHint: 'spaceship battle' },
    { id: 7, title: 'Золотая клетка', description: 'В викторианском Лондоне молодая женщина с тайным прошлым проникает в высшее общество, чтобы разоблачить темный заговор.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2100, down: 150 }, aiHint: 'victorian london' },
    { id: 8, title: 'Земля кочевников', description: 'После глобальной катастрофы одинокий странник путешествует по опустошенному ландшафту в поисках мифического убежища.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1120, down: 88 }, aiHint: 'post apocalyptic' },
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
    const typeText = item.type === 'movie' ? 'Фильм' : 'Сериал';
  return (
    <div className="animate-in fade-in-50">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-foreground/80 hover:text-foreground"
      >
        <X className="mr-2 h-4 w-4" />
        Назад к списку
      </Button>
      <div className="relative md:flex md:space-x-8">
        <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="aspect-[2/3] relative bg-card rounded-lg shadow-2xl shadow-black">
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
        <div className="mt-6 md:mt-0">
          <Badge variant="outline" className="mb-2 border-primary text-primary">
            {typeText.toUpperCase()}
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {item.title}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{item.description}</p>

          <div className="mt-8 flex items-center space-x-6">
            <Button size="lg">
              <PlayCircle className="mr-2" />
              Смотреть трейлер
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
                aria-label="Голосовать за"
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
                aria-label="Голосовать против"
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
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Добро пожаловать в КиноВоут</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Ваш центр для открытия и оценки лучших фильмов и сериалов. Голосуйте за своих фаворитов и смотрите, что в тренде!
          </p>
          <Button size="lg" className="mt-6">
            Начать голосование
          </Button>
        </div>
        <div className="relative md:w-1/2 h-64 md:h-auto md:self-stretch bg-card">
          <Image
            src="https://placehold.co/600x400"
            alt="Кинотеатр"
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
  const [content, setContent] = useState<ContentItem[]>(initialData);
  const [activeSection, setActiveSection] = useState('voting');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});
  const { toast } = useToast();

  const handleVote = useCallback((itemId: number, voteType: 'up' | 'down') => {
    setUserVotes(prevVotes => {
      const currentVote = prevVotes[itemId];
      const newVotes = { ...prevVotes };
      let voteChanged = false;

      setContent(prevContent => {
        const newContent = prevContent.map(item => {
          if (item.id === itemId) {
            const newItem = { ...item, votes: { ...item.votes } };
            // Revert previous vote if it exists
            if (currentVote === 'up') newItem.votes.up--;
            if (currentVote === 'down') newItem.votes.down--;

            // Apply new vote
            if (currentVote !== voteType) {
              if (voteType === 'up') newItem.votes.up++;
              if (voteType === 'down') newItem.votes.down++;
              newVotes[itemId] = voteType;
              voteChanged = true;
            } else {
              newVotes[itemId] = null; // Toggled off
            }
            return newItem;
          }
          return item;
        });
        return newContent;
      });

      if (voteChanged) {
        toast({
            title: "Спасибо за Ваш голос!",
        });
      }

      return newVotes;
    });
  }, [toast]);

  const displayedContent = useMemo(() => {
    if (activeSection === 'movies') return content.filter(item => item.type === 'movie');
    if (activeSection === 'series') return content.filter(item => item.type === 'series');
    return content;
  }, [activeSection, content]);

  const currentSelectedItem = useMemo(() => {
      if (!selectedItem) return null;
      return content.find(c => c.id === selectedItem.id) || null;
  }, [selectedItem, content]);


  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    setSelectedItem(null);
  }, []);
  
  const getSectionTitle = (section: string) => {
    switch(section) {
        case 'home':
            return 'Главная';
        case 'movies':
            return 'Фильмы';
        case 'series':
            return 'Сериалы';
        case 'voting':
            return 'Голосование';
        default:
            return 'Голосование';
    }
  }


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
              {currentSelectedItem ? (
                <DetailedView
                  item={currentSelectedItem}
                  onBack={() => setSelectedItem(null)}
                  onVote={handleVote}
                  userVote={userVotes[currentSelectedItem.id]}
                />
              ) : (
                <>
                  <WelcomeBanner />
                  <h2 className="text-3xl font-bold tracking-tight capitalize mb-6 animate-in fade-in-50">
                    {getSectionTitle(activeSection)}
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
                  <TopVotedSection items={content} onItemClick={setSelectedItem} />
                </>
              )}
            </div>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
