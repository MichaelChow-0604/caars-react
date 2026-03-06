import { useState } from 'react';
import MenuBar, { type StaffMember } from './layouts/MenuBar';
import SearchBar from './layouts/SearchBar';
import CalendarPage from './features/calendar/CalendarPage';

const DEFAULT_STAFF_LIST: StaffMember[] = [
  { id: '1', name: 'Dr. Jane Doe' },
  { id: '2', name: 'Dr. Mill Phil' },
  { id: '3', name: 'Dr. John Smith' },
  { id: '4', name: 'Dr. Van Tin' },
  { id: '5', name: 'Dr. B' },
  { id: '6', name: 'Dr. Emily Chan' },
  { id: '7', name: 'Dr. Kevin Lam' },
  { id: '8', name: 'Dr. Sarah Wong' },
  { id: '9', name: 'Dr. Michael Yu' },
  { id: '10', name: 'Dr. Priya Sharma' },
];

function App() {
  const [mode, setMode] = useState<'day' | 'week'>('day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [checkedStaffIds, setCheckedStaffIds] = useState<string[]>(
    DEFAULT_STAFF_LIST.map((s) => s.id),
  );

  const checkedStaff = DEFAULT_STAFF_LIST.filter((s) => checkedStaffIds.includes(s.id));

  const handleDateChange = (date: Date | undefined) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-caars-neutral-white">
      <MenuBar
        mode={mode}
        activeNavItem="calendar"
        onNavItemClick={() => {}}
        staffList={DEFAULT_STAFF_LIST}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        checkedStaffIds={checkedStaffIds}
        onCheckedStaffChange={setCheckedStaffIds}
      />

      <main className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
        <div className="flex items-center justify-center px-6 py-3 border-b border-caars-neutral-grey-4 shrink-0">
          <SearchBar />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <CalendarPage
            mode={mode}
            selectedDate={selectedDate}
            checkedStaff={checkedStaff}
            staffList={DEFAULT_STAFF_LIST}
            onModeChange={setMode}
            onDateChange={setSelectedDate}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
