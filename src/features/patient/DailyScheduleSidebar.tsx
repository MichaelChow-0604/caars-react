import { useState } from "react";
import { useNavigate } from "react-router";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import AppointmentPreview from "@/components/AppointmentPreview";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconTask,
} from "@/lib/icon";
import type { StaffMember } from "@/layouts/menu-bar/MenuBar";
import {
  FAKE_APPOINTMENTS,
  getAppointmentsForDate,
  getAppointmentsForDoctor,
  countAppointmentsPerResource,
} from "@/features/calendar/calendarData";

const START_HOUR = 9;
const END_HOUR = 18;
const SLOT_MINUTES = 10;

function getSlotsForDay(date: Date): Date[] {
  const slots: Date[] = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      slots.push(setMinutes(setHours(new Date(date), h), m));
    }
  }
  return slots;
}

function slotToTimeKey(slot: Date): string {
  return format(slot, "HH:mm");
}

function parseAppointmentStart(start: string): string {
  return start.slice(11, 16);
}

export interface DailyScheduleSidebarProps {
  staffList: StaffMember[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  patientId?: string;
}

export default function DailyScheduleSidebar({
  staffList,
  selectedDate,
  onDateChange,
  patientId,
}: DailyScheduleSidebarProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    staffList[0]?.id ?? ""
  );

  const appointmentsForDate = getAppointmentsForDate(
    FAKE_APPOINTMENTS,
    selectedDate
  );
  const appointmentsForDoctor = getAppointmentsForDoctor(
    appointmentsForDate,
    selectedDoctorId
  );
  const appointmentCounts = countAppointmentsPerResource(appointmentsForDate);

  const slotToAppointment = new Map<
    string,
    (typeof appointmentsForDoctor)[0]
  >();
  for (const apt of appointmentsForDoctor) {
    const timeKey = parseAppointmentStart(apt.start);
    slotToAppointment.set(timeKey, apt);
  }

  const slots = getSlotsForDay(selectedDate);

  const handlePrev = () => onDateChange(addDays(selectedDate, -1));
  const handleNext = () => onDateChange(addDays(selectedDate, 1));
  const handleAppointmentClick = (aptPatientId: string) => {
    navigate(`/patient/${aptPatientId}`);
  };

  const count = appointmentCounts[selectedDoctorId] ?? 0;

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r-2 border-caars-neutral-grey-4 overflow-hidden transition-[width] duration-300",
        collapsed
          ? "w-[32px] bg-caars-neutral-grey-4"
          : "w-[280px] bg-caars-neutral-grey-2 py-2"
      )}
    >
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-center w-full h-full min-h-[120px] hover:bg-caars-neutral-grey-3 transition-colors"
          aria-label="Expand Daily Schedule"
        >
          <IconChevronRight className="size-5 text-caars-neutral-grey-7" />
        </button>
      ) : (
        <>
          <div className="flex items-center justify-between pl-2 pr-0.5 w-full shrink-0">
            <div className="flex gap-1.5 items-center shrink-0 min-w-0">
              <IconTask className="size-6 text-caars-primary-1 shrink-0" />
              <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-primary-1 whitespace-nowrap">
                Daily Schedule
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center rounded-tl-[12px] rounded-bl-[12px] shrink-0 h-[53px] px-2 bg-caars-neutral-grey-3 transition-colors hover:bg-caars-neutral-grey-4"
              aria-label="Collapse sidebar"
            >
              <IconChevronLeft className="size-5 text-caars-neutral-grey-7" />
            </button>
          </div>

          <div className="flex flex-col gap-2 px-2 shrink-0 w-full overflow-hidden min-w-0">
            <div className="flex flex-col gap-0.5 w-full min-w-0 rounded-lg border border-caars-neutral-grey-4 bg-caars-neutral-white px-4 py-3">
              <div className="relative">
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full min-w-0 bg-transparent font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black outline-none cursor-pointer appearance-none pr-6"
                >
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
                <IconChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-4 text-caars-neutral-grey-6 pointer-events-none" />
              </div>
              <span className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-grey-6 truncate">
                {count} appointment{count !== 1 ? "s" : ""} remaining
              </span>
            </div>

            <div className="flex items-center gap-1 p-2 rounded-lg bg-caars-neutral-grey-3">
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center justify-center size-6 rounded-full text-caars-neutral-grey-6 hover:bg-caars-neutral-grey-4 transition-colors shrink-0"
                aria-label="Previous day"
              >
                <IconChevronLeft className="size-4" />
              </button>
              <span className="flex-1 font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-grey-7 text-center min-w-0 truncate">
                {format(selectedDate, "d MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center size-6 rounded-full text-caars-neutral-grey-6 hover:bg-caars-neutral-grey-4 transition-colors shrink-0"
                aria-label="Next day"
              >
                <IconChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto py-2 px-2 flex flex-col gap-2">
            {slots.map((slot) => {
              const timeKey = slotToTimeKey(slot);
              const apt = slotToAppointment.get(timeKey);
              const isCurrentPatient =
                apt && patientId && apt.extendedProps.patientId === patientId;

              return (
                <div key={timeKey} className="flex flex-col gap-2 shrink-0">
                  <div className="flex gap-2 items-center w-full">
                    <div className="flex-1 h-px bg-caars-neutral-grey-4 shrink-0" />
                    <span className="font-caars-header text-caars-body-3 leading-caars-body-3 font-normal text-caars-neutral-grey-6 shrink-0">
                      {format(slot, "h:mm aaa")}
                    </span>
                    <div className="flex-1 h-px bg-caars-neutral-grey-4 shrink-0" />
                  </div>
                  {apt ? (
                    <AppointmentPreview
                      line1={apt.extendedProps.patientName}
                      line2={apt.extendedProps.time}
                      state={apt.extendedProps.state}
                      className={cn(
                        "w-full shrink-0",
                        isCurrentPatient && "border-2 border-caars-success-1"
                      )}
                      onClick={() =>
                        handleAppointmentClick(apt.extendedProps.patientId)
                      }
                    />
                  ) : (
                    <div className="bg-caars-neutral-grey-2 h-[73px] shrink-0 w-full" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
}
