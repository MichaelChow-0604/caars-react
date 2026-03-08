import type { Patient } from './types';
import { IconInfo } from '@/lib/icon';
import { cn } from '@/lib/utils';

function getAgeFromDob(dob: string): number | null {
  const parts = dob.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

function getGenderLabel(gender: 'M' | 'F'): string {
  return gender === 'M' ? 'Male' : 'Female';
}

export interface PatientPreviewProps {
  patient: Patient;

  className?: string;
}

export default function PatientPreview({ patient, className }: PatientPreviewProps) {
  const age = getAgeFromDob(patient.dob);
  const ageStr = age !== null ? ` (${age}y)` : '';

  const infoParts: string[] = [
    getGenderLabel(patient.gender),
    patient.nhsNumber,
    `${patient.dob}${ageStr}`,
  ];
  if (patient.address) infoParts.push(patient.address);
  const infoLine = infoParts.join(' | ');

  const hasAllergies = patient.allergies && patient.allergies.length > 0;
  const allergyText = hasAllergies ? patient.allergies!.join(', ') : '';

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-caars-neutral-grey-4 bg-caars-neutral-grey-3 px-5 py-4',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-caars-header text-caars-h3 leading-caars-h3 font-semibold text-caars-neutral-black shrink-0">
          {patient.name}
        </h2>
        {patient.incomingAppointment && (
          <span className="shrink-0 rounded-md border border-caars-success-1 bg-caars-success-2 px-3 py-1.5 font-caars-header text-caars-body-2 leading-caars-body-2 font-semibold text-caars-success-1">
            Incoming Appointment : {patient.incomingAppointment}
          </span>
        )}
      </div>
      <p className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-neutral-black whitespace-pre-wrap">
        {infoLine}
      </p>
      {hasAllergies && (
        <div className="flex items-center gap-1">
          <IconInfo className="size-[18px] shrink-0 text-caars-error-1" />
          <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-normal text-caars-error-1">
            Known allergies:
          </span>
          <span className="font-caars-header text-caars-body-1 leading-caars-body-1 font-semibold text-caars-error-1">
            {allergyText}
          </span>
        </div>
      )}
    </div>
  );
}
