import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@/lib/icon';
import CButton from '@/components/caars-ui/CButton';
import { Input } from '@/components/ui/input';
import PreviousSummariesSection from './PreviousSummariesSection';
import { cn } from '@/lib/utils';

const LOREM_MEDICAL =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LOREM_CLINICAL =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.';

const LOREM_ALLERGIES =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

interface CollapsibleSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({ title, defaultExpanded = true, children }: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-2.5"
      >
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-grey-7">
          {title}
        </span>
        {expanded ? (
          <IconChevronUp className="size-6 shrink-0 text-caars-neutral-grey-7" />
        ) : (
          <IconChevronDown className="size-6 shrink-0 text-caars-neutral-grey-7" />
        )}
      </button>
      {expanded && (
        <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-7">
          {children}
        </p>
      )}
    </div>
  );
}

export default function ClinicalPreviewTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-xl">
        <CollapsibleSection title="Medical History">{LOREM_MEDICAL}</CollapsibleSection>
        <CollapsibleSection title="Relevant Clinical Events">{LOREM_CLINICAL}</CollapsibleSection>
        <CollapsibleSection title="Allergies">{LOREM_ALLERGIES}</CollapsibleSection>
      </div>

      <div
        className={cn(
          'flex flex-col gap-1.5 rounded-bl-[20px] rounded-tl-[20px] bg-caars-primary-2 p-5',
        )}
      >
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Input triage details to search for relevance"
            className="h-[52px] flex-1 min-w-0 rounded-lg border border-caars-neutral-grey-4 bg-caars-neutral-white px-4 font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7 placeholder:text-caars-neutral-grey-6"
          />
          <CButton variant="solid" size="md" className="shrink-0">
            Find Relevance
          </CButton>
        </div>
        <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-black">
          It will take a minute or two. We&apos;ll let you know once it&apos;s done. You can leave
          this page safely.
        </p>
      </div>

      <PreviousSummariesSection />
    </div>
  );
}
