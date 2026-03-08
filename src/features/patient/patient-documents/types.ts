export type PatientDocumentStatus = 'Available' | 'Pending' | 'Unavailable';

export interface PatientDocument {
  id: string;
  title: string;
  status: PatientDocumentStatus;
  type: string;
  previousSummaries: string;
  date: string;
}
