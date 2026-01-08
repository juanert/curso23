import { apiFetch } from './httpClient';

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  phone?: string;
  email?: string;
}

export interface PatientListResponse {
  items: Patient[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreatePatientPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  phone?: string;
  email?: string;
}

export function listPatients(params: { search?: string; page?: number; pageSize?: number }): Promise<PatientListResponse> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.page) query.set('page', String(params.page));
  if (params.pageSize) query.set('pageSize', String(params.pageSize));
  const qs = query.toString();
  const suffix = qs ? `?${qs}` : '';
  return apiFetch<PatientListResponse>(`/patients${suffix}`);
}

export function createPatient(payload: CreatePatientPayload): Promise<Patient> {
  return apiFetch<Patient>('/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function getPatient(id: string): Promise<Patient> {
  return apiFetch<Patient>(`/patients/${id}`);
}
