'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type SimpleSliderProps = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  slideWidthClasses?: string; // tailwind classes controlling slide width
};

export function SimpleSlider({
  children,
  className,
  slideWidthClasses = 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6',
}: SimpleSliderProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateButtons = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth - 1; // epsilon
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll);
  }, []);

  const scrollBy = React.useCallback((dir: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }, []);

  const onWheel = React.useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      updateButtons();
    }
  }, [updateButtons]);

  React.useEffect(() => {
    updateButtons();
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => updateButtons();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [updateButtons]);

  const slides = React.Children.toArray(children);

  return (
    <div className={cn('relative w-full', className)}>
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-6 snap-x snap-mandatory px-12 pb-2">
          {slides.map((child, i) => (
            <div key={i} className={cn('snap-start shrink-0', slideWidthClasses)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label="Предыдущие"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label="Следующие"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}


