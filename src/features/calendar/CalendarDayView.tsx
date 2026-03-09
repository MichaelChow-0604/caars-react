import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import type { EventContentArg, SlotLabelContentArg } from "@fullcalendar/core";
import AppointmentPreview from "@/components/AppointmentPreview";
import type { StaffMember } from "@/layouts/menu-bar/MenuBar";
import {
  FAKE_APPOINTMENTS,
  getAppointmentsForDate,
  countAppointmentsPerResource,
} from "./calendarData";

interface CalendarDayViewProps {
  selectedDate: Date;
  checkedStaff: StaffMember[];
  currentUserId: string;
  onDoctorHeaderClick: (staffId: string) => void;
}

const COLUMN_WIDTH = 280;
const AXIS_WIDTH = 90;

export default function CalendarDayView({
  selectedDate,
  checkedStaff,
  currentUserId,
  onDoctorHeaderClick,
}: CalendarDayViewProps) {
  const navigate = useNavigate();
  const calendarRef = useRef<FullCalendar>(null);

  // Navigate calendar when date changes
  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  // Force FullCalendar to recalculate layout after mount so the
  // now-indicator position is correct on the very first render
  useEffect(() => {
    const timeout = setTimeout(() => {
      calendarRef.current?.getApi().updateSize();
    }, 80);
    return () => clearTimeout(timeout);
  }, []);

  const appointments = getAppointmentsForDate(FAKE_APPOINTMENTS, selectedDate);
  const appointmentCounts = countAppointmentsPerResource(appointments);

  const sortedStaff = [...checkedStaff].sort((a, b) =>
    a.id === currentUserId ? -1 : b.id === currentUserId ? 1 : 0
  );

  const resources = sortedStaff.map((s) => ({
    id: s.id,
    title: s.name,
    classNames: s.id === currentUserId ? ["fc-caars-user-col"] : [],
    extendedProps: { appointmentCount: appointmentCounts[s.id] ?? 0 },
  }));

  const totalWidth = sortedStaff.length * COLUMN_WIDTH + AXIS_WIDTH;

  return (
    // Single scroll container: overflowX scroll (always visible), overflowY auto
    <div
      className="fc-caars-wrapper flex-1 min-h-0"
      style={{ overflowX: "scroll", overflowY: "auto" }}
    >
      {/* Fixed-width inner forces horizontal overflow when many columns; border-right ensures right edge visible */}
      <div
        className="border-r border-caars-neutral-grey-4"
        style={{ width: `${totalWidth}px` }}
      >
        <FullCalendar
          ref={calendarRef}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[resourceTimeGridPlugin]}
          initialView="resourceTimeGridDay"
          initialDate={selectedDate}
          slotDuration="00:10:00"
          slotLabelInterval="00:10:00"
          slotMinTime="09:00:00"
          slotMaxTime="18:00:00"
          // Use slotLabelContent for "h:mm am/pm" formatting (with space)
          slotLabelContent={(arg: SlotLabelContentArg) =>
            format(arg.date, "h:mm aaa")
          }
          nowIndicator
          headerToolbar={false}
          allDaySlot={false}
          resources={resources}
          datesSet={() => {
            const wrapper = document.querySelector(".fc-caars-wrapper");
            if (!wrapper) return;
            wrapper
              .querySelectorAll(".fc-caars-user-col")
              .forEach((el) => el.classList.remove("fc-caars-user-col"));
            const headerCells = wrapper.querySelectorAll(".fc-col-header-cell");
            const firstResourceHeader = headerCells[0];
            if (firstResourceHeader)
              firstResourceHeader.classList.add("fc-caars-user-col");
            const bodyCols = wrapper.querySelectorAll(
              ".fc-timegrid-col:not(.fc-timegrid-axis)"
            );
            const firstResourceCol = bodyCols[0];
            if (firstResourceCol)
              firstResourceCol.classList.add("fc-caars-user-col");
          }}
          events={appointments}
          resourceLabelContent={(arg) =>
            renderResourceLabel(arg, onDoctorHeaderClick)
          }
          eventContent={(arg) => renderEventContent(arg, navigate)}
        />
      </div>
    </div>
  );
}

function renderResourceLabel(
  arg: any,
  onDoctorHeaderClick: (staffId: string) => void
) {
  const { id, title, extendedProps } = arg.resource;
  const count: number =
    (extendedProps as { appointmentCount: number }).appointmentCount ?? 0;

  return (
    <button
      type="button"
      onClick={() => onDoctorHeaderClick(id)}
      className="flex flex-col items-center justify-center gap-0.5 py-2 w-full text-center group cursor-pointer transition-colors hover:bg-caars-primary-4 rounded-[4px]"
      title={`View ${title}'s weekly timetable`}
    >
      <span className="font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold text-caars-neutral-black group-hover:text-caars-primary-1 transition-colors">
        {title}
      </span>
      <span className="font-caars-header text-caars-body-3 leading-caars-body-3 font-normal text-caars-neutral-grey-6">
        {count} appointment{count !== 1 ? "s" : ""} remaining
      </span>
    </button>
  );
}

function renderEventContent(
  arg: EventContentArg,
  navigate: (path: string) => void
) {
  const { patientId, patientName, time, state } = arg.event.extendedProps as {
    patientId: string;
    patientName: string;
    time: string;
    state: "active" | "cancelled" | "expired";
  };

  return (
    <AppointmentPreview
      line1={patientName}
      line2={time}
      state={state}
      className="w-full h-[90%] rounded-[8px]"
      onClick={() => navigate(`/patient/${patientId}`)}
    />
  );
}
