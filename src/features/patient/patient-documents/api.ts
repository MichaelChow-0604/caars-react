import type { PatientDocument } from './types';

const MOCK_DOCUMENTS: PatientDocument[] = [
  {
    id: '1',
    title: 'ENT Clinic Letter',
    status: 'Available',
    type: 'Clinic letter',
    previousSummaries: 'Clinic letter',
    date: '2026 - 01 - 20',
  },
  {
    id: '2',
    title: 'Full Blood Count',
    status: 'Available',
    type: 'Clinic letter',
    previousSummaries: 'Lab result',
    date: '2026 - 01 - 10',
  },
  {
    id: '3',
    title: 'X-Ray Report',
    status: 'Pending',
    type: 'Imaging',
    previousSummaries: 'Imaging report',
    date: '2026 - 01 - 05',
  },
];

export async function fetchPatientDocuments(_patientId: string): Promise<PatientDocument[]> {
  await new Promise((r) => setTimeout(r, 100));
  return [...MOCK_DOCUMENTS];
}
