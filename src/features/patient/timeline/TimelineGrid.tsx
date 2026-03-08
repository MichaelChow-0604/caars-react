import { Fragment, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { TimelineEventCard } from './TimelineEventCard';
import { CompactBullet } from './CompactBullet';
import type { TimelineEvent, DiagnosisCategory } from './types';

const COLUMN_WIDTH = 240;
const MONTH_COLUMN_WIDTH = 140;
const HEADER_ROW_HEIGHT = 56;
const CELL_PADDING_RIGHT = 24;

type MonthKey = string;

function getMonthKey(date: Date): MonthKey {
  return format(date, 'yyyy-MM');
}

function groupEventsByMonthAndCategory(
  events: TimelineEvent[],
  categoryIds: string[],
): Map<MonthKey, Map<string, TimelineEvent[]>> {
  const result = new Map<MonthKey, Map<string, TimelineEvent[]>>();
  for (const event of events) {
    if (!categoryIds.includes(event.categoryId)) continue;
    const monthKey = getMonthKey(parseISO(event.date));
    let monthMap = result.get(monthKey);
    if (!monthMap) {
      monthMap = new Map<string, TimelineEvent[]>();
      result.set(monthKey, monthMap);
    }
    let list = monthMap.get(event.categoryId);
    if (!list) {
      list = [];
      monthMap.set(event.categoryId, list);
    }
    list.push(event);
  }
  for (const monthMap of result.values()) {
    for (const list of monthMap.values()) {
      list.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    }
  }
  return result;
}

export interface TimelineGridProps {
  events: TimelineEvent[];
  categories: DiagnosisCategory[];
  isCompactView: boolean;
  onEventSelect: (event: TimelineEvent) => void;
}

export function TimelineGrid({
  events,
  categories,
  isCompactView,
  onEventSelect,
}: TimelineGridProps) {
  const { monthKeys, categoryOrder } = useMemo(() => {
    const categoryOrder = categories.map((c) => c.id);
    const grouped = groupEventsByMonthAndCategory(events, categoryOrder);
    const monthKeys = Array.from(grouped.keys()).sort();
    return { monthKeys, categoryOrder };
  }, [events, categories]);

  const grouped = useMemo(
    () => groupEventsByMonthAndCategory(events, categoryOrder),
    [events, categoryOrder],
  );

  const categoryMap = useMemo(() => {
    const m = new Map<string, DiagnosisCategory>();
    for (const c of categories) m.set(c.id, c);
    return m;
  }, [categories]);

  const eventCountByMonth = useMemo(() => {
    const counts = new Map<MonthKey, number>();
    for (const monthKey of monthKeys) {
      const monthMap = grouped.get(monthKey);
      let total = 0;
      if (monthMap) {
        for (const list of monthMap.values()) total += list.length;
      }
      counts.set(monthKey, total);
    }
    return counts;
  }, [monthKeys, grouped]);

  if (monthKeys.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-caars-neutral-white">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7">
          No events in selected range
        </span>
      </div>
    );
  }

  const gridColumns = `${MONTH_COLUMN_WIDTH}px repeat(${categoryOrder.length}, ${COLUMN_WIDTH}px)`;
  const MONTH_BAR_HEIGHT = 32;
  const gridTemplateRows = [
    `${HEADER_ROW_HEIGHT}px`,
    ...monthKeys.flatMap(() => [`${MONTH_BAR_HEIGHT}px`, 'auto']),
  ].join(' ');

  return (
    <div className="timeline-scroll-wrapper flex min-h-0 min-w-0 flex-1 overflow-auto bg-caars-neutral-white">
      <div
        className="grid min-w-max"
        style={{
          gridTemplateColumns: gridColumns,
          gridTemplateRows,
        }}
      >
        <div
          className="sticky left-0 top-0 z-20 flex h-14 items-center border-caars-neutral-grey-4 bg-caars-neutral-white px-3"
          style={{ minWidth: MONTH_COLUMN_WIDTH }}
        />
        {categoryOrder.map((catId, catIndex) => {
          const cat = categoryMap.get(catId);
          const isFirstCategory = catIndex === 0;
          return (
            /* Category row */
            <div
              key={catId}
              className={`sticky top-0 z-20 flex h-14 items-center justify-start overflow-visible border-l border-caars-neutral-grey-4 bg-caars-neutral-white pr-4`}
              style={{
                minWidth: COLUMN_WIDTH,
                paddingLeft: 0,
              }}
            >
              <div
                className="-ml-2 rounded-lg border border-caars-neutral-grey-4 bg-caars-neutral-grey-3 px-3 py-1.5"
              >
                <span className="font-caars-header text-caars-body-1 font-semibold leading-caars-body-1 text-caars-neutral-black truncate block max-w-[180px]">
                  {cat?.label ?? catId}
                </span>
              </div>
            </div>
          );
        })}
        {monthKeys.map((monthKey) => {
          const [year, month] = monthKey.split('-');
          const monthDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
          const monthLabel = format(monthDate, 'MMM yyyy');
          const eventCount = eventCountByMonth.get(monthKey) ?? 0;
          const monthMap = grouped.get(monthKey);
          return (
            <Fragment key={monthKey}>
              {/* Month row */}
              <div
                className="sticky left-0 z-10 col-span-full flex h-8 flex-row items-center gap-2 rounded bg-caars-secondary-2 px-4 mx-2"
                style={{ gridColumn: '1 / -1' }}
              >
                <span className="font-caars-header text-caars-caption font-semibold leading-caars-caption text-caars-secondary-3">
                  {monthLabel}
                </span>
                <span className="font-caars-header text-caars-overline leading-caars-overline text-caars-secondary-3">
                  ({eventCount})
                </span>
              </div>
              {/* Month Column */}
              <div
                className="sticky left-0 z-5 flex items-center bg-caars-neutral-white"
                style={{ minWidth: MONTH_COLUMN_WIDTH }}
              />
              {categoryOrder.map((catId) => {
                const cellEvents = monthMap?.get(catId) ?? [];
                return (
                  <div
                    key={`${monthKey}-${catId}`}
                    className={`flex flex-col gap-2 border-l border-caars-neutral-grey-4 bg-caars-neutral-white pl-3 ${isCompactView ? 'justify-center py-2' : 'py-3'}`}
                    style={{
                      minWidth: COLUMN_WIDTH,
                      paddingRight: CELL_PADDING_RIGHT,
                    }}
                  >
                    {isCompactView ? (
                      <div className="flex flex-col items-start gap-2 py-2 -ml-4 z-50">
                        {cellEvents.map((evt) => (
                          <CompactBullet
                            key={evt.id}
                            event={evt}
                            onSelect={onEventSelect}
                          />
                        ))}
                      </div>
                    ) : (
                      cellEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="flex items-center gap-0 min-h-[52px]"
                        >
                          <div
                            className="relative -ml-3 w-6 shrink-0 self-stretch"
                            aria-hidden
                          >
                            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-caars-neutral-grey-4" />
                          </div>
                          <TimelineEventCard
                            event={evt}
                            onClick={() => onEventSelect(evt)}
                          />
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
