import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { TimelineEvent, SeverityLevel } from './types';

const SEVERITY_BADGE_STYLES: Record<
  SeverityLevel,
  { bg: string; text: string; headerBg: string }
> = {
  emergency: {
    bg: 'bg-caars-error-1',
    text: 'text-caars-neutral-white',
    headerBg: 'bg-caars-error-2 border-caars-error-1',
  },
  routine: {
    bg: 'bg-caars-primary-3',
    text: 'text-caars-neutral-white',
    headerBg: 'bg-caars-primary-4 border-caars-primary-3',
  },
  normal: {
    bg: 'bg-caars-success-1',
    text: 'text-caars-neutral-white',
    headerBg: 'bg-caars-success-2 border-caars-success-1',
  },
};

const SEVERITY_LABEL: Record<SeverityLevel, string> = {
  emergency: 'EMERGENCY',
  routine: 'ROUTINE',
  normal: 'NORMAL',
};

export interface EventDetailSheetProps {
  event: TimelineEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailSheet({
  event,
  open,
  onOpenChange,
}: EventDetailSheetProps) {
  if (!event) return null;

  const styles = SEVERITY_BADGE_STYLES[event.severity];
  const dateStr = format(new Date(event.date), 'dd MMM yyyy \'at\' HH:mm');
  const hasRelatedConditions =
    event.relatedConditions && event.relatedConditions.length > 0;
  const hasClinicalDocument =
    event.clinicalDocument && event.clinicalDocument.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full max-w-[704px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[704px]"
      >
        <SheetHeader
          className={cn(
            'shrink-0 flex-col gap-2 border-b p-4',
            styles.headerBg,
          )}
        >
          <div className="flex w-full items-start justify-between gap-2">
            <span
              className={cn(
                'rounded-full px-2 py-1 font-caars-header text-caars-body-3 font-semibold leading-caars-body-3',
                styles.bg,
                styles.text,
              )}
            >
              {SEVERITY_LABEL[event.severity]}
            </span>
          </div>
          <SheetTitle className="font-caars-header text-caars-h3 font-semibold leading-caars-h3 text-caars-neutral-black">
            {event.title}
          </SheetTitle>
          <div className="flex items-center gap-2 font-caars-header text-caars-body-3 leading-caars-body-3 text-caars-neutral-grey-6">
            <span>{dateStr}</span>
            <span className="flex items-center gap-1">
              <FileText className="size-3.5" />
              document
            </span>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          {hasRelatedConditions && (
            <div className="flex flex-col gap-1">
              <h3 className="font-caars-header text-caars-h5 font-semibold leading-caars-h5 text-caars-neutral-black">
                Related Conditions
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {event.relatedConditions!.map((cond) => (
                  <span
                    key={cond}
                    className="rounded-full border border-caars-neutral-grey-5 bg-caars-neutral-grey-2 px-2 py-1 font-caars-header text-caars-body-3 font-semibold leading-caars-body-3 text-caars-neutral-grey-5"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hasClinicalDocument && (
            <div className="flex flex-col gap-2">
              <div className="rounded-lg bg-caars-warning-2 p-3">
                <h3 className="font-caars-header text-caars-h5 font-semibold leading-caars-h5 text-caars-warning-1">
                  Clinical Safety:
                </h3>
                <p className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-warning-1">
                  This is an AI-generated summary. Always review the full
                  clinical document below before making decisions.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-caars-header text-caars-h5 font-semibold leading-caars-h5 text-caars-neutral-black">
                  Full Clinical Document
                </h3>
                <div className="rounded-lg bg-caars-neutral-grey-3 p-3">
                  <pre className="whitespace-pre-wrap font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-black">
                    {event.clinicalDocument}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {!hasClinicalDocument && (
            <p className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
              No clinical document available for this event.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
