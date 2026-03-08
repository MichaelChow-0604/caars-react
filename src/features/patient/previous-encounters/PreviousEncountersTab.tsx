import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDownIcon } from 'lucide-react';
import { MOCK_PREVIOUS_ENCOUNTERS } from './mockData';
import type { PreviousEncounter } from './types';

const INITIAL_DISPLAY_COUNT = 5;

function EncounterContent({ encounter }: { encounter: PreviousEncounter }) {
  return (
    <div className="flex flex-col">
      {encounter.sections.map(({ label, content }) => (
        <div
          key={label}
          className="flex gap-2 border-b border-caars-neutral-grey-3 px-4 py-3 last:border-b-0"
        >
          <div className="w-[180px] shrink-0 font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
            {label}
          </div>
          <div className="min-w-0 flex-1 font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black whitespace-pre-wrap">
            {content || '\u00A0'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PreviousEncountersTab() {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [expandedIds, setExpandedIds] = useState<string[]>(() =>
    MOCK_PREVIOUS_ENCOUNTERS.slice(0, INITIAL_DISPLAY_COUNT).map((e) => e.id)
  );
  const encounters = MOCK_PREVIOUS_ENCOUNTERS;
  const visibleEncounters = encounters.slice(0, displayCount);
  const hasMore = displayCount < encounters.length;

  const handleLoadMore = () => {
    const nextCount = Math.min(displayCount + 2, encounters.length);
    const newEncounters = encounters.slice(displayCount, nextCount);
    setDisplayCount(nextCount);
    setExpandedIds((prev) => [...prev, ...newEncounters.map((e) => e.id)]);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-caars-neutral-white">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <Accordion
          type="multiple"
          className="w-full"
          value={expandedIds}
          onValueChange={setExpandedIds}
        >
          {visibleEncounters.map((encounter) => (
            <AccordionItem
              key={encounter.id}
              value={encounter.id}
              className="border-b-0"
            >
              <AccordionTrigger
                className="w-full flex-1 rounded-none border-b border-caars-neutral-grey-4 bg-caars-neutral-grey-3 px-8 py-2 hover:no-underline [&[data-state=open]>svg]:rotate-180"
              >
                <span className="flex-1 text-center font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
                  {encounter.date}
                </span>
              </AccordionTrigger>
              <AccordionContent className="border-b border-caars-neutral-grey-3 bg-caars-neutral-white pb-0">
                <div className="px-6 pt-0">
                  <EncounterContent encounter={encounter} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {hasMore && (
        <div className="flex shrink-0 justify-center border-t border-caars-neutral-grey-4 bg-caars-neutral-white py-8">
          <button
            type="button"
            onClick={handleLoadMore}
            className="flex items-center gap-1 rounded-lg px-1 py-2 font-caars-header text-caars-button-1 leading-caars-button-1 font-semibold tracking-caars-button-1 text-caars-neutral-grey-6 transition-colors hover:text-caars-neutral-black"
          >
            <ChevronDownIcon className="size-4" aria-hidden />
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
