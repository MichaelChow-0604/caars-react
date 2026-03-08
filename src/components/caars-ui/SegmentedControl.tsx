import { cn } from '@/lib/utils';

interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export default function SegmentedControl({
  value,
  onChange,
  options,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-0 rounded-[12px] border border-caars-neutral-grey-4 bg-caars-neutral-white p-1',
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex h-10 flex-1 items-center justify-center rounded-[8px] px-4 font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold transition-colors duration-150',
              isActive
                ? 'bg-caars-primary-1 text-caars-neutral-white'
                : 'bg-transparent text-caars-neutral-grey-6 hover:text-caars-neutral-black',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
