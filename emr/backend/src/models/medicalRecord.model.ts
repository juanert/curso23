import { Schema, model, Types } from 'mongoose';

export interface IVitals {
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  bloodPressure?: string;
  heartRate?: number;
  temperatureC?: number;
}

export interface ILabResult {
  name: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  date?: Date;
  notes?: string;
}

export interface IAttachment {
  type: 'lab' | 'imaging' | 'other';
  fileUrl: string;
  fileName: string;
  uploadedAt: Date;
}

export interface IMedicalRecord {
  _id: Types.ObjectId;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  appointment?: Types.ObjectId;
  visitDate: Date;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  vitals?: IVitals;
  labResults?: ILabResult[];
  attachments?: IAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

const VitalsSchema = new Schema<IVitals>(
  {
    heightCm: Number,
    weightKg: Number,
    bmi: Number,
    bloodPressure: String,
    heartRate: Number,
    temperatureC: Number,
  },
  { _id: false }
);

const LabResultSchema = new Schema<ILabResult>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    unit: String,
    referenceRange: String,
    date: Date,
    notes: String,
  },
  { _id: false }
);

const AttachmentSchema = new Schema<IAttachment>(
  {
    type: { type: String, enum: ['lab', 'imaging', 'other'], required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    visitDate: { type: Date, default: Date.now },
    subjective: { type: String, required: true },
    objective: { type: String, required: true },
    assessment: { type: String, required: true },
    plan: { type: String, required: true },
    vitals: VitalsSchema,
    labResults: [LabResultSchema],
    attachments: [AttachmentSchema],
  },
  { timestamps: true }
);

MedicalRecordSchema.index({ patient: 1, visitDate: -1 });

export const MedicalRecordModel = model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema);
