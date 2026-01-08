import { PatientModel } from '../models/patient.model';
import { CreatePatientDTO, UpdatePatientDTO, PatientQuery } from '../types/patient.types';
import { getPagination } from '../utils/pagination.util';
import { AppError } from '../middlewares/error.middleware';

class PatientService {
  async createPatient(doctorId: string, payload: CreatePatientDTO) {
    const patient = await PatientModel.create({
      primaryDoctor: doctorId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      dateOfBirth: new Date(payload.dateOfBirth),
      gender: payload.gender,
      phone: payload.phone,
      email: payload.email,
      address: payload.address,
      insurance: payload.insurance,
      identifiers: payload.identifiers,
    });

    return patient;
  }

  async listPatients(doctorId: string, query: PatientQuery) {
    const { search, page = 1, pageSize = 10 } = query;
    const { skip, limit } = getPagination(page, pageSize);

    const filter: any = { primaryDoctor: doctorId, isActive: true };

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { firstName: regex },
        { lastName: regex },
        { 'identifiers.medicalRecordNumber': regex },
      ];
    }

    const [items, total] = await Promise.all([
      PatientModel.find(filter).sort({ lastName: 1, firstName: 1 }).skip(skip).limit(limit),
      PatientModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
    };
  }

  async getPatientById(doctorId: string, id: string) {
    const patient = await PatientModel.findOne({ _id: id, primaryDoctor: doctorId, isActive: true });
    if (!patient) {
      throw new AppError('Patient not found', 404, 'PATIENT_NOT_FOUND');
    }
    return patient;
  }

  async updatePatient(doctorId: string, id: string, payload: UpdatePatientDTO) {
    const patient = await PatientModel.findOneAndUpdate(
      { _id: id, primaryDoctor: doctorId, isActive: true },
      {
        ...payload,
        ...(payload.dateOfBirth ? { dateOfBirth: new Date(payload.dateOfBirth) } : {}),
      },
      { new: true }
    );

    if (!patient) {
      throw new AppError('Patient not found', 404, 'PATIENT_NOT_FOUND');
    }
    return patient;
  }

  async softDeletePatient(doctorId: string, id: string) {
    const patient = await PatientModel.findOneAndUpdate(
      { _id: id, primaryDoctor: doctorId, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!patient) {
      throw new AppError('Patient not found', 404, 'PATIENT_NOT_FOUND');
    }

    return patient;
  }
}

export const patientService = new PatientService();
