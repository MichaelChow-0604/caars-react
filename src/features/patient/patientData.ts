import type { Patient } from './types';

export const MOCK_RECENTLY_VIEWED: Patient[] = [
  { id: '1', name: 'Betty Wong', gender: 'F', dob: '23/02/1995', nhsNumber: '948 383 202 1', lastAppointment: '23/02/2024, 11:30am' },
  { id: '2', name: 'Chessy Tank', gender: 'F', dob: '15/08/1997', nhsNumber: '123 456 789 0', lastAppointment: '22/02/2024, 9:00am' },
  { id: '3', name: 'Tammy Chen', gender: 'M', dob: '03/11/2009', nhsNumber: '234 567 890 1', lastAppointment: '21/02/2024, 9:10am' },
  { id: '4', name: 'Hello Man', gender: 'M', dob: '12/05/1999', nhsNumber: '345 678 901 2', lastAppointment: '20/02/2024, 10:00am' },
  { id: '5', name: 'Davyyy', gender: 'F', dob: '28/07/1998', nhsNumber: '456 789 012 3', lastAppointment: '19/02/2024, 9:30am' },
  { id: '6', name: 'Henry Nowhere', gender: 'F', dob: '14/01/2004', nhsNumber: '567 890 123 4', lastAppointment: '18/02/2024, 9:00am' },
  { id: '7', name: 'Chan Dai Man', gender: 'M', dob: '09/12/1946', nhsNumber: '678 901 234 5', lastAppointment: '17/02/2024, 10:30am' },
  { id: '8', name: 'Mike Chan', gender: 'F', dob: '22/06/1969', nhsNumber: '789 012 345 6', lastAppointment: '16/02/2024, 9:20am' },
  { id: '9', name: 'Dazy Frank', gender: 'F', dob: '05/09/2000', nhsNumber: '890 123 456 7', lastAppointment: '15/02/2024, 9:40am' },
  { id: '10', name: 'Scarlet Tam', gender: 'F', dob: '18/03/1980', nhsNumber: '901 234 567 8', lastAppointment: '14/02/2024, 11:10am' },
  { id: '11', name: 'Betty Wong', gender: 'F', dob: '23/02/1995', nhsNumber: '948 383 202 1', lastAppointment: '23/02/2024, 11:30am' },
  { id: '12', name: 'Chessy Tank', gender: 'F', dob: '15/08/1997', nhsNumber: '123 456 789 0', lastAppointment: '22/02/2024, 9:00am' },
  { id: '13', name: 'Tammy Chen', gender: 'M', dob: '03/11/2009', nhsNumber: '234 567 890 1', lastAppointment: '21/02/2024, 9:10am' },
  { id: '14', name: 'Hello Man', gender: 'M', dob: '12/05/1999', nhsNumber: '345 678 901 2', lastAppointment: '20/02/2024, 10:00am' },
  { id: '15', name: 'Davyyy', gender: 'F', dob: '28/07/1998', nhsNumber: '456 789 012 3', lastAppointment: '19/02/2024, 9:30am' },
  { id: '16', name: 'Henry Nowhere', gender: 'F', dob: '14/01/2004', nhsNumber: '567 890 123 4', lastAppointment: '18/02/2024, 9:00am' },
  { id: '17', name: 'Chan Dai Man', gender: 'M', dob: '09/12/1946', nhsNumber: '678 901 234 5', lastAppointment: '17/02/2024, 10:30am' },
  { id: '18', name: 'Mike Chan', gender: 'F', dob: '22/06/1969', nhsNumber: '789 012 345 6', lastAppointment: '16/02/2024, 9:20am' },
  { id: '19', name: 'Dazy Frank', gender: 'F', dob: '05/09/2000', nhsNumber: '890 123 456 7', lastAppointment: '15/02/2024, 9:40am' },
  { id: '20', name: 'Scarlet Tam', gender: 'F', dob: '18/03/1980', nhsNumber: '901 234 567 8', lastAppointment: '14/02/2024, 11:10am' },
];

export const MOCK_SEARCH_RESULTS: Patient[] = [
  { id: '11', name: 'Amy Chan', gender: 'F', dob: '30/04/1992', nhsNumber: '012 345 678 9', lastAppointment: '13/02/2024, 11:00am' },
  { id: '12', name: 'Elaine', gender: 'F', dob: '11/08/2000', nhsNumber: '111 222 333 4', lastAppointment: '12/02/2024, 11:10am' },
  { id: '13', name: 'Alan Shore', gender: 'M', dob: '07/02/1982', nhsNumber: '222 333 444 5', lastAppointment: '11/02/2024, 10:00am' },
  { id: '14', name: 'Priya Nair', gender: 'F', dob: '19/11/1995', nhsNumber: '333 444 555 6', lastAppointment: '10/02/2024, 11:30am' },
  { id: '15', name: 'Lara Moon', gender: 'F', dob: '25/06/1991', nhsNumber: '444 555 666 7', lastAppointment: '09/02/2024, 10:30am' },
  { id: '16', name: 'James Hill', gender: 'M', dob: '02/09/1964', nhsNumber: '555 666 777 8', lastAppointment: '08/02/2024, 11:00am' },
  { id: '17', name: 'Grace Lee', gender: 'F', dob: '13/10/1979', nhsNumber: '666 777 888 9', lastAppointment: '07/02/2024, 9:40am' },
  { id: '18', name: 'Tom Riddle', gender: 'M', dob: '31/12/1986', nhsNumber: '777 888 999 0', lastAppointment: '06/02/2024, 1:00pm' },
  { id: '19', name: 'Nina Walsh', gender: 'F', dob: '08/05/1972', nhsNumber: '888 999 000 1', lastAppointment: '05/02/2024, 9:00am' },
  { id: '20', name: 'Oscar Tang', gender: 'M', dob: '16/07/1993', nhsNumber: '999 000 111 2', lastAppointment: '04/02/2024, 11:20am' },
];
