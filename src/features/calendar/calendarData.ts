import { startOfWeek, addDays, format } from 'date-fns';

export interface CalendarAppointment {
  id: string;
  resourceId: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    patientId: string;
    patientName: string;
    time: string;
    state: 'active' | 'cancelled' | 'expired';
  };
}

export interface SearchResult {
  id: string;
  patientName: string;
  age: number;
  gender: 'M' | 'F';
  appointmentTime: string;
  doctorName: string;
}

// Appointments are pinned to today's date so navigating away and back always shows them
const TODAY_STR = new Date().toLocaleDateString('en-CA'); // "2026-03-06"

function t(time: string): string {
  return `${TODAY_STR}T${time}`;
}

// Build ISO datetime strings for Mon-Fri of the current week
function getWeekDayStr(offsetFromMonday: number): string {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  return format(addDays(monday, offsetFromMonday), 'yyyy-MM-dd');
}

function w(dayOffset: number, time: string): string {
  return `${getWeekDayStr(dayOffset)}T${time}`;
}

export const FAKE_APPOINTMENTS: CalendarAppointment[] = [
  // ── Today's appointments (day view) ──────────────────────────────
  {
    id: 'a1',
    resourceId: '1',
    title: 'Betty Wong, 35F',
    start: t('09:30:00'),
    end: t('09:40:00'),
    extendedProps: { patientId: '1', patientName: 'Betty Wong, 35F', time: '9:30am', state: 'active' },
  },
  {
    id: 'a2',
    resourceId: '1',
    title: 'Chessy Tank, 27F',
    start: t('09:50:00'),
    end: t('10:00:00'),
    extendedProps: { patientId: '2', patientName: 'Chessy Tank, 27F', time: '9:50am', state: 'active' },
  },
  {
    id: 'a3',
    resourceId: '1',
    title: 'Tammy Chen, 15M',
    start: t('11:40:00'),
    end: t('11:50:00'),
    extendedProps: { patientId: '3', patientName: 'Tammy Chen, 15M', time: '11:40am', state: 'active' },
  },
  {
    id: 'a4',
    resourceId: '2',
    title: 'Hello Man, 25M',
    start: t('09:50:00'),
    end: t('10:00:00'),
    extendedProps: { patientId: '4', patientName: 'Hello Man, 25M', time: '9:50am', state: 'active' },
  },
  {
    id: 'a5',
    resourceId: '2',
    title: 'Davyyy, 26F',
    start: t('11:10:00'),
    end: t('11:20:00'),
    extendedProps: { patientId: '5', patientName: 'Davyyy, 26F', time: '11:10am', state: 'cancelled' },
  },
  {
    id: 'a6',
    resourceId: '3',
    title: 'Henry Nowhere, 20F',
    start: t('09:20:00'),
    end: t('09:30:00'),
    extendedProps: { patientId: '6', patientName: 'Henry Nowhere, 20F', time: '9:20am', state: 'active' },
  },
  {
    id: 'a7',
    resourceId: '3',
    title: 'Chan Dai Man, 78M',
    start: t('11:00:00'),
    end: t('11:10:00'),
    extendedProps: { patientId: '7', patientName: 'Chan Dai Man, 78M', time: '11:00am', state: 'active' },
  },
  {
    id: 'a8',
    resourceId: '5',
    title: 'Mike Chan, 55F',
    start: t('09:20:00'),
    end: t('09:30:00'),
    extendedProps: { patientId: '8', patientName: 'Mike Chan, 55F', time: '9:20am', state: 'active' },
  },
  {
    id: 'a9',
    resourceId: '5',
    title: 'Dazy Frank, 24F',
    start: t('09:40:00'),
    end: t('09:50:00'),
    extendedProps: { patientId: '9', patientName: 'Dazy Frank, 24F', time: '9:40am', state: 'active' },
  },
  {
    id: 'a10',
    resourceId: '5',
    title: 'Yezzy Man, 34M',
    start: t('09:50:00'),
    end: t('10:00:00'),
    extendedProps: { patientId: '21', patientName: 'Yezzy Man, 34M', time: '9:50am', state: 'active' },
  },
  {
    id: 'a11',
    resourceId: '5',
    title: 'Scarlet Tam, 44F',
    start: t('11:10:00'),
    end: t('11:20:00'),
    extendedProps: { patientId: '10', patientName: 'Scarlet Tam, 44F', time: '11:10am', state: 'active' },
  },
  {
    id: 'a12',
    resourceId: '6',
    title: 'Amy Chan, 32F',
    start: t('11:00:00'),
    end: t('11:10:00'),
    extendedProps: { patientId: '11', patientName: 'Amy Chan, 32F', time: '11:00am', state: 'active' },
  },
  {
    id: 'a13',
    resourceId: '6',
    title: 'Elaine, 24F',
    start: t('11:10:00'),
    end: t('11:20:00'),
    extendedProps: { patientId: '12', patientName: 'Elaine, 24F', time: '11:10am', state: 'active' },
  },

  // ── Week-spread appointments (week view, resourceId '1' = Dr. Jane Doe) ──
  // Monday
  {
    id: 'w2',
    resourceId: '1',
    title: 'Alan Shore, 42M',
    start: w(0, '10:00:00'),
    end: w(0, '10:10:00'),
    extendedProps: { patientId: '13', patientName: 'Alan Shore, 42M', time: '10:00am', state: 'active' },
  },
  {
    id: 'w3',
    resourceId: '1',
    title: 'Priya Nair, 29F',
    start: w(0, '11:30:00'),
    end: w(0, '11:40:00'),
    extendedProps: { patientId: '14', patientName: 'Priya Nair, 29F', time: '11:30am', state: 'expired' },
  },
  // Tuesday
  {
    id: 'w4',
    resourceId: '1',
    title: 'Chessy Tank, 27F',
    start: w(1, '09:00:00'),
    end: w(1, '09:10:00'),
    extendedProps: { patientId: '2', patientName: 'Chessy Tank, 27F', time: '9:00am', state: 'active' },
  },
  {
    id: 'w5',
    resourceId: '1',
    title: 'Lara Moon, 33F',
    start: w(1, '10:30:00'),
    end: w(1, '10:40:00'),
    extendedProps: { patientId: '15', patientName: 'Lara Moon, 33F', time: '10:30am', state: 'cancelled' },
  },
  // Wednesday
  {
    id: 'w6',
    resourceId: '1',
    title: 'Tammy Chen, 15M',
    start: w(2, '09:10:00'),
    end: w(2, '09:20:00'),
    extendedProps: { patientId: '3', patientName: 'Tammy Chen, 15M', time: '9:10am', state: 'active' },
  },
  {
    id: 'w7',
    resourceId: '1',
    title: 'James Hill, 60M',
    start: w(2, '11:00:00'),
    end: w(2, '11:10:00'),
    extendedProps: { patientId: '16', patientName: 'James Hill, 60M', time: '11:00am', state: 'active' },
  },
  // Thursday
  {
    id: 'w8',
    resourceId: '1',
    title: 'Grace Lee, 45F',
    start: w(3, '09:40:00'),
    end: w(3, '09:50:00'),
    extendedProps: { patientId: '17', patientName: 'Grace Lee, 45F', time: '9:40am', state: 'active' },
  },
  {
    id: 'w9',
    resourceId: '1',
    title: 'Tom Riddle, 38M',
    start: w(3, '13:00:00'),
    end: w(3, '13:10:00'),
    extendedProps: { patientId: '18', patientName: 'Tom Riddle, 38M', time: '1:00pm', state: 'active' },
  },
  // Friday
  {
    id: 'w10',
    resourceId: '1',
    title: 'Nina Walsh, 52F',
    start: w(4, '09:00:00'),
    end: w(4, '09:10:00'),
    extendedProps: { patientId: '19', patientName: 'Nina Walsh, 52F', time: '9:00am', state: 'active' },
  },
  {
    id: 'w11',
    resourceId: '1',
    title: 'Oscar Tang, 31M',
    start: w(4, '11:20:00'),
    end: w(4, '11:30:00'),
    extendedProps: { patientId: '20', patientName: 'Oscar Tang, 31M', time: '11:20am', state: 'cancelled' },
  },

  // ── Week appointments for Dr. Mill Phil (resourceId '2') ──
  {
    id: 'w12',
    resourceId: '2',
    title: 'Hello Man, 25M',
    start: w(0, '10:00:00'),
    end: w(0, '10:10:00'),
    extendedProps: { patientId: '4', patientName: 'Hello Man, 25M', time: '10:00am', state: 'active' },
  },
  {
    id: 'w13',
    resourceId: '2',
    title: 'Davyyy, 26F',
    start: w(1, '09:30:00'),
    end: w(1, '09:40:00'),
    extendedProps: { patientId: '5', patientName: 'Davyyy, 26F', time: '9:30am', state: 'cancelled' },
  },
  {
    id: 'w14',
    resourceId: '2',
    title: 'Sam Green, 50M',
    start: w(2, '11:00:00'),
    end: w(2, '11:10:00'),
    extendedProps: { patientId: '22', patientName: 'Sam Green, 50M', time: '11:00am', state: 'active' },
  },
  {
    id: 'w15',
    resourceId: '2',
    title: 'Lily Chen, 22F',
    start: w(3, '09:00:00'),
    end: w(3, '09:10:00'),
    extendedProps: { patientId: '23', patientName: 'Lily Chen, 22F', time: '9:00am', state: 'active' },
  },
  {
    id: 'w16',
    resourceId: '2',
    title: 'Kevin Ng, 47M',
    start: w(4, '13:30:00'),
    end: w(4, '13:40:00'),
    extendedProps: { patientId: '24', patientName: 'Kevin Ng, 47M', time: '1:30pm', state: 'active' },
  },

  // ── Week appointments for Dr. John Smith (resourceId '3') ──
  {
    id: 'w17',
    resourceId: '3',
    title: 'Henry Nowhere, 20F',
    start: w(0, '09:00:00'),
    end: w(0, '09:10:00'),
    extendedProps: { patientId: '6', patientName: 'Henry Nowhere, 20F', time: '9:00am', state: 'active' },
  },
  {
    id: 'w18',
    resourceId: '3',
    title: 'Chan Dai Man, 78M',
    start: w(2, '10:30:00'),
    end: w(2, '10:40:00'),
    extendedProps: { patientId: '7', patientName: 'Chan Dai Man, 78M', time: '10:30am', state: 'active' },
  },
  {
    id: 'w19',
    resourceId: '3',
    title: 'Fiona Webb, 36F',
    start: w(4, '09:30:00'),
    end: w(4, '09:40:00'),
    extendedProps: { patientId: '25', patientName: 'Fiona Webb, 36F', time: '9:30am', state: 'expired' },
  },
];

export const FAKE_SEARCH_RESULTS: SearchResult[] = [
  {
    id: 's1',
    patientName: 'Betty Wong',
    age: 35,
    gender: 'F',
    appointmentTime: '9:30am',
    doctorName: 'Dr. Jane Doe',
  },
  {
    id: 's2',
    patientName: 'Henry Nowhere',
    age: 20,
    gender: 'F',
    appointmentTime: '9:20am',
    doctorName: 'Dr. John Smith',
  },
  {
    id: 's3',
    patientName: 'Chan Dai Man',
    age: 78,
    gender: 'M',
    appointmentTime: '11:00am',
    doctorName: 'Dr. John Smith',
  },
  {
    id: 's4',
    patientName: 'Davyyy',
    age: 26,
    gender: 'F',
    appointmentTime: '11:10am',
    doctorName: 'Dr. Mill Phil',
  },
  {
    id: 's5',
    patientName: 'Tammy Chen',
    age: 15,
    gender: 'M',
    appointmentTime: '11:40am',
    doctorName: 'Dr. Jane Doe',
  },
  {
    id: 's6',
    patientName: 'Mike Chan',
    age: 55,
    gender: 'F',
    appointmentTime: '9:20am',
    doctorName: 'Dr. B',
  },
  {
    id: 's7',
    patientName: 'Scarlet Tam',
    age: 44,
    gender: 'F',
    appointmentTime: '11:10am',
    doctorName: 'Dr. B',
  },
  {
    id: 's8',
    patientName: 'Amy Chan',
    age: 32,
    gender: 'F',
    appointmentTime: '11:00am',
    doctorName: 'Dr. Jane Doe',
  },
];

/** Returns appointments that fall on the given date. */
export function getAppointmentsForDate(
  appointments: CalendarAppointment[],
  date: Date,
): CalendarAppointment[] {
  const dateStr = date.toLocaleDateString('en-CA');
  return appointments.filter((a) => a.start.startsWith(dateStr));
}

/** Returns appointments for a specific doctor (resourceId). */
export function getAppointmentsForDoctor(
  appointments: CalendarAppointment[],
  doctorId: string,
): CalendarAppointment[] {
  return appointments.filter((a) => a.resourceId === doctorId);
}

/** Returns appointments falling within the Mon-Fri week containing the given date. */
export function getAppointmentsForWeek(
  appointments: CalendarAppointment[],
  date: Date,
): CalendarAppointment[] {
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const friday = addDays(monday, 4);
  const mondayStr = format(monday, 'yyyy-MM-dd');
  const fridayStr = format(friday, 'yyyy-MM-dd');
  return appointments.filter((a) => {
    const dateStr = a.start.slice(0, 10);
    return dateStr >= mondayStr && dateStr <= fridayStr;
  });
}

export function countAppointmentsPerResource(
  appointments: CalendarAppointment[],
): Record<string, number> {
  return appointments.reduce<Record<string, number>>((acc, a) => {
    acc[a.resourceId] = (acc[a.resourceId] ?? 0) + 1;
    return acc;
  }, {});
}
