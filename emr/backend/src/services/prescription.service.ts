import { PrescriptionModel } from '../models/prescription.model';
import { CreatePrescriptionDTO } from '../types/prescription.types';
import { AppError } from '../middlewares/error.middleware';

class PrescriptionService {
  async createPrescription(doctorId: string, payload: CreatePrescriptionDTO) {
    if (!payload.medications || payload.medications.length === 0) {
      throw new AppError('At least one medication is required', 400, 'MEDICATIONS_REQUIRED');
    }

    const prescription = await PrescriptionModel.create({
      medicalRecord: payload.medicalRecordId,
      patient: payload.patientId,
      doctor: doctorId,
      medications: payload.medications,
      notes: payload.notes,
    });

    const port = process.env.PORT || '4000';
    const backendPublicUrl = process.env.BACKEND_PUBLIC_URL || `http://localhost:${port}`;
    prescription.pdfUrl = `${backendPublicUrl}/api/prescriptions/${prescription._id.toString()}/pdf`;
    await prescription.save();

    return prescription;
  }

  async listForRecord(doctorId: string, medicalRecordId: string) {
    const prescriptions = await PrescriptionModel.find({
      medicalRecord: medicalRecordId,
      doctor: doctorId,
    }).sort({ prescribedAt: -1 });
    return prescriptions;
  }

  async getByIdForDoctor(doctorId: string, prescriptionId: string) {
    const prescription = await PrescriptionModel.findOne({
      _id: prescriptionId,
      doctor: doctorId,
    });

    if (!prescription) {
      throw new AppError('Prescription not found', 404, 'PRESCRIPTION_NOT_FOUND');
    }

    return prescription;
  }
}

export const prescriptionService = new PrescriptionService();
