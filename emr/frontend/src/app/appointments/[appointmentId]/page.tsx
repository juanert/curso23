"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAppointment, Appointment } from '@/lib/api/appointment.api';
import { Button } from '@/components/atoms/Button';

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams<{ appointmentId: string }>();
  const appointmentId = params.appointmentId;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const a = await getAppointment(appointmentId);
        if (isMounted) setAppointment(a);
      } catch (err) {
        if (isMounted) setError('Failed to load appointment');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [appointmentId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-gray-600">Loading appointment...</p>
      </main>
    );
  }

  if (error || !appointment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-lg bg-white p-8 shadow">
          <p className="mb-4 text-red-600">{error || 'Appointment not found'}</p>
          <Button onClick={() => router.push('/appointments')}>Back to appointments</Button>
        </div>
      </main>
    );
  }

  const patientName =
    typeof appointment.patient === 'string'
      ? appointment.patient
      : `${appointment.patient.firstName} ${appointment.patient.lastName}`;

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="mt-4 text-2xl font-semibold">Appointment with {patientName}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {new Date(appointment.startsAt).toLocaleString()} - {new Date(appointment.endsAt).toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-gray-600">Status: {appointment.status}</p>
        {appointment.reason && <p className="mt-2 text-sm text-gray-700">Reason: {appointment.reason}</p>}
      </div>
    </main>
  );
}
