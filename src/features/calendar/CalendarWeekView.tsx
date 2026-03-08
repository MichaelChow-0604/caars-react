import { useEffect, useRef } from "react";
import { format, isToday } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type {
  EventContentArg,
  SlotLabelContentArg,
  DayHeaderContentArg,
} from "@fullcalendar/core";
import AppointmentPreview from "@/components/AppointmentPreview";
import {
  FAKE_APPOINTMENTS,
  getAppointmentsForDoctor,
  getAppointmentsForWeek,
} from "./calendarData";

interface CalendarWeekViewProps {
  selectedDate: Date;
  selectedStaffId: string;
  onWeekdayClick: (date: Date) => void;
}

const AXIS_WIDTH = 90;

export default function CalendarWeekView({
  selectedDate,
  selectedStaffId,
  onWeekdayClick,
}: CalendarWeekViewProps) {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      calendarRef.current?.getApi().updateSize();
    }, 80);
    return () => clearTimeout(timeout);
  }, []);

  const doctorAppointments = getAppointmentsForDoctor(
    FAKE_APPOINTMENTS,
    selectedStaffId
  );
  const weekAppointments = getAppointmentsForWeek(
    doctorAppointments,
    selectedDate
  );

  return (
    <div
      className="fc-caars-week-wrapper flex-1 min-h-0"
      style={{ overflowX: "hidden", overflowY: "auto" }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        initialDate={selectedDate}
        hiddenDays={[0, 6]}
        slotDuration="00:10:00"
        slotLabelInterval="00:10:00"
        slotMinTime="09:00:00"
        slotMaxTime="18:00:00"
        slotLabelContent={(arg: SlotLabelContentArg) =>
          format(arg.date, "h:mm aaa")
        }
        nowIndicator
        nowIndicatorDidMount={(arg) => {
          if (!arg.isAxis) return;
          const el = arg.el as HTMLElement;
          let node: HTMLElement | null = el;
          for (let i = 0; i < 8 && node; i++) {
            node.style.overflow = "visible";
            node = node.parentElement;
          }
          Object.assign(el.style, {
            display: "block",
            width: `${AXIS_WIDTH}px`,
            textAlign: "right",
            paddingRight: "10px",
            color: "#ff9500",
            fontSize: "11px",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
            transform: "translateY(-50%)",
            border: "none",
            margin: "0",
          });
          el.textContent = format(arg.date, "h:mm aaa");
        }}
        headerToolbar={false}
        allDaySlot={false}
        events={weekAppointments}
        dayHeaderContent={(arg: DayHeaderContentArg) =>
          renderWeekDayHeader(arg, onWeekdayClick)
        }
        eventContent={renderEventContent}
        height="auto"
        expandRows={false}
      />
    </div>
  );
}

function renderWeekDayHeader(
  arg: DayHeaderContentArg,
  onWeekdayClick: (date: Date) => void
) {
  const date = arg.date;
  const dayName = format(date, "EEE");
  const dayNum = format(date, "d");
  const today = isToday(date);

  return (
    <button
      type="button"
      onClick={() => onWeekdayClick(date)}
      className={`fc-caars-week-day-header-btn ${
        today ? "fc-caars-week-day-header-btn--today" : ""
      }`}
    >
      <span className="fc-caars-week-day-name">{dayName}</span>
      <span className="fc-caars-week-day-num">{dayNum}</span>
    </button>
  );
}

function renderEventContent(arg: EventContentArg) {
  const { patientName, time, state } = arg.event.extendedProps as {
    patientName: string;
    time: string;
    state: "active" | "cancelled" | "expired";
  };

  return (
    <AppointmentPreview
      line1={patientName}
      line2={time}
      state={state}
      className="w-full h-full rounded-[8px] border-none px-3 py-2 shadow-none overflow-hidden"
    />
  );
}
