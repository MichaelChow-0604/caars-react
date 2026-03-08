import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { IconDoctor, IconMedication } from '@/lib/icon';

const PATIENT_OVERVIEW_PLACEHOLDER = {
  patientName: 'Betty Wong',
  details: [
    { label: 'Sex', value: 'Female' },
    { label: 'Age', value: '23/04/1998 (27y)' },
    { label: 'NHS number', value: '948 383 202 1' },
    { label: 'Preferred language', value: 'English' },
    { label: 'Address', value: '68 Kendell Street Sheffield S1 9BN' },
    { label: 'Registered since', value: '2010/03/12' },
  ],
  alerts: ['Allergic to seafood'],
  problems: ['Asthma', 'Allergic rhinitis', 'Rheumatic diseases'],
  medications: [
    { name: 'Gliclazide 80mg tablets', dose: 'As directed', lastIssue: '27/11/2025' },
    { name: 'Atorvastatin 20mg tablets', dose: '1 tablet a day', lastIssue: '29/11/2025' },
    { name: 'Metformin 2G Modified-Release tablets', dose: '2 tablets a day', lastIssue: '17/11/2025' },
    { name: 'Sertraline 100mg tablets', dose: '1 tablet once a day', lastIssue: '17/11/2025' },
  ],
};

export default function PatientOverviewTab() {
  const { patientName, details, alerts, problems, medications } = PATIENT_OVERVIEW_PLACEHOLDER;

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl">
      <div className="flex gap-5 items-start">
        <Card className="flex-1 border-caars-neutral-grey-3 bg-caars-primary-2">
          <CardHeader className="px-5">
            <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
              {patientName}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1.5 px-5">
            {details.map(({ label, value }) => (
              <div key={label} className="flex gap-2 items-start justify-between">
                <span className="min-w-[100px] w-[150px] shrink-0 font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-grey-6">
                  {label}
                </span>
                <span className="flex-1 text-right font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
                  {value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="flex-1 bg-caars-error-2 self-stretch">
          <CardHeader className="px-5">
            <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
              Alert & warnings
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 px-5">
            {alerts.map((alert) => (
              <span
                key={alert}
                className="inline-flex items-center justify-center rounded-md border border-caars-error-1 bg-caars-error-2 px-3 py-1.5 font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold text-caars-error-1"
              >
                {alert}
              </span>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-8 items-stretch">
        <Card className="flex flex-1 min-h-[400px] flex-col overflow-hidden border-caars-neutral-grey-4 bg-caars-neutral-grey-2">
          <CardHeader className="flex shrink-0 flex-row items-center gap-2 border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-5">
            <IconDoctor className="size-6 shrink-0 text-caars-neutral-black" />
            <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
              Problems and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <ul className="list-disc pl-6 font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black">
              {problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="flex flex-1 min-h-[400px] flex-col overflow-hidden border-caars-neutral-grey-4 bg-caars-neutral-grey-2">
          <CardHeader className="flex shrink-0 flex-row items-center gap-2 border-b border-caars-neutral-grey-4 bg-caars-neutral-white px-5">
            <IconMedication className="size-6 shrink-0 text-caars-neutral-black" />
            <CardTitle className="font-caars-header text-caars-h5 leading-caars-h5 font-semibold text-caars-neutral-black">
              Medications
            </CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
            {medications.map((med) => (
              <div
                key={med.name}
                className="flex shrink-0 flex-col gap-3 rounded-xl border border-caars-neutral-grey-4 bg-caars-neutral-white p-4"
              >
                <span className="font-caars-header text-caars-body-1 leading-caars-body-1 text-caars-neutral-black break-words">
                  {med.name}
                </span>
                <div className="font-caars-header text-caars-body-2 leading-caars-body-2 text-caars-neutral-grey-6">
                  <p>Dose: {med.dose}</p>
                  <p>Last issue: {med.lastIssue}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
