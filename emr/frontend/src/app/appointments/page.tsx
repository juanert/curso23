"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listAppointments, Appointment, AppointmentStatus } from '@/lib/api/appointment.api';
import { Button } from '@/components/atoms/Button';

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [status, setStatus] = useState<AppointmentStatus | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (statusValue?: AppointmentStatus | '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await listAppointments({ status: (statusValue || undefined) as any });
      setAppointments(res);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFilterChange = (value: string) => {
    const casted = (value || '') as AppointmentStatus | '';
    setStatus(casted);
    load(casted);
  };

  const formatDateTime = (iso: string) => new Date(iso).toLocaleString();

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <Button onClick={() => router.push('/appointments/new')}>New appointment</Button>
        </header>

        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading appointments...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Patient</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Start</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {appointments.map((a) => {
                  const patientName =
                    typeof a.patient === 'string'
                      ? a.patient
                      : `${a.patient.lastName}, ${a.patient.firstName}`;
                  return (
                    <tr key={a._id}>
                      <td className="px-4 py-2">{patientName}</td>
                      <td className="px-4 py-2 text-gray-600">{formatDateTime(a.startsAt)}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" onClick={() => router.push(`/appointments/${a._id}`)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
