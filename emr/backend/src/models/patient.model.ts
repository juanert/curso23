import { Schema, model, Types } from 'mongoose';

export interface IPatientAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface IPatientInsurance {
  providerName?: string;
  policyNumber?: string;
  groupNumber?: string;
  planType?: string;
}

export interface IPatientIdentifiers {
  nationalId?: string;
  medicalRecordNumber?: string;
}

export interface IPatient {
  _id: Types.ObjectId;
  primaryDoctor: Types.ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  phone?: string;
  email?: string;
  address?: IPatientAddress;
  insurance?: IPatientInsurance;
  identifiers?: IPatientIdentifiers;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IPatientAddress>(
  {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  { _id: false }
);

const InsuranceSchema = new Schema<IPatientInsurance>(
  {
    providerName: String,
    policyNumber: String,
    groupNumber: String,
    planType: String,
  },
  { _id: false }
);

const IdentifiersSchema = new Schema<IPatientIdentifiers>(
  {
    nationalId: String,
    medicalRecordNumber: String,
  },
  { _id: false }
);

const PatientSchema = new Schema<IPatient>(
  {
    primaryDoctor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, index: true },
    lastName: { type: String, required: true, index: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other', 'unknown'] },
    phone: String,
    email: String,
    address: AddressSchema,
    insurance: InsuranceSchema,
    identifiers: IdentifiersSchema,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PatientSchema.index({ firstName: 1, lastName: 1 });

export const PatientModel = model<IPatient>('Patient', PatientSchema);
