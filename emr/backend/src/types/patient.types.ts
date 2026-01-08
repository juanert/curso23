export interface CreatePatientDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  phone?: string;
  email?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  insurance?: {
    providerName?: string;
    policyNumber?: string;
    groupNumber?: string;
    planType?: string;
  };
  identifiers?: {
    nationalId?: string;
    medicalRecordNumber?: string;
  };
}

export interface UpdatePatientDTO extends Partial<CreatePatientDTO> {}

export interface PatientQuery {
  search?: string;
  page?: number;
  pageSize?: number;
}
