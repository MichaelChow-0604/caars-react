import { subMonths } from 'date-fns';
import { LayoutGrid, LayoutList, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { SeverityLevel } from './types';
import type { DiagnosisCategory } from './types';

const SEVERITY_CONFIG: Record<
  SeverityLevel,
  { label: string; dotColor: string }
> = {
  emergency: { label: 'Emergency', dotColor: 'bg-caars-error-1' },
  routine: { label: 'Routine', dotColor: 'bg-caars-warning-1' },
  normal: { label: 'Normal', dotColor: 'bg-caars-success-1' },
};

const ALL_SEVERITIES: SeverityLevel[] = ['emergency', 'routine', 'normal'];

export interface TimelineFilterPanelProps {
  isCompactView: boolean;
  onCompactViewChange: (value: boolean) => void;
  severityLevels: SeverityLevel[];
  onSeverityChange: (levels: SeverityLevel[]) => void;
  categoryIds: string[];
  onCategoryChange: (ids: string[]) => void;
  categories: DiagnosisCategory[];
  severityCounts: Record<SeverityLevel, number>;
  categoryCounts: Record<string, number>;
  dateRange: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onApplyDateRange: (override?: { from: Date; to: Date }) => void;
}

function formatDateForInput(d: Date | undefined): string {
  if (!d) return '';
  return d.toISOString().slice(0, 10);
}

export function TimelineFilterPanel({
  isCompactView,
  onCompactViewChange,
  severityLevels,
  onSeverityChange,
  categoryIds,
  onCategoryChange,
  categories,
  severityCounts,
  categoryCounts,
  dateRange,
  onDateRangeChange,
  onApplyDateRange,
}: TimelineFilterPanelProps) {
  const severityMasterState = ALL_SEVERITIES.every((l) =>
    severityLevels.includes(l),
  );

  const categoryMasterState =
    categories.length > 0 && categories.every((c) => categoryIds.includes(c.id));

  const handleSeverityToggle = (level: SeverityLevel, checked: boolean) => {
    if (checked) {
      onSeverityChange([...severityLevels, level]);
    } else {
      onSeverityChange(severityLevels.filter((l) => l !== level));
    }
  };

  const handleCategoryToggle = (id: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...categoryIds, id]);
    } else {
      onCategoryChange(categoryIds.filter((c) => c !== id));
    }
  };

  const handlePresetRange = (months: number) => {
    const to = new Date();
    const from = subMonths(to, months);
    onDateRangeChange({ from, to });
    onApplyDateRange({ from, to });
  };

  const handleResetDateRange = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-4 overflow-y-auto border-r-2 border-caars-neutral-grey-4 bg-caars-neutral-grey-2 p-4">
      <Button
        type="button"
        variant="default"
        className="w-full justify-center gap-2 bg-caars-primary-1 hover:bg-caars-primary-1/90"
        onClick={() => onCompactViewChange(!isCompactView)}
      >
        {isCompactView ? (
          <>
            <LayoutList className="size-4" />
            Normal View
          </>
        ) : (
          <>
            <LayoutGrid className="size-4" />
            Compact View
          </>
        )}
      </Button>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-caars-header text-caars-body-2 font-semibold leading-caars-body-2 text-caars-neutral-black">
            Staff Severity Level
          </h3>
          <Checkbox
            checked={severityMasterState}
            title={severityMasterState ? 'Deselect all' : 'Select all'}
            onCheckedChange={(checked) =>
              checked
                ? onSeverityChange([...ALL_SEVERITIES])
                : onSeverityChange([])
            }
          />
        </div>
        {ALL_SEVERITIES.map((level) => {
          const { label, dotColor } = SEVERITY_CONFIG[level];
          const checked = severityLevels.includes(level);
          const count = severityCounts[level] ?? 0;
          const id = `filter-severity-${level}`;
          return (
            <div key={level} className="flex w-full items-center gap-2">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(c) => handleSeverityToggle(level, c === true)}
              />
              <label
                htmlFor={id}
                className="flex flex-1 cursor-pointer items-center gap-2"
              >
                <span className={cn('size-2 shrink-0 rounded-full', dotColor)} />
                <span className="font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-black">
                  {label}
                </span>
              </label>
              <span className="font-caars-header text-xs leading-caars-body-2 text-caars-neutral-grey-6">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-caars-header text-caars-body-2 font-semibold leading-caars-body-2 text-caars-neutral-black">
            Diagnosis Categories
          </h3>
          <Checkbox
            checked={categoryMasterState}
            title={categoryMasterState ? 'Deselect all' : 'Select all'}
            onCheckedChange={(checked) =>
              checked
                ? onCategoryChange(categories.map((c) => c.id))
                : onCategoryChange([])
            }
          />
        </div>
        {categories.map((cat) => {
          const checked = categoryIds.includes(cat.id);
          const count = categoryCounts[cat.id] ?? 0;
          const id = `filter-category-${cat.id}`;
          return (
            <div key={cat.id} className="flex w-full items-center gap-2">
              <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(c) => handleCategoryToggle(cat.id, c === true)}
              />
              <label
                htmlFor={id}
                className="flex-1 cursor-pointer truncate font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-black"
              >
                {cat.label}
              </label>
              <span className="shrink-0 font-caars-header text-xs leading-caars-body-2 text-caars-neutral-grey-6">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-caars-header text-caars-body-2 font-semibold leading-caars-body-2 text-caars-neutral-black">
            Date Range
          </h3>
          <button
            type="button"
            onClick={handleResetDateRange}
            className="rounded p-1 text-caars-neutral-grey-6 transition-colors hover:bg-caars-neutral-grey-3 hover:text-caars-neutral-grey-7"
            aria-label="Reset date range"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0 text-caars-neutral-grey-6" />
            <Input
              type="date"
              value={formatDateForInput(dateRange.from)}
              onChange={(e) => {
                const v = e.target.value;
                onDateRangeChange({
                  ...dateRange,
                  from: v ? new Date(v) : undefined,
                });
              }}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0 text-caars-neutral-grey-6" />
            <Input
              type="date"
              value={formatDateForInput(dateRange.to)}
              onChange={(e) => {
                const v = e.target.value;
                onDateRangeChange({
                  ...dateRange,
                  to: v ? new Date(v) : undefined,
                });
              }}
              className="flex-1"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onApplyDateRange()}
          >
            Apply
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            variant="secondary"
            size="xs"
            className="rounded-full bg-caars-neutral-grey-3 text-caars-neutral-grey-7 hover:bg-caars-neutral-grey-4"
            onClick={() => handlePresetRange(6)}
          >
            Last 6 months
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="xs"
            className="rounded-full bg-caars-neutral-grey-3 text-caars-neutral-grey-7 hover:bg-caars-neutral-grey-4"
            onClick={() => handlePresetRange(12)}
          >
            Last year
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="xs"
            className="rounded-full bg-caars-neutral-grey-3 text-caars-neutral-grey-7 hover:bg-caars-neutral-grey-4"
            onClick={() => handlePresetRange(24)}
          >
            Last 2 years
          </Button>
        </div>
      </div>
    </div>
  );
}
