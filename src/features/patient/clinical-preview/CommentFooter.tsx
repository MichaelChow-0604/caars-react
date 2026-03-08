import { format } from 'date-fns';
import CButton from '@/components/caars-ui/CButton';
import { IconCommentDots, IconEdit } from '@/lib/icon';
import { cn } from '@/lib/utils';

export interface CommentFooterProps {
  lastUpdate?: Date;
  className?: string;
}

export default function CommentFooter({ lastUpdate = new Date(), className }: CommentFooterProps) {
  return (
    <div
      className={cn(
        'flex h-[86px] shrink-0 items-center gap-4 bg-caars-neutral-white px-8 py-5',
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="font-caars-header text-caars-body-2 leading-caars-body-2 font-normal text-caars-neutral-black">
          Last update: {format(lastUpdate, 'dd/MM/yyyy')}
        </p>
        <p className="font-caars-header text-caars-body-3 leading-caars-body-3 font-normal text-caars-neutral-grey-5">
          Powered by CAARS AI. Clinician should cross-check for accuracy.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <CButton variant="outline-black" size="md" prefix={<IconCommentDots className="size-5" />}>
          Comment History
        </CButton>
        <CButton variant="outline-color" size="md" prefix={<IconEdit className="size-5" />}>
          Write a Comment
        </CButton>
      </div>
    </div>
  );
}
