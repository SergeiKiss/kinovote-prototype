'use client';

import { useState, useMemo, useCallback } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DetailedView } from '@/components/detailed-view';
import { useToast } from '@/hooks/use-toast';
import { ContentItem, Vote } from '@/lib/types';
import { initialData } from '@/lib/data';
import HomeSection from '@/components/sections/HomeSection';
import MoviesSection from '@/components/sections/MoviesSection';
import SeriesSection from '@/components/sections/SeriesSection';
import VotingSection from '@/components/sections/VotingSection';

export default function Home() {
  const [content, setContent] = useState<ContentItem[]>(initialData);
  const [userVotes, setUserVotes] = useState<Record<number, Vote>>({});
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'home' | 'movies' | 'series' | 'voting'>('home');

  const handleVote = useCallback(
    (itemId: number, voteType: 'up' | 'down') => {
      const isAuthorized = true;
      if (!isAuthorized) {
        toast({
          title: 'Ошибка',
          description: 'Для голосования необходимо авторизоваться.',
          variant: 'destructive',
        });
        return;
      }

      if (userVotes[itemId]) {
        toast({
          title: 'Вы уже голосовали',
          description: 'Вы можете проголосовать только один раз.',
          variant: 'destructive',
        });
        return;
      }

      setUserVotes((prevVotes) => ({ ...prevVotes, [itemId]: voteType }));

      setContent((prevContent) =>
        prevContent.map((item) => {
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
        title: 'Спасибо за Ваш голос!',
        description: 'Ваш голос был успешно засчитан.',
      });
    },
    [toast, userVotes]
  );
  
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleSelectItem = useCallback((item: ContentItem) => {
      setSelectedItemId(item.id);
  }, []);

  const handleBack = useCallback(() => {
      setSelectedItemId(null);
  }, []);

  const currentSelectedItem = useMemo(() => {
    if (!selectedItemId) return null;
    return content.find((c) => c.id === selectedItemId) || null;
  }, [selectedItemId, content]);

  const movies = useMemo(() => content.filter(item => item.type === 'movie'), [content]);
  const series = useMemo(() => content.filter(item => item.type === 'series'), [content]);

  const renderContent = () => {
    if (currentSelectedItem) {
      return (
         <ScrollArea className="h-full flex-grow">
            <div className="p-6 md:p-8">
              <DetailedView
                item={currentSelectedItem}
                onBack={handleBack}
                onVote={handleVote}
                userVote={userVotes[currentSelectedItem.id]}
              />
            </div>
          </ScrollArea>
      )
    }
    switch (activeSection) {
      case 'movies':
        return <MoviesSection content={movies} onItemClick={handleSelectItem} />;
      case 'series':
        return <SeriesSection content={series} onItemClick={handleSelectItem} />;
      case 'voting':
        return (
          <VotingSection
            content={content}
            onItemClick={handleSelectItem}
            onNavigate={setActiveSection}
          />
        );
      case 'home':
      default:
        return (
          <HomeSection
            content={content}
            onItemClick={handleSelectItem}
            onCTAClick={() => setActiveSection('voting')}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar activeSection={activeSection} onNavigate={setActiveSection} />
        <SidebarInset>
          <div className="flex flex-col h-screen">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
