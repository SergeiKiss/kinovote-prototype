'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const WelcomeBanner = ({ onCTAClick }: { onCTAClick: () => void }) => (
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
