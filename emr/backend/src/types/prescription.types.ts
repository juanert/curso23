export interface MedicationItemDTO {
  name: string;
  dosage: string;
  route?: string;
  frequency: string;
  duration?: string;
  instructions?: string;
}

export interface CreatePrescriptionDTO {
  medicalRecordId: string;
  patientId: string;
  medications: MedicationItemDTO[];
  notes?: string;
}
