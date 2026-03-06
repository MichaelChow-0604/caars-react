import { format, addDays, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import CButton from '@/components/caars-ui/CButton';
import SegmentedControl from '@/components/caars-ui/SegmentedControl';
import { IconChevronLeft, IconChevronRight } from '@/lib/icon';

const MODE_OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
];

interface CalendarHeaderProps {
  mode: 'day' | 'week';
  selectedDate: Date;
  onModeChange: (mode: 'day' | 'week') => void;
  onDateChange: (date: Date) => void;
}

export default function CalendarHeader({
  mode,
  selectedDate,
  onModeChange,
  onDateChange,
}: CalendarHeaderProps) {
  const isOnToday = isToday(selectedDate);

  const handlePrev = () => onDateChange(addDays(selectedDate, -1));
  const handleNext = () => onDateChange(addDays(selectedDate, 1));
  const handleToday = () => onDateChange(new Date());

  return (
    <div className="relative flex items-center px-6 py-3 border-b border-caars-neutral-grey-4 shrink-0 min-h-[64px]">
      {/* Left: mode toggle + Today button */}
      <div className="flex items-center gap-3 z-10">
        <SegmentedControl
          value={mode}
          onChange={(v) => onModeChange(v as 'day' | 'week')}
          options={MODE_OPTIONS}
          className="w-[160px]"
        />
        <CButton
          variant="outline-black"
          size="sm"
          onClick={handleToday}
          disabled={isOnToday}
          className={cn(isOnToday && 'opacity-50')}
        >
          Today
        </CButton>
      </div>

      {/* Center: date navigator — absolutely centered in the header */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center justify-center size-7 rounded-full text-caars-neutral-grey-6 hover:bg-caars-neutral-grey-3 transition-colors"
          aria-label="Previous day"
        >
          <IconChevronLeft className="size-4" />
        </button>

        <span className="font-caars-header text-caars-h4 leading-caars-h4 font-semibold text-caars-neutral-black min-w-[172px] text-center select-none">
          {format(selectedDate, 'd MMMM yyyy')}
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center justify-center size-7 rounded-full text-caars-neutral-grey-6 hover:bg-caars-neutral-grey-3 transition-colors"
          aria-label="Next day"
        >
          <IconChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
