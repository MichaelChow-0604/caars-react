import * as React from 'react';
import { IconCheck } from '@/lib/icon';
import {
  Checkbox as CheckboxRoot,
  CheckboxIndicator as CheckboxIndicator,
} from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxRoot> {
  label?: string;
  line2?: string;
  bold?: boolean;
}

function Checkbox({
  className,
  label,
  line2,
  bold = true,
  ...props
}: CheckboxProps) {
  const id = React.useId();
  const showLabel = label !== undefined;
  const showLine2 = line2 !== undefined && line2.length > 0;

  const checkbox = (
    <CheckboxRoot
      id={showLabel ? id : undefined}
      data-slot="checkbox"
      className={cn(
        'peer size-[18px] shrink-0 rounded-[4px] border border-caars-neutral-black bg-caars-neutral-white shadow-xs transition-colors outline-none',
        'focus-visible:border-caars-primary-1 focus-visible:ring-[3px] focus-visible:ring-caars-primary-1/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-caars-error-1 aria-invalid:ring-caars-error-1/20',
        'data-[state=checked]:border-caars-primary-1 data-[state=checked]:bg-caars-primary-1 data-[state=checked]:text-caars-neutral-white',
        'dark:border-caars-neutral-white dark:bg-caars-neutral-black dark:data-[state=checked]:bg-caars-primary-1 dark:data-[state=checked]:border-caars-primary-1 dark:aria-invalid:ring-caars-error-1/40',
        className
      )}
      {...props}
    >
      <CheckboxIndicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <IconCheck className="size-3.5" />
      </CheckboxIndicator>
    </CheckboxRoot>
  );

  if (!showLabel && !showLine2) {
    return checkbox;
  }

  return (
    <div className="flex gap-2 items-start">
      <div className="pt-px">{checkbox}</div>
      <div className="flex flex-1 flex-col gap-0 min-w-0">
        {showLabel && (
          <label
            htmlFor={id}
            className={cn(
              'text-caars-neutral-black text-caars-body-2 leading-caars-body-2 cursor-pointer',
              bold ? 'font-semibold' : 'font-normal'
            )}
          >
            {label}
          </label>
        )}
        {showLine2 && (
          <span className="text-caars-neutral-grey-6 text-caars-body-2 leading-caars-body-2 tracking-caars-body-2">
            {line2}
          </span>
        )}
      </div>
    </div>
  );
}

export { Checkbox };
