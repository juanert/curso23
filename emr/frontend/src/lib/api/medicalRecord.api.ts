import { apiFetch } from './httpClient';

export interface MedicalRecord {
  _id: string;
  patient: string | { _id: string; firstName: string; lastName: string };
  doctor: string;
  visitDate: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface CreateMedicalRecordPayload {
  patientId: string;
  appointmentId?: string;
  visitDate?: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export function listRecordsForPatient(patientId: string): Promise<MedicalRecord[]> {
  return apiFetch<MedicalRecord[]>(`/patients/${patientId}/records`);
}

export function createRecord(payload: CreateMedicalRecordPayload): Promise<MedicalRecord> {
  return apiFetch<MedicalRecord>(`/patients/${payload.patientId}/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function getRecord(id: string): Promise<MedicalRecord> {
  return apiFetch<MedicalRecord>(`/records/${id}`);
}
