import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { TimelineEvent, SeverityLevel } from './types';

const SEVERITY_STYLES: Record<
  SeverityLevel,
  { bg: string; titleColor: string; dotColor: string }
> = {
  emergency: {
    bg: 'bg-caars-error-2',
    titleColor: 'text-caars-error-1',
    dotColor: 'bg-caars-error-1',
  },
  routine: {
    bg: 'bg-caars-warning-2',
    titleColor: 'text-caars-warning-1',
    dotColor: 'bg-caars-warning-1',
  },
  normal: {
    bg: 'bg-caars-success-2',
    titleColor: 'text-caars-success-1',
    dotColor: 'bg-caars-success-1',
  },
};

export interface TimelineEventCardProps {
  event: TimelineEvent;
  onClick?: () => void;
  className?: string;
}

export function TimelineEventCard({
  event,
  onClick,
  className,
}: TimelineEventCardProps) {
  const { bg, titleColor, dotColor } = SEVERITY_STYLES[event.severity];
  const dateStr = format(new Date(event.date), 'dd MMM yyyy');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex w-[190px] flex-col items-start justify-center gap-0.5 rounded-xl px-3 py-2 text-left transition-colors hover:opacity-90',
        bg,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-1 top-1/2 size-2 -translate-y-1/2 rounded-full',
          dotColor,
        )}
      />
      <span
        className={cn(
          'font-caars-header text-caars-body-2 font-semibold leading-caars-body-2 truncate w-full',
          titleColor,
        )}
      >
        {event.title}
      </span>
      <span className="font-caars-header text-caars-body-3 leading-caars-body-3 text-caars-neutral-grey-6 truncate w-full">
        {dateStr}
      </span>
    </button>
  );
}
