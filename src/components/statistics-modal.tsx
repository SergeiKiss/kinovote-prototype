'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContentItem } from '@/lib/types';


export function StatisticsModal({ item }: { item: ContentItem }) {
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
