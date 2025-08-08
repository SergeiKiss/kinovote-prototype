'use client';

import React, { useMemo, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type HCarouselProps = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
};

export function HCarousel({
  children,
  className,
  trackClassName,
  slideClassName = 'w-[60vw] sm:w-[48vw] md:w-[34vw] lg:w-[24vw] xl:w-[20vw] 2xl:w-[16vw]',
}: HCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const scrollByStep = useCallback((dir: -1 | 1) => {
    const el = containerRef.current;
    if (!el) return;
    const step = Math.max(200, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  }, []);

  return (
    <div className={cn('relative w-full', className)}>
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
      >
        <div className={cn('flex gap-6 snap-x snap-mandatory pb-2 pl-12 pr-12', trackClassName)}>
          {slides.map((child, i) => (
            <div key={i} className={cn('snap-start shrink-0', slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20"
        onClick={() => scrollByStep(-1)}
        aria-label="Предыдущие"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20"
        onClick={() => scrollByStep(1)}
        aria-label="Следующие"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}


