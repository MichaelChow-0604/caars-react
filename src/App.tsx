import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import MenuBar, { type StaffMember } from './layouts/MenuBar';
import SearchBar from './layouts/SearchBar';
import CalendarPage from './features/calendar/CalendarPage';
import PatientPage from './features/patient/PatientPage';
import LoginPage from './features/auth/LoginPage';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { PublicRoute } from './features/auth/PublicRoute';
import { useUserStore } from './stores/userStore';
import { useAuthStore } from './stores/authStore';

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

const NAV_PATHS = {
  calendar: '/calendar',
  patient: '/patient',
  setting: '/setting',
  'bug-report': '/bug-report',
} as const;

type NavItemId = keyof typeof NAV_PATHS;

function getActiveNavItem(pathname: string): NavItemId {
  if (pathname.startsWith(NAV_PATHS.patient)) return 'patient';
  if (pathname.startsWith(NAV_PATHS.setting)) return 'setting';
  if (pathname.startsWith(NAV_PATHS['bug-report'])) return 'bug-report';
  return 'calendar';
}

function CenterPlaceholder({ text }: { text: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-caars-neutral-white">
      <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7">
        {text}
      </span>
    </div>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const clearUser = useUserStore((s) => s.clearUser);

  const currentUserId = user ? String(user.user_id) : '';
  const currentUser = user
    ? { name: user.username, role: user.role }
    : undefined;

  const staffListWithUser = (() => {
    const base = DEFAULT_STAFF_LIST;
    if (!user) return base;
    const userStaff: StaffMember = { id: String(user.user_id), name: user.username };
    const exists = base.some((s) => s.id === userStaff.id);
    return exists ? base : [userStaff, ...base];
  })();

  const [mode, setMode] = useState<'day' | 'week'>('day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [checkedStaffIds, setCheckedStaffIds] = useState<string[]>(
    staffListWithUser.map((s) => s.id),
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string>(
    staffListWithUser[0]?.id ?? '',
  );

  const checkedStaff = staffListWithUser.filter((s) => checkedStaffIds.includes(s.id));

  const handleSignOut = () => {
    logout();
    clearUser();
    navigate('/login');
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) setSelectedDate(date);
  };

  const handleDoctorHeaderClick = (staffId: string) => {
    setSelectedStaffId(staffId);
    setMode('week');
  };

  const handleWeekdayHeaderClick = (date: Date) => {
    setSelectedDate(date);
    setMode('day');
  };

  const handleNavItemClick = (item: string) => {
    const path = NAV_PATHS[item as NavItemId];
    if (path) navigate(path);
  };

  const activeNavItem = getActiveNavItem(location.pathname);

  const mainApp = (
    <div className="flex flex-1 min-h-0 overflow-hidden bg-caars-neutral-white">
      <MenuBar
        mode={mode}
        activeNavItem={activeNavItem}
        onNavItemClick={handleNavItemClick}
        staffList={staffListWithUser}
        currentUser={currentUser}
        currentUserId={currentUserId}
        onSignOut={handleSignOut}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        checkedStaffIds={checkedStaffIds}
        onCheckedStaffChange={setCheckedStaffIds}
        selectedStaffId={selectedStaffId}
        onSelectedStaffChange={setSelectedStaffId}
      />

      <main className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
        <div className="flex items-center justify-center px-6 py-3 border-b border-caars-neutral-grey-4 shrink-0">
          <SearchBar />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <Routes>
            <Route path="/" element={<Navigate to={NAV_PATHS.calendar} replace />} />
            <Route
              path={NAV_PATHS.calendar}
              element={
                <CalendarPage
                  mode={mode}
                  selectedDate={selectedDate}
                  checkedStaff={checkedStaff}
                  staffList={staffListWithUser}
                  selectedStaffId={selectedStaffId}
                  currentUserId={currentUserId}
                  onModeChange={setMode}
                  onDateChange={setSelectedDate}
                  onDoctorHeaderClick={handleDoctorHeaderClick}
                  onWeekdayHeaderClick={handleWeekdayHeaderClick}
                />
              }
            />
            <Route path={NAV_PATHS.patient} element={<PatientPage />} />
            <Route
              path={NAV_PATHS.setting}
              element={<CenterPlaceholder text="Setting (placeholder)" />}
            />
            <Route
              path={NAV_PATHS['bug-report']}
              element={<CenterPlaceholder text="Bug Report (placeholder)" />}
            />
            <Route path="*" element={<Navigate to={NAV_PATHS.calendar} replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={<ProtectedRoute>{mainApp}</ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
