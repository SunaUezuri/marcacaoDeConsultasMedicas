import { Patient } from '../../../types/appointments';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana Souza',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Carlos Pereira',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Marina Lima',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export const getPatientInfo = (patientId: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === patientId);
};