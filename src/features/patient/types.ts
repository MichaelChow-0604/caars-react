export interface Patient {
  id: string;
  name: string;
  gender: 'M' | 'F';
  dob: string;
  nhsNumber: string;
  lastAppointment: string;
}
