import { useEffect, useMemo, useState } from 'react';
import { useLayoutStore } from '@/stores/layoutStore';
import { TimelineFilterPanel } from './TimelineFilterPanel';
import { TimelineGrid } from './TimelineGrid';
import { EventDetailSheet } from './EventDetailSheet';
import {
  getTimelineEventsForPatient,
  getDiagnosisCategoriesForPatient,
} from './timelineData';
import type { TimelineEvent, TimelineFilters, SeverityLevel } from './types';

const ALL_SEVERITY_LEVELS: SeverityLevel[] = [
  'emergency',
  'routine',
  'normal',
];

export interface TimelineTabProps {
  patientId?: string;
}

function filterEvents(
  events: TimelineEvent[],
  filters: TimelineFilters,
): TimelineEvent[] {
  return events.filter((evt) => {
    if (!filters.severityLevels.includes(evt.severity)) return false;
    if (!filters.categoryIds.includes(evt.categoryId)) return false;
    const evtDate = new Date(evt.date).getTime();
    if (filters.dateRange.from && evtDate < filters.dateRange.from.getTime())
      return false;
    if (filters.dateRange.to && evtDate > filters.dateRange.to.getTime())
      return false;
    return true;
  });
}

function countBySeverity(events: TimelineEvent[]): Record<SeverityLevel, number> {
  const counts: Record<SeverityLevel, number> = {
    emergency: 0,
    routine: 0,
    normal: 0,
  };
  for (const evt of events) {
    counts[evt.severity]++;
  }
  return counts;
}

function countByCategory(
  events: TimelineEvent[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const evt of events) {
    counts[evt.categoryId] = (counts[evt.categoryId] ?? 0) + 1;
  }
  return counts;
}

export default function TimelineTab({ patientId }: TimelineTabProps) {
  const setMenuBarCollapsed = useLayoutStore((s) => s.setMenuBarCollapsed);
  const [isCompactView, setIsCompactView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filters, setFilters] = useState<TimelineFilters>({
    severityLevels: [...ALL_SEVERITY_LEVELS],
    categoryIds: [],
    dateRange: { from: undefined, to: undefined },
  });

  const rawEvents = patientId
    ? getTimelineEventsForPatient(patientId)
    : [];
  const categories = patientId
    ? getDiagnosisCategoriesForPatient(patientId)
    : [];

  const categoryIds = useMemo(() => {
    if (filters.categoryIds.length > 0) return filters.categoryIds;
    return categories.map((c) => c.id);
  }, [filters.categoryIds, categories]);

  const effectiveFilters: TimelineFilters = useMemo(
    () => ({
      ...filters,
      categoryIds,
    }),
    [filters, categoryIds],
  );

  const filteredEvents = useMemo(
    () => filterEvents(rawEvents, effectiveFilters),
    [rawEvents, effectiveFilters],
  );

  const severityCounts = useMemo(
    () => countBySeverity(rawEvents),
    [rawEvents],
  );

  const categoryCounts = useMemo(
    () => countByCategory(rawEvents),
    [rawEvents],
  );

  useEffect(() => {
    setMenuBarCollapsed(true);
    return () => {
      setMenuBarCollapsed(false);
    };
  }, [setMenuBarCollapsed]);

  useEffect(() => {
    if (categories.length > 0 && filters.categoryIds.length === 0) {
      setFilters((prev) => ({
        ...prev,
        categoryIds: categories.map((c) => c.id),
      }));
    }
  }, [categories]);

  const handleEventSelect = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setSheetOpen(true);
  };

  const handleApplyDateRange = (override?: { from: Date; to: Date }) => {
    if (override) {
      setFilters((prev) => ({
        ...prev,
        dateRange: { from: override.from, to: override.to },
      }));
    }
  };

  if (!patientId) {
    return (
      <div className="flex flex-1 items-center justify-center bg-caars-neutral-white">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7">
          Select a patient
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row pt-1">
      <TimelineFilterPanel
        isCompactView={isCompactView}
        onCompactViewChange={setIsCompactView}
        severityLevels={filters.severityLevels}
        onSeverityChange={(levels) =>
          setFilters((prev) => ({ ...prev, severityLevels: levels }))
        }
        categoryIds={categoryIds}
        onCategoryChange={(ids) =>
          setFilters((prev) => ({ ...prev, categoryIds: ids }))
        }
        categories={categories}
        severityCounts={severityCounts}
        categoryCounts={categoryCounts}
        dateRange={filters.dateRange}
        onDateRangeChange={(range) =>
          setFilters((prev) => ({ ...prev, dateRange: range }))
        }
        onApplyDateRange={handleApplyDateRange}
      />
      <TimelineGrid
        events={filteredEvents}
        categories={categories.filter((c) => categoryIds.includes(c.id))}
        isCompactView={isCompactView}
        onEventSelect={handleEventSelect}
      />
      <EventDetailSheet
        event={selectedEvent}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
