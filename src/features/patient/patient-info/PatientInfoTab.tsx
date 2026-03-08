import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PatientOverviewTab from './PatientOverviewTab';
import InvestigationResultsTab from './InvestigationResultsTab';
import { cn } from '@/lib/utils';

const SUB_TAB_TRIGGER_CLASS =
  'w-full justify-start pl-[33px] pr-4 py-4 min-h-[44px] rounded-none border-0 font-caars-header text-caars-body-1 leading-caars-body-1 data-[state=active]:bg-caars-primary-2 data-[state=active]:text-caars-primary-1 data-[state=active]:font-semibold data-[state=inactive]:bg-caars-neutral-white data-[state=inactive]:text-caars-neutral-black data-[state=inactive]:font-normal data-[state=active]:after:bg-caars-primary-1 data-[state=active]:after:left-0 data-[state=active]:after:right-auto data-[state=active]:after:inset-y-0 data-[state=active]:after:w-0.5 border-b border-caars-neutral-grey-4';

export default function PatientInfoTab() {
  return (
    <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden bg-caars-neutral-white">
      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        <Tabs
          defaultValue="patient-overview"
          orientation="vertical"
          className="flex flex-1 min-h-0 min-w-0 overflow-hidden"
        >
          <div className="shrink-0 w-[280px] border-r border-caars-neutral-grey-4 bg-caars-neutral-grey-2 overflow-hidden flex flex-col">
            <TabsList
              variant="line"
              className="flex flex-col h-auto w-full rounded-none border-0 bg-transparent p-0 gap-0"
            >
              <TabsTrigger value="patient-overview" className={SUB_TAB_TRIGGER_CLASS}>
                Patient Overview
              </TabsTrigger>
              <TabsTrigger value="investigations" className={SUB_TAB_TRIGGER_CLASS}>
                Investigations and Results
              </TabsTrigger>
              <TabsTrigger value="allergies" className={cn(SUB_TAB_TRIGGER_CLASS, 'opacity-60')} disabled>
                Allergies and Adverse Reactions
              </TabsTrigger>
              <TabsTrigger value="immunizations" className={cn(SUB_TAB_TRIGGER_CLASS, 'opacity-60')} disabled>
                Immunizations
              </TabsTrigger>
              <TabsTrigger value="diagnostics" className={cn(SUB_TAB_TRIGGER_CLASS, 'opacity-60')} disabled>
                Diagnostics and Procedures
              </TabsTrigger>
              <TabsTrigger value="lists" className={cn(SUB_TAB_TRIGGER_CLASS, 'opacity-60')} disabled>
                Lists and Notices
              </TabsTrigger>
              <TabsTrigger value="contacts" className={cn(SUB_TAB_TRIGGER_CLASS, 'opacity-60')} disabled>
                Contacts and Care Team
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-caars-neutral-grey-2">
            <TabsContent
              value="patient-overview"
              className="m-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
            >
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-8">
                <div className="flex justify-center">
                  <PatientOverviewTab />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="investigations"
              className="m-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
            >
              <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-8">
                <div className="flex justify-center">
                  <InvestigationResultsTab />
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="allergies"
              className="m-0 flex-1 min-h-0 min-w-0 flex justify-center items-center data-[state=inactive]:hidden"
            >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  Coming soon
                </span>
              </TabsContent>
            <TabsContent
              value="immunizations"
              className="m-0 flex-1 min-h-0 min-w-0 flex justify-center items-center data-[state=inactive]:hidden"
            >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  Coming soon
                </span>
              </TabsContent>
            <TabsContent
              value="diagnostics"
              className="m-0 flex-1 min-h-0 min-w-0 flex justify-center items-center data-[state=inactive]:hidden"
            >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  Coming soon
                </span>
              </TabsContent>
            <TabsContent
              value="lists"
              className="m-0 flex-1 min-h-0 min-w-0 flex justify-center items-center data-[state=inactive]:hidden"
            >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  Coming soon
                </span>
              </TabsContent>
            <TabsContent
              value="contacts"
              className="m-0 flex-1 min-h-0 min-w-0 flex justify-center items-center data-[state=inactive]:hidden"
            >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  Coming soon
                </span>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
