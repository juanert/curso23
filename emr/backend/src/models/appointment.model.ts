import { Schema, model, Types } from 'mongoose';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface IAppointment {
  _id: Types.ObjectId;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  startsAt: Date;
  endsAt: Date;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending', index: true },
    reason: String,
    notes: String,
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctor: 1, startsAt: 1, endsAt: 1 });

export const AppointmentModel = model<IAppointment>('Appointment', AppointmentSchema);
