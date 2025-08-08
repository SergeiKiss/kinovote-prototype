'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ThumbsUp, ThumbsDown, PlayCircle, X, BarChart2, Star, Clapperboard, Film, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ContentCard } from '@/components/content-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
  actors: string[];
  director: string;
  country: string;
  genre: string;
};

const initialData: ContentItem[] = [
    { id: 1, title: 'Космические отголоски', description: 'Одинокий астронавт обнаруживает таинственный сигнал с края галактики, заставляющий ее усомниться в самой реальности.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1204, down: 58 }, aiHint: 'astronaut space', actors: ['Анна Ковалева', 'Максим Волков'], director: 'Елена Петрова', country: 'Россия', genre: 'Фантастика' },
    { id: 2, title: 'Хроники кибер-города', description: 'В залитом неоном мегаполисе детектив охотится на вышедший из-под контроля ИИ, который научился манипулировать человеческими воспоминаниями.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2589, down: 112 }, aiHint: 'cyberpunk city', actors: ['Дмитрий Соколов', 'Ольга Белова'], director: 'Алексей Сидоров', country: 'США', genre: 'Киберпанк' },
    { id: 3, title: 'Последнее королевство', description: 'Историческая драма о рождении Англии, увиденная глазами саксонского дворянина, воспитанного викингами.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 3450, down: 230 }, aiHint: 'viking warrior', actors: ['Александр Романов', 'Екатерина Морозова'], director: 'Игорь Кузнецов', country: 'Великобритания', genre: 'История' },
    { id: 4, title: 'Глубины океана', description: 'Глубоководная исследовательская группа обнаруживает древнюю цивилизацию, но в бездне они не одни.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 987, down: 45 }, aiHint: 'underwater exploration', actors: ['Мария Лебедева', 'Иван Попов'], director: 'Сергей Новиков', country: 'Франция', genre: 'Триллер' },
    { id: 5, title: 'Проект "Химера"', description: 'Секретный правительственный эксперимент по созданию суперсолдат проваливается, высвобождая новую угрозу для мира.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 1876, down: 301 }, aiHint: 'science fiction', actors: ['Павел Виноградов', 'Елена Козлова'], director: 'Олег Зайцев', country: 'Германия', genre: 'Боевик' },
    { id: 6, title: 'Нулевая гравитация', description: 'Конкурирующие корпорации сражаются за контроль над редким ресурсом, найденным только на астероидах, что приводит к войне в космосе.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1543, down: 99 }, aiHint: 'spaceship battle', actors: ['Артем Богданов', 'Виктория Федорова'], director: 'Антон Павлов', country: 'Канада', genre: 'Космоопера' },
    { id: 7, title: 'Золотая клетка', description: 'В викторианском Лондоне молодая женщина с тайным прошлым проникает в высшее общество, чтобы разоблачить темный заговор.', image: 'https://placehold.co/400x600', type: 'series', votes: { up: 2100, down: 150 }, aiHint: 'victorian london', actors: ['София Никитина', 'Михаил Егоров'], director: 'Людмила Голубева', country: 'Великобритания', genre: 'Детектив' },
    { id: 8, title: 'Земля кочевников', description: 'После глобальной катастрофы одинокий странник путешествует по опустошенному ландшафту в поисках мифического убежища.', image: 'https://placehold.co/400x600', type: 'movie', votes: { up: 1120, down: 88 }, aiHint: 'post apocalyptic', actors: ['Ирина Семенова', 'Владимир Орлов'], director: 'Юрий Беляев', country: 'Австралия', genre: 'Постапокалипсис' },
];

function StatisticsModal({ item }: { item: ContentItem }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Статистика для "{item.title}"</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Голоса</h3>
          <p>За: {item.votes.up.toLocaleString()}</p>
          <p>Против: {item.votes.down.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">Процент поддержки</h3>
          <p>
            {(
              (item.votes.up / (item.votes.up + item.votes.down)) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
    </DialogContent>
  );
}

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

const WelcomeBanner = ({ onCTAClick }: { onCTAClick: () => void }) => (
  <Card className="mb-8 overflow-hidden bg-gradient-to-tr from-primary/20 to-primary/5 border-primary/20 animate-in fade-in-50">
    <CardContent className="p-0">
      <div className="flex flex-col md:flex-row items-center">
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Добро пожаловать в Кинопоиск</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Ваш центр для открытия и оценки лучших фильмов и сериалов. Голосуйте за своих фаворитов и смотрите, что в тренде!
          </p>
          <Button size="lg" className="mt-6" onClick={onCTAClick}>
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
      .slice(0, 3);
  }, [items]);

  return (
    <div className="mt-12 animate-in fade-in-50">
      <h3 className="text-2xl font-bold tracking-tight mb-6">
        Топ-3 премьеры
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topItems.map(item => (
          <ContentCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
};

const VotingPage = ({
  content,
  onItemClick,
}: {
  content: ContentItem[];
  onItemClick: (item: ContentItem) => void;
}) => {
  return (
    <div className="animate-in fade-in-50 h-full flex flex-col">
      <div className="flex-grow pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Карточка нового контента</h2>
        <div className="relative">
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {content.map(item => (
              <div key={item.id} className="min-w-[200px] md:min-w-[250px] flex-shrink-0">
                 <ContentCard
                    item={item}
                    onClick={() => onItemClick(item)}
                    layout="vertical"
                    className="w-full"
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [content, setContent] = useState<ContentItem[]>(initialData);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({});
  const { toast } = useToast();

  const handleVote = useCallback((itemId: number, voteType: 'up' | 'down') => {
    // Fake auth check
    const isAuthorized = true; 
    if (!isAuthorized) {
        toast({
            title: "Ошибка",
            description: "Для голосования необходимо авторизоваться.",
            variant: "destructive",
        });
        return;
    }
      
    if (userVotes[itemId]) {
        toast({
            title: "Вы уже голосовали",
            description: "Вы можете проголосовать только один раз.",
            variant: "destructive",
        });
        return;
    }

    setUserVotes(prevVotes => ({ ...prevVotes, [itemId]: voteType }));

    setContent(prevContent => 
        prevContent.map(item => {
            if (item.id === itemId) {
                const newVotes = { ...item.votes };
                if (voteType === 'up') {
                    newVotes.up++;
                } else {
                    newVotes.down++;
                }
                return { ...item, votes: newVotes };
            }
            return item;
        })
    );
    
    toast({
        title: "Спасибо за Ваш голос!",
        description: "Ваш голос был успешно засчитан.",
    });

  }, [toast, userVotes]);

  const displayedContent = useMemo(() => {
    if (activeSection === 'movies') return content.filter(item => item.type === 'movie');
    if (activeSection === 'series') return content.filter(item => item.type === 'series');
    if (activeSection === 'home') return content;
    // For 'voting', we show all content in the carousel
    return [];
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
            return 'Все премьеры';
        case 'movies':
            return 'Фильмы';
        case 'series':
            return 'Сериалы';
        case 'voting':
            return 'Голосование за премьеру';
        default:
            return 'Все премьеры';
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
          <div className="flex flex-col h-screen">
            {activeSection === 'voting' && !selectedItem && (
               <div className="p-6 md:p-8 z-10 bg-background">
                 <h2 className="text-2xl font-bold tracking-tight mb-4">Топы недели</h2>
                 <div className="flex flex-wrap gap-6">
                   <Card className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer" onClick={() => handleSectionChange('movies')}>
                     <div>
                       <div className="flex items-center gap-2 mb-2">
                         <Film className="w-6 h-6 text-primary" />
                         <h3 className="text-lg font-semibold">Топы фильмов</h3>
                       </div>
                       <p className="text-sm text-muted-foreground">Самые популярные фильмы недели</p>
                     </div>
                     <div className="text-right mt-4">
                       <Button variant="ghost" size="sm">Перейти</Button>
                     </div>
                   </Card>
                   <Card className="w-64 flex flex-col justify-between p-4 bg-card hover:bg-card/80 cursor-pointer" onClick={() => handleSectionChange('series')}>
                     <div>
                       <div className="flex items-center gap-2 mb-2">
                         <Tv className="w-6 h-6 text-primary" />
                         <h3 className="text-lg font-semibold">Топы сериалов</h3>
                       </div>
                       <p className="text-sm text-muted-foreground">Самые популярные сериалы недели</p>
                     </div>
                       <div className="text-right mt-4">
                         <Button variant="ghost" size="sm">Перейти</Button>
                       </div>
                   </Card>
                 </div>
               </div>
            )}
            <ScrollArea className="h-full flex-grow">
              <div className="p-6 md:p-8">
                {currentSelectedItem ? (
                  <DetailedView
                    item={currentSelectedItem}
                    onBack={() => setSelectedItem(null)}
                    onVote={handleVote}
                    userVote={userVotes[currentSelectedItem.id]}
                  />
                ) : (
                  <>
                    {activeSection === 'home' && (
                      <>
                       <WelcomeBanner onCTAClick={() => handleSectionChange('voting')} />
                       <TopVotedSection items={content} onItemClick={setSelectedItem} />
                      </>
                    )}
                    {activeSection === 'voting' && (
                      <VotingPage 
                        content={content} 
                        onItemClick={setSelectedItem}
                      />
                    )}
                    
                    {activeSection !== 'home' && activeSection !== 'voting' && (
                      <>
                        <h2 className="text-3xl font-bold tracking-tight capitalize mb-8 animate-in fade-in-50">
                          {getSectionTitle(activeSection)}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 animate-in fade-in-50">
                          {displayedContent.map(item => (
                            <ContentCard
                              key={item.id}
                              item={item}
                              onClick={() => setSelectedItem(item)}
                              layout="vertical"
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
