import { Schema, model, Types } from 'mongoose';

export interface IMedicationItem {
  name: string;
  dosage: string;
  route?: string;
  frequency: string;
  duration?: string;
  instructions?: string;
}

export interface IPrescription {
  _id: Types.ObjectId;
  medicalRecord: Types.ObjectId;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  prescribedAt: Date;
  medications: IMedicationItem[];
  notes?: string;
  pdfUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MedicationSchema = new Schema<IMedicationItem>(
  {
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    route: String,
    frequency: { type: String, required: true },
    duration: String,
    instructions: String,
  },
  { _id: false }
);

const PrescriptionSchema = new Schema<IPrescription>(
  {
    medicalRecord: { type: Schema.Types.ObjectId, ref: 'MedicalRecord', required: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    prescribedAt: { type: Date, default: Date.now },
    medications: { type: [MedicationSchema], required: true },
    notes: String,
    pdfUrl: String,
  },
  { timestamps: true }
);

export const PrescriptionModel = model<IPrescription>('Prescription', PrescriptionSchema);
