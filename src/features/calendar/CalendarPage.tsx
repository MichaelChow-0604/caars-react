import type { StaffMember } from '@/layouts/MenuBar';
import CalendarHeader from './CalendarHeader';
import CalendarDayView from './CalendarDayView';
import CalendarWeekView from './CalendarWeekView';

interface CalendarPageProps {
  mode: 'day' | 'week';
  selectedDate: Date;
  checkedStaff: StaffMember[];
  staffList: StaffMember[];
  selectedStaffId: string;
  onModeChange: (mode: 'day' | 'week') => void;
  onDateChange: (date: Date) => void;
  onDoctorHeaderClick: (staffId: string) => void;
  onWeekdayHeaderClick: (date: Date) => void;
}

export default function CalendarPage({
  mode,
  selectedDate,
  checkedStaff,
  staffList,
  selectedStaffId,
  onModeChange,
  onDateChange,
  onDoctorHeaderClick,
  onWeekdayHeaderClick,
}: CalendarPageProps) {
  const selectedStaff = staffList.find((s) => s.id === selectedStaffId);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-caars-neutral-white">
      <CalendarHeader
        mode={mode}
        selectedDate={selectedDate}
        selectedStaffName={selectedStaff?.name}
        onModeChange={onModeChange}
        onDateChange={onDateChange}
      />
      {mode === 'day' ? (
        <CalendarDayView
          selectedDate={selectedDate}
          checkedStaff={checkedStaff}
          onDoctorHeaderClick={onDoctorHeaderClick}
        />
      ) : (
        <CalendarWeekView
          selectedDate={selectedDate}
          selectedStaffId={selectedStaffId}
          onWeekdayClick={onWeekdayHeaderClick}
        />
      )}
    </div>
  );
}
