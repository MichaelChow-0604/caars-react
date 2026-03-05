import type { FC } from 'react';
import { cn } from '@/lib/utils';

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

  const content = (
    <>
      <p
        className={cn(
          'font-caars-header text-caars-body-1 leading-caars-body-1 w-full font-semibold',
          titleColor,
        )}
      >
        {line1}
      </p>
      <p
        className={cn(
          'font-caars-header text-caars-body-2 leading-caars-body-2 w-full font-normal',
          subtitleColor,
        )}
      >
        {line2}
      </p>

      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -left-[3px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full',
          dotColor,
        )}
      />
    </>
  );

  const baseClass = cn(
    'relative flex w-[228px] flex-col items-start justify-center gap-0.5 rounded-[12px] px-4 py-3',
    bg,
    className,
  );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-state={state}
        className={cn(baseClass, 'cursor-pointer text-left')}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-state={state} className={baseClass}>
      {content}
    </div>
  );
};

export default TimelineItem;
