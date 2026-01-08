import { Schema, model, Types } from 'mongoose';

export enum UserRole {
  Doctor = 'doctor',
  Admin = 'admin',
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  status: 'pending' | 'active' | 'suspended';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    specialization: String,
    licenseNumber: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ['pending', 'active', 'suspended'], default: 'pending' },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);
