import type { StaffMember } from '@/layouts/MenuBar';
import CalendarHeader from './CalendarHeader';
import CalendarDayView from './CalendarDayView';

interface CalendarPageProps {
  mode: 'day' | 'week';
  selectedDate: Date;
  checkedStaff: StaffMember[];
  staffList: StaffMember[];
  onModeChange: (mode: 'day' | 'week') => void;
  onDateChange: (date: Date) => void;
}

export default function CalendarPage({
  mode,
  selectedDate,
  checkedStaff,
  onModeChange,
  onDateChange,
}: CalendarPageProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-caars-neutral-white">
      <CalendarHeader
        mode={mode}
        selectedDate={selectedDate}
        onModeChange={onModeChange}
        onDateChange={onDateChange}
      />
      <CalendarDayView
        selectedDate={selectedDate}
        checkedStaff={checkedStaff}
      />
    </div>
  );
}
