'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopupBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function PopupBanner({ isOpen, onClose, onProceed }: PopupBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-200">
      <div style={{
        width: '500px',
        paddingTop: '30px',
        paddingBottom: '30px',
      }} className={cn(
        "relative bg-background border-2 border-border rounded-lg p-12 max-w-7xl mx-4 text-center shadow-2xl",
        "animate-in zoom-in-95 duration-300",
        isVisible && "animate-in slide-in-from-bottom-4"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-6 right-6 h-12 w-12 rounded-full hover:bg-muted"
        >
          <X className="h-6 w-6" />
        </Button>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Новый раздел
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Голосуйте за фильмы и сериалы
            </p>
          </div>
          
          <Button 
            onClick={onProceed}
            className="w-48 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary rounded-lg"
          >
            ПЕРЕЙТИ
          </Button>
        </div>
      </div>
    </div>
  );
}
