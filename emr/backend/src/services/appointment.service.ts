import { AppointmentModel } from '../models/appointment.model';
import { CreateAppointmentDTO, UpdateAppointmentDTO, AppointmentQuery } from '../types/appointment.types';
import { AppError } from '../middlewares/error.middleware';

class AppointmentService {
  async createAppointment(doctorId: string, payload: CreateAppointmentDTO) {
    const startsAt = new Date(payload.startsAt);
    const endsAt = new Date(payload.endsAt);

    if (isNaN(startsAt.getTime()) || isNaN(endsAt.getTime()) || endsAt <= startsAt) {
      throw new AppError('Invalid appointment time range', 400, 'INVALID_TIME_RANGE');
    }

    const overlap = await AppointmentModel.findOne({
      doctor: doctorId,
      startsAt: { $lt: endsAt },
      endsAt: { $gt: startsAt },
      status: { $in: ['pending', 'confirmed'] },
    });

    if (overlap) {
      throw new AppError('Overlapping appointment exists', 400, 'APPOINTMENT_OVERLAP');
    }

    const appointment = await AppointmentModel.create({
      doctor: doctorId,
      patient: payload.patientId,
      startsAt,
      endsAt,
      reason: payload.reason,
      notes: payload.notes,
    });

    return appointment;
  }

  async listAppointments(doctorId: string, query: AppointmentQuery) {
    const filter: any = { doctor: doctorId };
    if (query.status) {
      filter.status = query.status;
    }
    if (query.from || query.to) {
      filter.startsAt = {};
      if (query.from) filter.startsAt.$gte = new Date(query.from);
      if (query.to) filter.startsAt.$lte = new Date(query.to);
    }

    const items = await AppointmentModel.find(filter)
      .populate('patient', 'firstName lastName')
      .sort({ startsAt: 1 });

    return items;
  }

  async getAppointmentById(doctorId: string, id: string) {
    const appointment = await AppointmentModel.findOne({ _id: id, doctor: doctorId }).populate('patient', 'firstName lastName');
    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }
    return appointment;
  }

  async updateAppointment(doctorId: string, id: string, payload: UpdateAppointmentDTO) {
    const update: any = { ...payload };
    if (payload.startsAt) update.startsAt = new Date(payload.startsAt);
    if (payload.endsAt) update.endsAt = new Date(payload.endsAt);
    if (payload.patientId) update.patient = payload.patientId;

    const appointment = await AppointmentModel.findOneAndUpdate({ _id: id, doctor: doctorId }, update, { new: true });
    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }
    return appointment;
  }

  async deleteAppointment(doctorId: string, id: string) {
    const appointment = await AppointmentModel.findOneAndDelete({ _id: id, doctor: doctorId });
    if (!appointment) {
      throw new AppError('Appointment not found', 404, 'APPOINTMENT_NOT_FOUND');
    }
  }

  async countUpcomingForDoctor(doctorId: string, from: Date, to: Date) {
    const count = await AppointmentModel.countDocuments({
      doctor: doctorId,
      startsAt: { $gte: from, $lte: to },
      status: { $in: ['pending', 'confirmed'] },
    });
    return count;
  }
}

export const appointmentService = new AppointmentService();
