import { MOCK_RECENTLY_VIEWED, MOCK_SEARCH_RESULTS } from './patientData';
import type { Patient } from './types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PatientPreview from './PatientPreview';
import { ClinicalPreviewTab, CommentFooter } from './clinical-preview';
import { TimelineTab } from './timeline';
import { PatientInfoTab } from './patient-info';
import { PreviousEncountersTab } from './previous-encounters';
import { PatientDocumentsTab } from './patient-documents';

function getPatientById(patientId: string): Patient | null {
  const all = [...MOCK_RECENTLY_VIEWED, ...MOCK_SEARCH_RESULTS];
  return all.find((p) => p.id === patientId) ?? null;
}

const TAB_TRIGGER_CLASS =
  'flex-1 rounded-none border-0 shadow-none h-8 py-3 font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold data-[state=active]:text-caars-primary-1 data-[state=inactive]:text-caars-neutral-grey-6 data-[state=active]:after:bg-caars-primary-1 data-[state=active]:after:border-2';

export interface PatientHomePageProps {
  patientId?: string;
}

export default function PatientHomePage({ patientId }: PatientHomePageProps) {
  const patient = patientId ? getPatientById(patientId) : null;

  if (!patientId) {
    return (
      <div className="flex flex-1 min-w-0 min-h-0 items-center justify-center bg-caars-neutral-white">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7">
          Select a patient
        </span>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex flex-1 min-w-0 min-h-0 items-center justify-center bg-caars-neutral-white">
        <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-7">
          Unknown Patient
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden bg-caars-neutral-white">
      <div className="shrink-0 bg-caars-neutral-grey-2 px-8 py-3">
        <PatientPreview patient={patient} />
      </div>

      <Tabs
        defaultValue="clinical-preview"
        className="flex flex-1 min-h-0 min-w-0 flex-col gap-0 overflow-hidden"
      >
        <div className="shrink-0 border-b-2 border-caars-neutral-grey-4 bg-caars-neutral-grey-2">
          <TabsList variant="line" className="flex h-auto w-full rounded-none border-0 bg-transparent p-0 gap-8">
            <TabsTrigger value="clinical-preview" className={TAB_TRIGGER_CLASS}>
              Clinical preview
            </TabsTrigger>
            <TabsTrigger value="timeline" className={TAB_TRIGGER_CLASS}>
              Timeline
            </TabsTrigger>
            <TabsTrigger value="patient-info" className={TAB_TRIGGER_CLASS}>
              Patient Info
            </TabsTrigger>
            <TabsTrigger value="previous-encounters" className={TAB_TRIGGER_CLASS}>
              Previous Encounters
            </TabsTrigger>
            <TabsTrigger value="patient-documents" className={TAB_TRIGGER_CLASS}>
              Patient Documents
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden">
          <TabsContent
            value="clinical-preview"
            className="m-0 flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 py-6">
              <ClinicalPreviewTab />
            </div>
            <CommentFooter className="shrink-0 border-t border-caars-neutral-grey-4" />
          </TabsContent>
          <TabsContent
            value="timeline"
            className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <TimelineTab patientId={patientId} />
          </TabsContent>
          <TabsContent
            value="patient-info"
            className="m-0 flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <PatientInfoTab />
          </TabsContent>
          <TabsContent
            value="previous-encounters"
            className="m-0 flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <PreviousEncountersTab />
          </TabsContent>
          <TabsContent
            value="patient-documents"
            className="m-0 flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden data-[state=inactive]:hidden"
          >
            <PatientDocumentsTab patientId={patientId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
