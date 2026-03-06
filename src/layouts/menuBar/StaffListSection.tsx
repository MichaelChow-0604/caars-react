import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { StaffMember } from './types';

interface StaffListSectionProps {
  mode: 'day' | 'week';
  staffList: StaffMember[];
  checkedStaffIds: string[];
  selectedStaffId: string;
  onCheckAll: (checked: boolean) => void;
  onCheckStaff: (id: string, checked: boolean) => void;
  onSelectStaff: (id: string) => void;
}

export function StaffListSection({
  mode,
  staffList,
  checkedStaffIds,
  selectedStaffId,
  onCheckAll,
  onCheckStaff,
  onSelectStaff,
}: StaffListSectionProps) {
  const allChecked = staffList.every((s) => checkedStaffIds.includes(s.id));
  const someChecked = staffList.some((s) => checkedStaffIds.includes(s.id));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-black">
          Staff List
        </span>
        {mode === 'day' && (
          <button
            type="button"
            onClick={() => onCheckAll(false)}
            className="font-caars-header text-caars-button-2 leading-caars-button-2 tracking-caars-button-2 font-semibold text-caars-neutral-grey-6 underline decoration-solid hover:text-caars-neutral-grey-7 transition-colors"
          >
            Deselect All
          </button>
        )}
      </div>

      {mode === 'day' ? (
        <div className="flex flex-col gap-4">
          <Checkbox
            checked={allChecked ? true : someChecked ? 'indeterminate' : false}
            onCheckedChange={(v) => onCheckAll(v === true)}
            label="Select All"
            bold={false}
          />
          {staffList.map((staff) => (
            <Checkbox
              key={staff.id}
              checked={checkedStaffIds.includes(staff.id)}
              onCheckedChange={(v) => onCheckStaff(staff.id, v === true)}
              label={staff.name}
              bold={false}
            />
          ))}
        </div>
      ) : (
        <RadioGroup
          value={selectedStaffId}
          onValueChange={onSelectStaff}
          className="gap-0"
        >
          {staffList.map((staff) => {
            const isSelected = selectedStaffId === staff.id;
            return (
              <label
                key={staff.id}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-[4px] cursor-pointer transition-colors',
                  isSelected
                    ? 'bg-caars-primary-4'
                    : 'bg-caars-neutral-white hover:bg-caars-neutral-grey-3',
                )}
              >
                <RadioGroupItem
                  value={staff.id}
                  className={cn(
                    'shrink-0',
                    isSelected
                      ? 'border-caars-primary-1 text-caars-primary-1'
                      : 'border-caars-neutral-grey-5',
                  )}
                />
                <span
                  className={cn(
                    'font-caars-header text-caars-body-1 leading-caars-body-1 font-normal',
                    isSelected ? 'text-caars-primary-1' : 'text-caars-neutral-black',
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
  );
}

