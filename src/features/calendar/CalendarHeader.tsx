import {
  format,
  addDays,
  addWeeks,
  isToday,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from 'date-fns';
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
  selectedStaffName?: string;
  onModeChange: (mode: 'day' | 'week') => void;
  onDateChange: (date: Date) => void;
}

export default function CalendarHeader({
  mode,
  selectedDate,
  selectedStaffName,
  onModeChange,
  onDateChange,
}: CalendarHeaderProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEndWorkDays = addDays(weekStart, 4);

  const isOnToday =
    mode === 'day'
      ? isToday(selectedDate)
      : isWithinInterval(new Date(), {
          start: startOfDay(weekStart),
          end: endOfDay(weekEndWorkDays),
        });

  const handlePrev = () =>
    onDateChange(mode === 'day' ? addDays(selectedDate, -1) : addWeeks(selectedDate, -1));
  const handleNext = () =>
    onDateChange(mode === 'day' ? addDays(selectedDate, 1) : addWeeks(selectedDate, 1));
  const handleToday = () => onDateChange(new Date());

  const isSameMonth = weekStart.getMonth() === weekEnd.getMonth();

  const weekLabel = isSameMonth
    ? format(weekStart, 'MMMM yyyy')
    : `${format(weekStart, 'MMM')} – ${format(weekEnd, 'MMM yyyy')}`;

  return (
    <div className="relative flex items-center px-6 py-3 border-b border-caars-neutral-grey-4 shrink-0 min-h-[64px] bg-caars-neutral-grey-2">
      {/* Left: mode toggle + Today button */}
      <div className="flex items-center gap-3 z-10 flex-1">
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

      {/* Center: date navigator */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
        {mode === 'day' ? (
          <>
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
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 px-2 py-1.5 rounded-[8px] text-caars-neutral-grey-6 hover:text-caars-neutral-black hover:bg-caars-neutral-grey-3 transition-colors"
              aria-label="Previous week"
            >
              <IconChevronLeft className="size-4" />
              <span className="font-caars-header text-caars-button-1 leading-caars-button-1 font-semibold tracking-caars-button-1">
                previous week
              </span>
            </button>

            <span className="font-caars-header text-caars-h4 leading-caars-h4 font-semibold text-caars-neutral-black min-w-[160px] text-center select-none px-2">
              {weekLabel}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 px-2 py-1.5 rounded-[8px] text-caars-neutral-grey-6 hover:text-caars-neutral-black hover:bg-caars-neutral-grey-3 transition-colors"
              aria-label="Next week"
            >
              <span className="font-caars-header text-caars-button-1 leading-caars-button-1 font-semibold tracking-caars-button-1">
                next week
              </span>
              <IconChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Right: Doctor card (week mode only) */}
      <div className="flex items-center justify-end z-10 flex-1">
        {mode === 'week' && selectedStaffName && (
          <div className="flex items-center justify-center px-5 py-3 bg-caars-primary-2 rounded-[8px]">
            <span className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-primary-1 whitespace-nowrap">
              {selectedStaffName}'s Timetable
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
