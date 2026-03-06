export interface CalendarAppointment {
  id: string;
  resourceId: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    patientName: string;
    time: string;
    state: "active" | "cancelled" | "expired";
  };
}

export interface SearchResult {
  id: string;
  patientName: string;
  age: number;
  gender: "M" | "F";
  appointmentTime: string;
  doctorName: string;
}

// Appointments are pinned to today's date so navigating away and back always shows them
const TODAY_STR = new Date().toLocaleDateString("en-CA"); // "2026-03-06"

function t(time: string): string {
  return `${TODAY_STR}T${time}`;
}

export const FAKE_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: "a1",
    resourceId: "1",
    title: "Betty Wong, 35F",
    start: t("09:30:00"),
    end: t("09:40:00"),
    extendedProps: {
      patientName: "Betty Wong, 35F",
      time: "9:30am",
      state: "active",
    },
  },
  {
    id: "a2",
    resourceId: "1",
    title: "Chessy Tank, 27F",
    start: t("09:50:00"),
    end: t("10:00:00"),
    extendedProps: {
      patientName: "Chessy Tank, 27F",
      time: "9:50am",
      state: "active",
    },
  },
  {
    id: "a3",
    resourceId: "1",
    title: "Tammy Chen, 15M",
    start: t("11:40:00"),
    end: t("11:50:00"),
    extendedProps: {
      patientName: "Tammy Chen, 15M",
      time: "11:40am",
      state: "active",
    },
  },
  {
    id: "a4",
    resourceId: "2",
    title: "Hello Man, 25M",
    start: t("09:50:00"),
    end: t("10:00:00"),
    extendedProps: {
      patientName: "Hello Man, 25M",
      time: "9:50am",
      state: "active",
    },
  },
  {
    id: "a5",
    resourceId: "2",
    title: "Davyyy, 26F",
    start: t("11:10:00"),
    end: t("11:20:00"),
    extendedProps: {
      patientName: "Davyyy, 26F",
      time: "11:10am",
      state: "cancelled",
    },
  },
  {
    id: "a6",
    resourceId: "3",
    title: "Henry Nowhere, 20F",
    start: t("09:20:00"),
    end: t("09:30:00"),
    extendedProps: {
      patientName: "Henry Nowhere, 20F",
      time: "9:20am",
      state: "active",
    },
  },
  {
    id: "a7",
    resourceId: "3",
    title: "Chan Dai Man, 78M",
    start: t("11:00:00"),
    end: t("11:10:00"),
    extendedProps: {
      patientName: "Chan Dai Man, 78M",
      time: "11:00am",
      state: "active",
    },
  },
  {
    id: "a8",
    resourceId: "5",
    title: "Mike Chan, 55F",
    start: t("09:20:00"),
    end: t("09:30:00"),
    extendedProps: {
      patientName: "Mike Chan, 55F",
      time: "9:20am",
      state: "active",
    },
  },
  {
    id: "a9",
    resourceId: "5",
    title: "Dazy Frank, 24F",
    start: t("09:40:00"),
    end: t("09:50:00"),
    extendedProps: {
      patientName: "Dazy Frank, 24F",
      time: "9:40am",
      state: "active",
    },
  },
  {
    id: "a10",
    resourceId: "5",
    title: "Yezzy Man, 34M",
    start: t("09:50:00"),
    end: t("10:00:00"),
    extendedProps: {
      patientName: "Yezzy Man, 34M",
      time: "9:50am",
      state: "active",
    },
  },
  {
    id: "a11",
    resourceId: "5",
    title: "Scarlet Tam, 44F",
    start: t("11:10:00"),
    end: t("11:20:00"),
    extendedProps: {
      patientName: "Scarlet Tam, 44F",
      time: "11:10am",
      state: "active",
    },
  },
  {
    id: "a12",
    resourceId: "6",
    title: "Amy Chan, 32F",
    start: t("11:00:00"),
    end: t("11:10:00"),
    extendedProps: {
      patientName: "Amy Chan, 32F",
      time: "11:00am",
      state: "active",
    },
  },
  {
    id: "a13",
    resourceId: "6",
    title: "Elaine, 24F",
    start: t("11:10:00"),
    end: t("11:20:00"),
    extendedProps: {
      patientName: "Elaine, 24F",
      time: "11:10am",
      state: "active",
    },
  },
];

export const FAKE_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "s1",
    patientName: "Betty Wong",
    age: 35,
    gender: "F",
    appointmentTime: "9:30am",
    doctorName: "Dr. Jane Doe",
  },
  {
    id: "s2",
    patientName: "Henry Nowhere",
    age: 20,
    gender: "F",
    appointmentTime: "9:20am",
    doctorName: "Dr. John Smith",
  },
  {
    id: "s3",
    patientName: "Chan Dai Man",
    age: 78,
    gender: "M",
    appointmentTime: "11:00am",
    doctorName: "Dr. John Smith",
  },
  {
    id: "s4",
    patientName: "Davyyy",
    age: 26,
    gender: "F",
    appointmentTime: "11:10am",
    doctorName: "Dr. Mill Phil",
  },
  {
    id: "s5",
    patientName: "Tammy Chen",
    age: 15,
    gender: "M",
    appointmentTime: "11:40am",
    doctorName: "Dr. Jane Doe",
  },
  {
    id: "s6",
    patientName: "Mike Chan",
    age: 55,
    gender: "F",
    appointmentTime: "9:20am",
    doctorName: "Dr. B",
  },
  {
    id: "s7",
    patientName: "Scarlet Tam",
    age: 44,
    gender: "F",
    appointmentTime: "11:10am",
    doctorName: "Dr. B",
  },
  {
    id: "s8",
    patientName: "Amy Chan",
    age: 32,
    gender: "F",
    appointmentTime: "11:00am",
    doctorName: "Dr. Jane Doe",
  },
];

/** Returns appointments that fall on the given date. */
export function getAppointmentsForDate(
  appointments: CalendarAppointment[],
  date: Date
): CalendarAppointment[] {
  const dateStr = date.toLocaleDateString("en-CA"); // "2026-03-06"
  return appointments.filter((a) => a.start.startsWith(dateStr));
}

export function countAppointmentsPerResource(
  appointments: CalendarAppointment[]
): Record<string, number> {
  return appointments.reduce<Record<string, number>>((acc, a) => {
    acc[a.resourceId] = (acc[a.resourceId] ?? 0) + 1;
    return acc;
  }, {});
}
