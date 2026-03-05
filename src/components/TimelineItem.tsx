import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

type TimelineItemState = 'normal' | 'routine' | 'emergency' | 'expired';

interface TimelineItemProps {
  className?: string;
  line1?: string;
  line2?: string;
  state?: TimelineItemState;
  onClick?: () => void;
}

const stateConfig: Record<
  TimelineItemState,
  { bg: string; titleColor: string; subtitleColor: string; dotColor: string; interactive: boolean }
> = {
  normal: {
    bg: 'bg-caars-success-2',
    titleColor: 'text-caars-success-1',
    subtitleColor: 'text-caars-neutral-grey-6',
    dotColor: 'bg-caars-success-1',
    interactive: true,
  },
  routine: {
    bg: 'bg-caars-warning-2',
    titleColor: 'text-caars-warning-1',
    subtitleColor: 'text-caars-neutral-grey-6',
    dotColor: 'bg-caars-warning-1',
    interactive: true,
  },
  emergency: {
    bg: 'bg-caars-error-2',
    titleColor: 'text-caars-error-1',
    subtitleColor: 'text-caars-neutral-grey-6',
    dotColor: 'bg-caars-error-1',
    interactive: false,
  },
  expired: {
    bg: 'bg-caars-neutral-grey-4',
    titleColor: 'text-caars-neutral-grey-6',
    subtitleColor: 'text-caars-neutral-grey-6',
    dotColor: 'bg-caars-neutral-grey-5',
    interactive: false,
  },
};

const TimelineItem: FC<TimelineItemProps> = ({
  className,
  line1 = 'Title',
  line2 = 'Date & Time',
  state = 'normal',
  onClick,
}) => {
  const { bg, titleColor, subtitleColor, dotColor, interactive } = stateConfig[state];

  const cardClassName = cn(
    'relative w-[228px] items-start justify-center gap-0.5 rounded-[12px] border-none px-4 py-3 shadow-none',
    bg,
    className,
  );

  const content = (
    <>
      <CardTitle
        className={cn(
          'font-caars-header text-caars-body-1 leading-caars-body-1 w-full font-semibold',
          titleColor,
        )}
      >
        {line1}
      </CardTitle>
      <CardDescription
        className={cn(
          'font-caars-header text-caars-body-2 leading-caars-body-2 w-full font-normal',
          subtitleColor,
        )}
      >
        {line2}
      </CardDescription>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-[3px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full',
          dotColor,
        )}
      />
    </>
  );

  if (interactive) {
    return (
      <Card
        asChild
        data-state={state}
        className={cn(cardClassName, 'cursor-pointer text-left')}
      >
        <button type="button" onClick={onClick}>
          {content}
        </button>
      </Card>
    );
  }

  return (
    <Card data-state={state} className={cardClassName}>
      {content}
    </Card>
  );
};

export default TimelineItem;
