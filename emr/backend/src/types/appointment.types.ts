import { AppointmentStatus } from '../models/appointment.model';

export interface CreateAppointmentDTO {
  patientId: string;
  startsAt: string; // ISO datetime
  endsAt: string;   // ISO datetime
  reason?: string;
  notes?: string;
}

export interface UpdateAppointmentDTO extends Partial<CreateAppointmentDTO> {
  status?: AppointmentStatus;
}

export interface AppointmentQuery {
  status?: AppointmentStatus;
  from?: string;
  to?: string;
}
