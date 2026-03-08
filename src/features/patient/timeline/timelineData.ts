import type { TimelineEvent, DiagnosisCategory } from './types';

export const DIAGNOSIS_CATEGORIES: DiagnosisCategory[] = [
  { id: 'gp', label: 'General Practice' },
  { id: 'pathology', label: 'Pathology' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'cardiovascular', label: 'Cardiovascular' },
  { id: 'cat-a', label: 'Category A' },
  { id: 'cat-b', label: 'Category B' },
  { id: 'cat-c', label: 'Category C' },
  { id: 'cat-d', label: 'Category D' },
  { id: 'cat-e', label: 'Category E' },
];

const GP_MEDICATION_REVIEW_DOC = `GP CONSULTATION NOTE - MEDICATION REVIEW

Patient: Betty Wong (NHS: 948 383 202 1)
Date: 03/05/2025 15:45
Clinician: Dr. Anna Patel, GP

CONSULTATION TYPE: Annual Medication Review

CURRENT MEDICATIONS:
1. Metformin 500mg BD (Type 2 Diabetes)
2. Seretide 250 Accuhaler BD (COPD)
3. Spiriva 18mcg OD (COPD)
4. Salbutamol 100mcg inhaler PRN (COPD)

REVIEW:
Patient reports good compliance with all medications. Understands purpose of each drug. No adverse effects reported.

INHALER TECHNIQUE:
Demonstrated use of Accuhaler and HandiHaler devices - technique appropriate. Peak flow 240 L/min (personal best 280).

MEDICATION CHANGES:
None required. All medications continued at current doses.

PATIENT EDUCATION:
- Importance of regular use of preventative inhalers stressed
- Salbutamol use approximately 3-4 times per week (acceptable)
- Advised to seek medical attention if increased reliever use
- Discussed smoking cessation support (patient abstinent since 2018)

PRESCRIPTIONS ISSUED:
All medications issued as repeat prescriptions (56 days)

FOLLOW-UP:
GP review in 6 months or sooner if concerns

Dr. Anna Patel, GP Partner`;

const A_E_ATTENDANCE_DOC = `A&E ATTENDANCE NOTE

Patient: Betty Wong (NHS: 948 383 202 1)
Date: 15/08/2025 22:30
Clinician: Dr. James Chen, A&E Registrar

PRESENTING COMPLAINT:
Chest tightness and shortness of breath for 2 hours

HISTORY:
Known COPD and Type 2 Diabetes. Uses Seretide and Spiriva regularly. Increased Salbutamol use today (6 puffs). No recent infections or travel.

EXAMINATION:
Alert, comfortable at rest. SpO2 94% on room air. Mild wheeze bilaterally. Heart sounds normal. No peripheral oedema.

INVESTIGATIONS:
ECG: Sinus rhythm, no acute changes
CXR: No focal consolidation, heart size normal
Bloods: WCC 8.2, CRP 12, Troponin negative

ASSESSMENT:
COPD exacerbation - mild. No evidence of infection or cardiac event.

TREATMENT:
Nebulised Salbutamol 5mg x2 - good response. SpO2 improved to 97%.

DISCHARGE:
Discharged with advice to continue regular inhalers. Prednisolone 30mg OD for 5 days. GP follow-up within 48 hours.

Dr. James Chen, A&E Registrar`;

const RESPIRATORY_CLINIC_DOC = `RESPIRATORY CLINIC NOTE

Patient: Betty Wong (NHS: 948 383 202 1)
Date: 12/11/2025 10:00
Clinician: Dr. Sarah Lee, Respiratory Consultant

REASON FOR REFERRAL:
Annual COPD review - stable on current regime

SPIROMETRY:
FEV1: 1.42L (58% predicted) - unchanged from last year
FVC: 2.18L
FEV1/FVC: 0.65

ASSESSMENT:
COPD GOLD Stage 2 - stable. Good inhaler technique. No exacerbations in past 12 months.

RECOMMENDATIONS:
- Continue current inhaler regime
- Annual flu vaccination (administered today)
- Consider pneumococcal booster if not had in 5 years
- Repeat spirometry in 12 months

Dr. Sarah Lee, Respiratory Consultant`;

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    title: 'GP Medication Review',
    date: '2025-05-03T15:45:00',
    severity: 'routine',
    categoryId: 'gp',
    relatedConditions: ['Type 2 Diabetes', 'COPD'],
    clinicalDocument: GP_MEDICATION_REVIEW_DOC,
  },
  {
    id: 'evt-2',
    title: 'GP Medication Review',
    date: '2025-05-10T09:30:00',
    severity: 'normal',
    categoryId: 'gp',
    relatedConditions: ['Type 2 Diabetes'],
  },
  {
    id: 'evt-3',
    title: 'GP Medication Review',
    date: '2025-05-18T14:00:00',
    severity: 'routine',
    categoryId: 'gp',
  },
  {
    id: 'evt-4',
    title: 'GP Medication Review',
    date: '2025-05-25T11:15:00',
    severity: 'normal',
    categoryId: 'gp',
    relatedConditions: ['COPD'],
  },
  {
    id: 'evt-5',
    title: 'HbA1c Test - Well controlled',
    date: '2025-07-12T08:00:00',
    severity: 'normal',
    categoryId: 'pathology',
    relatedConditions: ['Type 2 Diabetes'],
  },
  {
    id: 'evt-6',
    title: 'A&E Attendance - Acute exacerbation',
    date: '2025-08-15T22:30:00',
    severity: 'emergency',
    categoryId: 'emergency',
    relatedConditions: ['COPD'],
    clinicalDocument: A_E_ATTENDANCE_DOC,
  },
  {
    id: 'evt-7',
    title: 'Respiratory Clinic - Annual review',
    date: '2025-11-12T10:00:00',
    severity: 'routine',
    categoryId: 'respiratory',
    relatedConditions: ['COPD'],
    clinicalDocument: RESPIRATORY_CLINIC_DOC,
  },
  {
    id: 'evt-8',
    title: 'Blood Test - FBC Normal',
    date: '2026-01-08T09:00:00',
    severity: 'normal',
    categoryId: 'pathology',
  },
  {
    id: 'evt-9',
    title: 'ECG - Routine screening',
    date: '2026-01-15T14:30:00',
    severity: 'normal',
    categoryId: 'cardiovascular',
    relatedConditions: ['Type 2 Diabetes'],
  },
  {
    id: 'evt-10',
    title: 'GP Follow-up - Post A&E',
    date: '2026-01-20T10:45:00',
    severity: 'routine',
    categoryId: 'gp',
    relatedConditions: ['COPD'],
  },
  { id: 'evt-11', title: 'Review A', date: '2025-06-01T09:00:00', severity: 'normal', categoryId: 'cat-a' },
  { id: 'evt-12', title: 'Review B', date: '2025-06-15T10:00:00', severity: 'routine', categoryId: 'cat-b' },
  { id: 'evt-13', title: 'Review C', date: '2025-09-01T11:00:00', severity: 'normal', categoryId: 'cat-c' },
  { id: 'evt-14', title: 'Review D', date: '2025-10-10T14:00:00', severity: 'routine', categoryId: 'cat-d' },
  { id: 'evt-15', title: 'Review E', date: '2025-12-01T09:30:00', severity: 'normal', categoryId: 'cat-e' },
  { id: 'evt-16', title: 'Follow-up A', date: '2026-02-01T09:00:00', severity: 'normal', categoryId: 'cat-a' },
  { id: 'evt-17', title: 'Follow-up B', date: '2026-02-15T10:00:00', severity: 'routine', categoryId: 'cat-b' },
  { id: 'evt-18', title: 'Follow-up C', date: '2026-03-01T11:00:00', severity: 'normal', categoryId: 'cat-c' },
];

export function getTimelineEventsForPatient(patientId: string): TimelineEvent[] {
  if (patientId === '1') {
    return MOCK_TIMELINE_EVENTS;
  }
  return [];
}

export function getDiagnosisCategoriesForPatient(patientId: string): DiagnosisCategory[] {
  if (patientId === '1') {
    return DIAGNOSIS_CATEGORIES;
  }
  return [];
}
