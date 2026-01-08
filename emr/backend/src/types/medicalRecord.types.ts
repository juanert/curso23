export interface CreateMedicalRecordDTO {
  patientId: string;
  appointmentId?: string;
  visitDate?: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface UpdateMedicalRecordDTO extends Partial<CreateMedicalRecordDTO> {}

export interface MedicalRecordQuery {
  from?: string;
  to?: string;
}
