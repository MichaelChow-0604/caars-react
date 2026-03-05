import type { FC } from 'react';
import { cn } from '@/lib/utils';

type AppointmentState = 'active' | 'cancelled' | 'expired';

interface AppointmentPreviewProps {
  className?: string;
  line1?: string;
  line2?: string;
  state?: AppointmentState;
}

const AppointmentPreview: FC<AppointmentPreviewProps> = ({
  className,
  line1 = 'Betty Wong, 35F',
  line2 = '11:30am',
  state = 'active',
}) => {
  if (state === 'expired') {
    return (
      <div
        className={cn(
          'flex w-[283px] flex-col items-start justify-center gap-0.5 rounded-[12px] bg-caars-neutral-grey-4 px-4 py-3',
          'text-caars-neutral-grey-6',
          className,
        )}
        data-state="expired"
      >
        <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold">
          {line1}
        </p>
        <p className="font-caars-header text-caars-body-2 leading-caars-body-2">
          {line2}
        </p>
      </div>
    );
  }

  if (state === 'cancelled') {
    return (
      <div
        className={cn(
          'relative flex w-[283px] flex-col items-start justify-center gap-0.5 rounded-[12px] bg-caars-error-2 px-4 py-3',
          className,
        )}
        data-state="cancelled"
      >
        <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-error-1">
          {line1}
        </p>
        <p className="font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-grey-6">
          {line2}
        </p>

        <div className="absolute right-3 top-3 inline-flex items-center rounded-[6px] border border-caars-error-1 bg-caars-error-2 px-2 py-1">
          <span className="font-caars-header text-[12px] font-semibold leading-[1.4] text-caars-error-1">
            Cancelled
          </span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        'flex w-[283px] cursor-pointer flex-col items-start justify-center gap-0.5 rounded-[12px] bg-caars-success-2 px-4 py-3 text-left',
        className,
      )}
      data-state="active"
    >
      <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-success-1">
        {line1}
      </p>
      <p className="font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-grey-6">
        {line2}
      </p>
    </button>
  );
};

export default AppointmentPreview;

