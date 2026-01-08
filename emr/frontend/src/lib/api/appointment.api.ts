import { apiFetch } from './httpClient';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  _id: string;
  doctor: string;
  patient: {
    _id: string;
    firstName: string;
    lastName: string;
  } | string;
  startsAt: string;
  endsAt: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
}

export interface CreateAppointmentPayload {
  patientId: string;
  startsAt: string;
  endsAt: string;
  reason?: string;
  notes?: string;
}

export interface UpdateAppointmentPayload extends Partial<CreateAppointmentPayload> {
  status?: AppointmentStatus;
}

export function listAppointments(params: { status?: AppointmentStatus; from?: string; to?: string } = {}): Promise<Appointment[]> {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.from) query.set('from', params.from);
  if (params.to) query.set('to', params.to);
  const qs = query.toString();
  const suffix = qs ? `?${qs}` : '';
  return apiFetch<Appointment[]>(`/appointments${suffix}`);
}

export function createAppointment(payload: CreateAppointmentPayload): Promise<Appointment> {
  return apiFetch<Appointment>('/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function getAppointment(id: string): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}`);
}
