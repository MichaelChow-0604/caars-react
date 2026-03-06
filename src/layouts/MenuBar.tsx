import { useState } from "react";
import type { DayButton } from "react-day-picker";
import { startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { cn } from "@/lib/utils";
import MasterMenuItem from "@/components/MasterMenuItem";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  IconDate,
  IconAccount,
  IconSetting,
  IconInfo,
  IconSignout,
  IconChevronLeft,
  IconChevronRight,
} from "@/lib/icon";
import logo from "@/assets/logo.png";
import logoCollapsed from "@/assets/logo_collapsed.png";

export interface StaffMember {
  id: string;
  name: string;
}

export interface CurrentUser {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface MenuBarProps {
  mode: "day" | "week";
  activeNavItem?: string;
  onNavItemClick?: (item: string) => void;
  staffList?: StaffMember[];
  currentUser?: CurrentUser;
  onSignOut?: () => void;
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  checkedStaffIds?: string[];
  onCheckedStaffChange?: (ids: string[]) => void;
  selectedStaffId?: string;
  onSelectedStaffChange?: (id: string) => void;
}

const DEFAULT_STAFF_LIST: StaffMember[] = [
  { id: "1", name: "Dr. Jane Doe" },
  { id: "2", name: "Dr. Mill Phil" },
  { id: "3", name: "Dr. John Smith" },
  { id: "4", name: "Dr. Van Tin" },
  { id: "5", name: "Dr. B" },
  { id: "6", name: "Dr. Jane Doe" },
];

const DEFAULT_USER: CurrentUser = {
  name: "Dr. Jane Doe",
  role: "General Practitioner",
};

const NAV_ITEMS = [
  { id: "calendar", label: "Calendar", icon: IconDate },
  { id: "patient", label: "Patient", icon: IconAccount },
  { id: "setting", label: "Setting", icon: IconSetting },
  { id: "bug-report", label: "Bug Report", icon: IconInfo },
];

export default function MenuBar({
  mode,
  activeNavItem = "calendar",
  onNavItemClick,
  staffList = DEFAULT_STAFF_LIST,
  currentUser = DEFAULT_USER,
  onSignOut,
  selectedDate,
  onDateChange,
  checkedStaffIds,
  onCheckedStaffChange,
  selectedStaffId,
  onSelectedStaffChange,
}: MenuBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const [internalDate, setInternalDate] = useState<Date | undefined>(
    new Date()
  );
  const [internalChecked, setInternalChecked] = useState<string[]>(
    staffList.map((s) => s.id)
  );
  const [internalSelected, setInternalSelected] = useState<string>(
    staffList[0]?.id ?? ""
  );

  const date = selectedDate ?? internalDate;
  const checkedIds = checkedStaffIds ?? internalChecked;
  const selectedId = selectedStaffId ?? internalSelected;

  const handleDateChange = (d: Date | undefined) => {
    setInternalDate(d);
    onDateChange?.(d);
  };

  const handleCheckAll = (checked: boolean) => {
    const next = checked ? staffList.map((s) => s.id) : [];
    setInternalChecked(next);
    onCheckedStaffChange?.(next);
  };

  const handleCheckStaff = (id: string, checked: boolean) => {
    const next = checked
      ? [...checkedIds, id]
      : checkedIds.filter((c) => c !== id);
    setInternalChecked(next);
    onCheckedStaffChange?.(next);
  };

  const handleSelectStaff = (id: string) => {
    setInternalSelected(id);
    onSelectedStaffChange?.(id);
  };

  const allChecked = staffList.every((s) => checkedIds.includes(s.id));
  const someChecked = staffList.some((s) => checkedIds.includes(s.id));

  return (
    <aside
      className={cn(
        "relative flex h-full shrink-0 flex-col bg-caars-neutral-white border-r-2 border-caars-neutral-grey-4 overflow-hidden transition-[width] duration-300",
        collapsed ? "w-[84px]" : "w-[280px]"
      )}
    >
      {/* Header */}
      {collapsed ? (
        <>
          {/* Collapsed: logo centered */}
          <div className="flex items-center justify-center px-6 pt-4 pb-2 shrink-0 w-full">
            <img
              src={logoCollapsed}
              alt="CAARS"
              className="h-[44px] w-[44px] object-contain shrink-0"
            />
          </div>
          {/* Collapsed: expand toggle below logo */}
          <div className="flex items-center justify-center py-2 shrink-0 w-full">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="flex items-center justify-center h-[40px] px-3 bg-caars-neutral-grey-3 rounded-[8px] transition-colors hover:bg-caars-neutral-grey-4"
              aria-label="Expand menu"
            >
              <IconChevronRight className="size-5 text-caars-neutral-grey-7" />
            </button>
          </div>
        </>
      ) : (
        <div className="relative flex items-center pl-6 py-4 shrink-0 w-full">
          <img
            src={logo}
            alt="CAARS"
            className="h-[52px] w-auto object-contain shrink-0"
          />
          {/* Collapse toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="absolute right-0 top-2 flex items-center justify-center h-[53px] px-2 bg-caars-neutral-grey-3 rounded-tl-[12px] rounded-bl-[12px] transition-colors hover:bg-caars-neutral-grey-4"
            aria-label="Collapse menu"
          >
            <IconChevronLeft className="size-5 text-caars-neutral-grey-7" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 py-2 shrink-0 w-full">
        {collapsed
          ? NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <CollapsedNavItem
                key={id}
                icon={<Icon className="size-6" />}
                active={activeNavItem === id}
                label={label}
                onClick={() => onNavItemClick?.(id)}
              />
            ))
          : NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <MasterMenuItem
                key={id}
                label={label}
                icon={<Icon className="size-6" />}
                active={activeNavItem === id}
                onClick={() => onNavItemClick?.(id)}
                className="w-full"
              />
            ))}
      </nav>

      {/* Expanded-only content */}
      {!collapsed && (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto pb-[74px]">
          {/* Mini Calendar */}
          <div className="p-4 shrink-0">
            <div className="bg-caars-neutral-grey-2 rounded-[12px] pt-3 overflow-hidden">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                className="w-full p-0 [--cell-size:--spacing(7)]"
                formatters={{
                  formatWeekdayName: (day) =>
                    day
                      .toLocaleDateString("en-US", { weekday: "long" })
                      .charAt(0),
                }}
                modifiers={
                  mode === "week" && date
                    ? {
                        weekRange: eachDayOfInterval({
                          start: startOfWeek(date, { weekStartsOn: 1 }),
                          end: endOfWeek(date, { weekStartsOn: 1 }),
                        }),
                      }
                    : undefined
                }
                classNames={{
                  month_caption:
                    "flex h-7 w-full items-center justify-center px-7",
                  caption_label:
                    "text-xs font-semibold text-caars-neutral-grey-7",
                  nav: "absolute inset-x-2 top-0 flex w-auto items-center justify-between",
                  button_previous:
                    "size-7 p-0 hover:bg-transparent text-caars-neutral-grey-7",
                  button_next:
                    "size-7 p-0 hover:bg-transparent text-caars-neutral-grey-7",
                  weekdays: "flex w-full",
                  weekday:
                    "flex-1 text-center text-[10px] font-medium text-caars-neutral-black opacity-70 select-none",
                  week: "mt-1 flex w-full",
                  day: "flex-1 aspect-square p-0 text-center",
                  today: "",
                  outside: "opacity-30",
                }}
                components={{
                  DayButton: MiniCalendarDayButton,
                }}
              />
            </div>
          </div>

          {/* Staff List */}
          <div className="flex flex-col gap-4 p-4 shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-black">
                Staff List
              </span>
              {mode === "day" && (
                <button
                  type="button"
                  onClick={() => handleCheckAll(false)}
                  className="font-caars-header text-caars-button-2 leading-caars-button-2 tracking-caars-button-2 font-semibold text-caars-neutral-grey-6 underline decoration-solid hover:text-caars-neutral-grey-7 transition-colors"
                >
                  Deselect All
                </button>
              )}
            </div>

            {/* Day mode: checkboxes */}
            {mode === "day" && (
              <div className="flex flex-col gap-4">
                <Checkbox
                  checked={
                    allChecked ? true : someChecked ? "indeterminate" : false
                  }
                  onCheckedChange={(v) => handleCheckAll(v === true)}
                  label="Select All"
                  bold={false}
                />
                {staffList.map((staff) => (
                  <Checkbox
                    key={staff.id}
                    checked={checkedIds.includes(staff.id)}
                    onCheckedChange={(v) =>
                      handleCheckStaff(staff.id, v === true)
                    }
                    label={staff.name}
                    bold={false}
                  />
                ))}
              </div>
            )}

            {/* Week mode: radio buttons */}
            {mode === "week" && (
              <RadioGroup
                value={selectedId}
                onValueChange={handleSelectStaff}
                className="gap-0"
              >
                {staffList.map((staff) => {
                  const isSelected = selectedId === staff.id;
                  return (
                    <label
                      key={staff.id}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-[4px] cursor-pointer transition-colors",
                        isSelected
                          ? "bg-caars-primary-4"
                          : "bg-caars-neutral-white hover:bg-caars-neutral-grey-3"
                      )}
                    >
                      <RadioGroupItem
                        value={staff.id}
                        className={cn(
                          "shrink-0",
                          isSelected
                            ? "border-caars-primary-1 text-caars-primary-1"
                            : "border-caars-neutral-grey-5"
                        )}
                      />
                      <span
                        className={cn(
                          "font-caars-header text-caars-body-1 leading-caars-body-1 font-normal",
                          isSelected
                            ? "text-caars-primary-1"
                            : "text-caars-neutral-black"
                        )}
                      >
                        {staff.name}
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            )}
          </div>
        </div>
      )}

      {/* Footer: User section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-caars-neutral-grey-4 bg-caars-neutral-white">
        {collapsed ? (
          <div className="flex items-center justify-center p-4">
            <button
              type="button"
              onClick={onSignOut}
              className="text-caars-neutral-grey-6 hover:text-caars-neutral-black transition-colors"
              aria-label="Sign out"
            >
              <IconSignout className="size-6" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4">
            <Avatar size="lg" className="shrink-0">
              {currentUser.avatarUrl ? (
                <AvatarImage
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                />
              ) : null}
              <AvatarFallback className="bg-caars-secondary-4 text-caars-secondary-3 font-semibold text-xs">
                {currentUser.name
                  .split(" ")
                  .filter((_, i) => i === 1 || i === 2)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col min-w-0">
              <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-black truncate">
                {currentUser.name}
              </span>
              <span className="font-caars-header text-caars-overline leading-caars-caption font-normal text-caars-neutral-grey-6 truncate">
                {currentUser.role}
              </span>
            </div>

            <button
              type="button"
              onClick={onSignOut}
              className="shrink-0 text-caars-neutral-grey-6 hover:text-caars-neutral-black transition-colors"
              aria-label="Sign out"
            >
              <IconSignout className="size-6" />
            </button>
          </div>
        )}
      </div>
    </aside>
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
        "flex aspect-square w-full items-center justify-center rounded-full text-[10px] font-medium leading-none transition-colors",
        isSelected
          ? "bg-caars-primary-1 text-caars-neutral-white hover:bg-caars-primary-1"
          : isToday
          ? "border border-caars-primary-1 text-caars-primary-1 hover:bg-caars-neutral-grey-4"
          : isWeekRange
          ? "bg-caars-primary-2 text-caars-primary-1 hover:bg-caars-primary-3 hover:text-caars-neutral-white"
          : "text-caars-neutral-black hover:bg-caars-neutral-grey-4",
        modifiers.outside && "opacity-30",
        modifiers.disabled && "opacity-50 cursor-not-allowed"
      )}
    />
  );
}

interface CollapsedNavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  label: string;
  onClick?: () => void;
}

function CollapsedNavItem({
  icon,
  active = false,
  label,
  onClick,
}: CollapsedNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="group flex w-full items-center gap-2 pr-4 rounded-[12px]"
    >
      <span
        className={cn(
          "h-[52px] w-1 shrink-0 rounded-tr-[4px] rounded-br-[4px] transition-colors",
          active
            ? "bg-caars-primary-3"
            : "bg-caars-neutral-white group-hover:bg-caars-primary-3"
        )}
      />
      <div
        className={cn(
          "flex flex-1 items-center justify-center rounded-[12px] p-4 transition-colors",
          active
            ? "bg-caars-primary-4"
            : "bg-caars-neutral-white group-hover:bg-caars-primary-3"
        )}
      >
        <span
          className={cn(
            "size-6 transition-colors",
            active
              ? "text-caars-primary-3"
              : "text-caars-neutral-black group-hover:text-caars-neutral-white"
          )}
        >
          {icon}
        </span>
      </div>
    </button>
  );
}
