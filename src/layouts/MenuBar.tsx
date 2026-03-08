import { useState } from "react";

import { cn } from "@/lib/utils";
import { IconAccount, IconDate, IconInfo, IconSetting } from "@/lib/icon";

import { MenuTabs } from "@/layouts/menuBar/MenuTabs";
import { MiniCalendarSection } from "@/layouts/menuBar/MiniCalendarSection";
import { StaffListSection } from "@/layouts/menuBar/StaffListSection";
import { UserCard } from "@/layouts/menuBar/UserCard";
import type { CurrentUser, StaffMember } from "@/layouts/menuBar/types";

export type { CurrentUser, StaffMember } from "@/layouts/menuBar/types";

export interface MenuBarProps {
  mode: "day" | "week";
  activeNavItem?: string;
  onNavItemClick?: (item: string) => void;
  staffList?: StaffMember[];
  currentUser?: CurrentUser;
  currentUserId?: string;
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

const MENU_WIDTH_EXPANDED = "w-[280px]";
const MENU_WIDTH_COLLAPSED = "w-[84px]";

export default function MenuBar({
  mode,
  activeNavItem = "calendar",
  onNavItemClick,
  staffList = DEFAULT_STAFF_LIST,
  currentUser = DEFAULT_USER,
  currentUserId,
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
    const next = checked
      ? staffList.map((s) => s.id)
      : currentUserId
        ? [currentUserId]
        : [];
    setInternalChecked(next);
    onCheckedStaffChange?.(next);
  };

  const handleCheckStaff = (id: string, checked: boolean) => {
    if (!checked && id === currentUserId) return;
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

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col bg-caars-neutral-white border-r-2 border-caars-neutral-grey-4 overflow-hidden transition-[width] duration-300",
        collapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH_EXPANDED
      )}
    >
      <MenuTabs
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        items={NAV_ITEMS}
        activeNavItem={activeNavItem}
        onNavItemClick={onNavItemClick}
      />

      {!collapsed ? (
        <>
          <MiniCalendarSection
            mode={mode}
            date={date}
            onDateChange={handleDateChange}
          />
          {activeNavItem === 'calendar' ? (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <StaffListSection
                mode={mode}
                staffList={staffList}
                currentUserId={currentUserId}
                checkedStaffIds={checkedIds}
                selectedStaffId={selectedId}
                onCheckAll={handleCheckAll}
                onCheckStaff={handleCheckStaff}
                onSelectStaff={handleSelectStaff}
              />
            </div>
          ) : (
            <div className="flex-1 min-h-0" />
          )}
        </>
      ) : (
        <div className="flex-1 min-h-0" />
      )}

      <UserCard
        collapsed={collapsed}
        currentUser={currentUser}
        onSignOut={onSignOut}
      />
    </aside>
  );
}
