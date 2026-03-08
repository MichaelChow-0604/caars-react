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

  const rawEvents = useMemo(
    () => (patientId ? getTimelineEventsForPatient(patientId) : []),
    [patientId],
  );
  const categories = useMemo(
    () => (patientId ? getDiagnosisCategoriesForPatient(patientId) : []),
    [patientId],
  );

  const [filters, setFilters] = useState<TimelineFilters>(() => ({
    severityLevels: [...ALL_SEVERITY_LEVELS],
    categoryIds: patientId
      ? getDiagnosisCategoriesForPatient(patientId).map((c) => c.id)
      : [],
    dateRange: { from: undefined, to: undefined },
  }));

  const filteredEvents = useMemo(
    () => filterEvents(rawEvents, filters),
    [rawEvents, filters],
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
    if (!patientId) return;
    const cats = getDiagnosisCategoriesForPatient(patientId);
    setFilters((prev) => ({
      ...prev,
      categoryIds: cats.map((c) => c.id),
    }));
  }, [patientId]);

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
        categoryIds={filters.categoryIds}
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
        categories={categories.filter((c) => filters.categoryIds.includes(c.id))}
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
