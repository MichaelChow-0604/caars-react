import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimelineEventCard } from './TimelineEventCard';
import type { TimelineEvent, SeverityLevel } from './types';

const SEVERITY_DOT_COLOR: Record<SeverityLevel, string> = {
  emergency: 'bg-caars-error-1',
  routine: 'bg-caars-warning-1',
  normal: 'bg-caars-success-1',
};

export interface CompactBulletProps {
  event: TimelineEvent;
  onSelect?: (event: TimelineEvent) => void;
}

export function CompactBullet({ event, onSelect }: CompactBulletProps) {
  const [open, setOpen] = useState(false);
  const dotColor = SEVERITY_DOT_COLOR[event.severity];

  const handleCardClick = () => {
    onSelect?.(event);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'size-2 shrink-0 rounded-full transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-caars-primary-1 focus-visible:ring-offset-1',
            dotColor,
          )}
          aria-label={`View ${event.title}`}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        sideOffset={8}
        className="w-auto border-caars-neutral-grey-4 p-0"
      >
        <TimelineEventCard event={event} onClick={handleCardClick} />
      </PopoverContent>
    </Popover>
  );
}
