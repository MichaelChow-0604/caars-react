import type { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MasterMenuItemProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  hint?: number;
  onClick?: () => void;
  className?: string;
}

const MasterMenuItem: FC<MasterMenuItemProps> = ({
  label,
  icon,
  active = false,
  disabled = false,
  hint,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-active={active}
      className={cn('group flex w-[200px] items-center gap-2 pr-4 rounded-[12px]', className)}
    >
      {/* Left accent bar */}
      <span
        aria-hidden
        className={cn(
          'h-[52px] w-1 shrink-0 rounded-tr-[4px] rounded-br-[4px] transition-colors',
          disabled
            ? 'bg-caars-neutral-grey-3'
            : active
              ? 'bg-caars-primary-3'
              : 'bg-caars-neutral-white group-hover:bg-caars-primary-3',
        )}
      />

      {/* Content area */}
      <div
        className={cn(
          'relative flex min-w-0 flex-1 items-center gap-2 rounded-[12px] p-4 transition-colors',
          disabled
            ? 'bg-caars-neutral-grey-3'
            : active
              ? 'bg-caars-primary-4'
              : 'bg-caars-neutral-white group-hover:bg-caars-primary-3',
        )}
      >
        {/* Icon */}
        {icon && (
          <span
            className={cn(
              'shrink-0 size-6 transition-colors',
              disabled
                ? 'text-caars-neutral-grey-6'
                : active
                  ? 'text-caars-primary-3'
                  : 'text-caars-neutral-black group-hover:text-caars-neutral-white',
            )}
          >
            {icon}
          </span>
        )}

        {/* Label */}
        <span
          className={cn(
            'font-caars-header text-caars-body-1 leading-caars-body-1 min-w-0 flex-1 truncate text-left font-semibold transition-colors',
            disabled
              ? 'text-caars-neutral-grey-6'
              : active
                ? 'text-caars-primary-3'
                : 'text-caars-neutral-black group-hover:text-caars-neutral-white',
          )}
        >
          {label}
        </span>

        {/* Hint badge */}
        {hint !== undefined && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 flex size-4 items-center justify-center rounded-full bg-[#edf3fc]">
            <span className="text-[10px] font-semibold leading-none text-[#2f80ed]">
              {hint}
            </span>
          </span>
        )}
      </div>
    </button>
  );
};

export default MasterMenuItem;
