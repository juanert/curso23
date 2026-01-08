import { apiFetch } from './httpClient';

export interface MedicationItem {
  name: string;
  dosage: string;
  route?: string;
  frequency: string;
  duration?: string;
  instructions?: string;
}

export interface Prescription {
  _id: string;
  medicalRecord: string;
  patient: string;
  doctor: string;
  prescribedAt: string;
  medications: MedicationItem[];
  notes?: string;
  pdfUrl?: string;
}

export interface CreatePrescriptionPayload {
  recordId: string;
  patientId: string;
  medications: MedicationItem[];
  notes?: string;
}

export function listPrescriptionsForRecord(recordId: string): Promise<Prescription[]> {
  return apiFetch<Prescription[]>(`/records/${recordId}/prescriptions`);
}

export function createPrescription(payload: CreatePrescriptionPayload): Promise<Prescription> {
  return apiFetch<Prescription>(`/records/${payload.recordId}/prescriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medicalRecordId: payload.recordId,
      patientId: payload.patientId,
      medications: payload.medications,
      notes: payload.notes,
    }),
  });
}
