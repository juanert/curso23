import { MedicalRecordModel } from '../models/medicalRecord.model';
import { CreateMedicalRecordDTO, UpdateMedicalRecordDTO, MedicalRecordQuery } from '../types/medicalRecord.types';
import { AppError } from '../middlewares/error.middleware';

class MedicalRecordService {
  async createRecord(doctorId: string, payload: CreateMedicalRecordDTO) {
    const visitDate = payload.visitDate ? new Date(payload.visitDate) : new Date();

    const record = await MedicalRecordModel.create({
      patient: payload.patientId,
      doctor: doctorId,
      appointment: payload.appointmentId,
      visitDate,
      subjective: payload.subjective,
      objective: payload.objective,
      assessment: payload.assessment,
      plan: payload.plan,
    });

    return record;
  }

  async listRecordsForPatient(doctorId: string, patientId: string, query: MedicalRecordQuery) {
    const filter: any = { patient: patientId, doctor: doctorId };
    if (query.from || query.to) {
      filter.visitDate = {};
      if (query.from) filter.visitDate.$gte = new Date(query.from);
      if (query.to) filter.visitDate.$lte = new Date(query.to);
    }

    const records = await MedicalRecordModel.find(filter).sort({ visitDate: -1 });
    return records;
  }

  async getRecordById(doctorId: string, id: string) {
    const record = await MedicalRecordModel.findOne({ _id: id, doctor: doctorId }).populate('patient', 'firstName lastName');
    if (!record) {
      throw new AppError('Medical record not found', 404, 'MEDICAL_RECORD_NOT_FOUND');
    }
    return record;
  }

  async updateRecord(doctorId: string, id: string, payload: UpdateMedicalRecordDTO) {
    const update: any = { ...payload };
    if (payload.visitDate) update.visitDate = new Date(payload.visitDate);
    if (payload.patientId) update.patient = payload.patientId;
    if (payload.appointmentId) update.appointment = payload.appointmentId;

    const record = await MedicalRecordModel.findOneAndUpdate({ _id: id, doctor: doctorId }, update, { new: true });
    if (!record) {
      throw new AppError('Medical record not found', 404, 'MEDICAL_RECORD_NOT_FOUND');
    }
    return record;
  }
}

export const medicalRecordService = new MedicalRecordService();
