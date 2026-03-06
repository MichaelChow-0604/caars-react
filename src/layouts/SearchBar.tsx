import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CInput } from '@/components/caars-ui/CInput';
import { IconSearch } from '@/lib/icon';
import { FAKE_SEARCH_RESULTS, type SearchResult } from '@/features/calendar/calendarData';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredResults = query.trim()
    ? FAKE_SEARCH_RESULTS.filter(
        (r) =>
          r.patientName.toLowerCase().includes(query.toLowerCase()) ||
          r.doctorName.toLowerCase().includes(query.toLowerCase()),
      )
    : FAKE_SEARCH_RESULTS;

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback((result: SearchResult) => {
    setQuery(`${result.patientName}, ${result.age}${result.gender}`);
    setIsOpen(false);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[720px]" onBlur={handleBlur}>
      <CInput
        placeholder="Patient / Appointment"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        prefix={<IconSearch className="size-4" />}
      />

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-lg border border-caars-neutral-grey-4 bg-white shadow-md">
          {filteredResults.length === 0 ? (
            <div className="px-4 py-3 text-sm text-caars-neutral-grey-6">No results found</div>
          ) : (
            <ul>
              {filteredResults.map((result) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
}

function SearchResultItem({ result, onSelect }: SearchResultItemProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors',
          'hover:bg-caars-neutral-grey-2 focus:bg-caars-neutral-grey-2 focus:outline-none',
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          onSelect(result);
        }}
      >
        <span className="font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold text-caars-neutral-black">
          {result.patientName}, {result.age}{result.gender}
        </span>
        <span className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-grey-6">
          {result.appointmentTime} · {result.doctorName}
        </span>
      </button>
    </li>
  );
}
