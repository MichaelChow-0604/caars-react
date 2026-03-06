import type { DayButton } from 'react-day-picker';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

interface MiniCalendarSectionProps {
  mode: 'day' | 'week';
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function MiniCalendarSection({
  mode,
  date,
  onDateChange,
}: MiniCalendarSectionProps) {
  return (
    <div className="p-4 shrink-0">
      <div className="bg-caars-neutral-grey-2 rounded-[12px] pt-3 overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="w-full p-0 [--cell-size:--spacing(7)]"
          formatters={{
            formatWeekdayName: (day) =>
              day.toLocaleDateString('en-US', { weekday: 'long' }).charAt(0),
          }}
          modifiers={
            mode === 'week' && date
              ? {
                  weekRange: eachDayOfInterval({
                    start: startOfWeek(date, { weekStartsOn: 1 }),
                    end: endOfWeek(date, { weekStartsOn: 1 }),
                  }),
                }
              : undefined
          }
          classNames={{
            month_caption: 'flex h-7 w-full items-center justify-center px-7',
            caption_label: 'text-xs font-semibold text-caars-neutral-grey-7',
            nav: 'absolute inset-x-2 top-0 flex w-auto items-center justify-between',
            button_previous:
              'size-7 p-0 hover:bg-transparent text-caars-neutral-grey-7',
            button_next:
              'size-7 p-0 hover:bg-transparent text-caars-neutral-grey-7',
            weekdays: 'flex w-full',
            weekday:
              'flex-1 text-center text-[10px] font-medium text-caars-neutral-black opacity-70 select-none',
            week: 'mt-1 flex w-full',
            day: 'flex-1 aspect-square p-0 text-center',
            today: '',
            outside: 'opacity-30',
          }}
          components={{
            DayButton: MiniCalendarDayButton,
          }}
        />
      </div>
    </div>
  );
}

function MiniCalendarDayButton({
  day,
  modifiers,
  className: _className,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const isSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;
  const isToday = modifiers.today;
  const isWeekRange = (modifiers as Record<string, unknown>).weekRange === true;

  return (
    <button
      {...props}
      className={cn(
        'flex aspect-square w-full items-center justify-center rounded-full text-[10px] font-medium leading-none transition-colors',
        isSelected
          ? 'bg-caars-primary-1 text-caars-neutral-white hover:bg-caars-primary-1'
          : isToday
            ? 'border border-caars-primary-1 text-caars-primary-1 hover:bg-caars-neutral-grey-4'
            : isWeekRange
              ? 'bg-caars-primary-2 text-caars-primary-1 hover:bg-caars-primary-3 hover:text-caars-neutral-white'
              : 'text-caars-neutral-black hover:bg-caars-neutral-grey-4',
        modifiers.outside && 'opacity-30',
        modifiers.disabled && 'opacity-50 cursor-not-allowed',
      )}
    />
  );
}

