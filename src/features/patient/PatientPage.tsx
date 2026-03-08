import { useNavigate } from 'react-router';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PatientTable } from './PatientTable';
import { MOCK_RECENTLY_VIEWED, MOCK_SEARCH_RESULTS } from './patientData';
import type { Patient } from './types';

export default function PatientPage() {
  const navigate = useNavigate();

  const handleRowClick = (patient: Patient) => {
    navigate(`/patient/${patient.id}`);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-caars-neutral-white p-6">
      <div className="w-[80%] mx-auto flex flex-col flex-1 min-h-0 overflow-hidden">
        <Tabs defaultValue="recently-viewed" className="flex flex-col flex-1 min-h-0 overflow-hidden border rounded-lg gap-0">
          <div className="flex border-caars-neutral-grey-4 shrink-0">
            <TabsList variant="line" className="flex w-full h-12 rounded-none bg-transparent p-0 gap-0 border-0">
            <TabsTrigger
              value="recently-viewed"
              className="flex-1 rounded-none border-0 shadow-none h-8 py-3 font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold data-[state=active]:text-caars-primary-1 data-[state=inactive]:text-caars-neutral-grey-6 data-[state=active]:after:bg-caars-primary-1 data-[state=active]:after:border-2"
            >
              Recently viewed
            </TabsTrigger>
            <TabsTrigger
              value="search-results"
              className="flex-1 rounded-none border-0 shadow-none h-8 py-3 font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold data-[state=active]:text-caars-primary-1 data-[state=inactive]:text-caars-neutral-grey-6 data-[state=active]:after:bg-caars-primary-1 data-[state=active]:after:border-2"
            >
              Search Results
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <TabsContent value="recently-viewed" className="flex flex-col flex-1 min-h-0 m-0 data-[state=inactive]:hidden">
            <PatientTable data={MOCK_RECENTLY_VIEWED} onRowClick={handleRowClick} />
          </TabsContent>
          <TabsContent value="search-results" className="flex flex-col flex-1 min-h-0 m-0 data-[state=inactive]:hidden">
            <PatientTable data={MOCK_SEARCH_RESULTS} onRowClick={handleRowClick} />
          </TabsContent>
        </div>
        </Tabs>
      </div>
    </div>
  );
}
