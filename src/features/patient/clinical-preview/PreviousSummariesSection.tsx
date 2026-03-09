import { useState } from "react";
import { IconChevronDown } from "@/lib/icon";
import CButton from "@/components/caars-ui/CButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface PreviousSummary {
  id: string;
  date: string;
  medicalHistory: string;
  clinicalEvents: string;
  allergies: string;
}

const MOCK_SUMMARIES: PreviousSummary[] = [
  {
    id: "s1",
    date: "2026/03/07",
    medicalHistory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    clinicalEvents:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    allergies:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "s2",
    date: "2026/03/05",
    medicalHistory:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    clinicalEvents:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    allergies:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "s3",
    date: "2026/03/02",
    medicalHistory:
      "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    clinicalEvents:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    allergies:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "s4",
    date: "2026/02/28",
    medicalHistory:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    clinicalEvents:
      "Nemo quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    allergies:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "s5",
    date: "2026/02/25",
    medicalHistory:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    clinicalEvents:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    allergies: "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
  },
  {
    id: "s6",
    date: "2026/02/22",
    medicalHistory:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    clinicalEvents:
      "Quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    allergies:
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    id: "s7",
    date: "2026/02/18",
    medicalHistory:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.",
    clinicalEvents:
      "Optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    allergies: "Omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    id: "s8",
    date: "2026/02/15",
    medicalHistory:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.",
    clinicalEvents:
      "Molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    allergies:
      "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
];

const PAGE_SIZE = 5;

export default function PreviousSummariesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);

  const visibleSummaries = MOCK_SUMMARIES.slice(0, displayedCount);
  const hasMore = displayedCount < MOCK_SUMMARIES.length;
  const defaultExpanded = MOCK_SUMMARIES[0]?.id ?? "";

  const handleLoadMore = () => {
    setDisplayedCount((c) => Math.min(c + PAGE_SIZE, MOCK_SUMMARIES.length));
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-1 self-start rounded-lg py-2 pr-1"
      >
        <IconChevronDown className="size-4 shrink-0 text-caars-neutral-grey-6" />
        <span className="font-caars-header text-[15px] leading-[1.4] font-semibold tracking-[0.3px] text-caars-neutral-grey-6">
          Show previous summaries
        </span>
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between bg-caars-neutral-grey-4 px-8 py-4 border-b border-caars-neutral-grey-4">
        <span className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
          Previous Summaries
        </span>
        <CButton
          variant="text-black"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          Hide
        </CButton>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[defaultExpanded]}
        className="w-full"
      >
        {visibleSummaries.map((summary) => (
          <AccordionItem
            key={summary.id}
            value={summary.id}
            className="border-b border-caars-neutral-grey-4 last:border-b-0"
          >
            <AccordionTrigger
              className={cn(
                "rounded-none px-8 py-4 hover:no-underline",
                "bg-caars-neutral-grey-3 hover:bg-caars-neutral-grey-2",
                "font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black",
                "[&>svg]:size-6 [&>svg]:text-caars-neutral-grey-7"
              )}
            >
              {summary.date}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                "rounded-none px-8 pt-6 pb-8",
                "bg-caars-neutral-white"
              )}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2.5">
                  <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-grey-7">
                    Medical History
                  </span>
                  <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-7">
                    {summary.medicalHistory}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-grey-7">
                    Relevant Clinical Events
                  </span>
                  <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-7">
                    {summary.clinicalEvents}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-neutral-grey-7">
                    Allergies
                  </span>
                  <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-grey-7">
                    {summary.allergies}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {hasMore && (
        <div className="flex justify-start border-t border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-8 py-4">
          <CButton variant="text-color" size="sm" onClick={handleLoadMore}>
            Load more
          </CButton>
        </div>
      )}
    </div>
  );
}
