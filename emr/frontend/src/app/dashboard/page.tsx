"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboardOverview, DashboardOverview } from '@/lib/api/dashboard.api';
import { Button } from '@/components/atoms/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const overview = await getDashboardOverview();
        if (isMounted) {
          setData(overview);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load dashboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-gray-600">Loading dashboard...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-lg bg-white p-8 shadow">
          <p className="mb-4 text-red-600">{error || 'Unable to load dashboard'}</p>
          <Button onClick={() => router.refresh()}>Retry</Button>
        </div>
      </main>
    );
  }

  const { doctor, stats } = data;

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome, {doctor.firstName} {doctor.lastName}
            </h1>
            <p className="text-sm text-gray-600">Role: {doctor.role}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => router.push('/patients/new')}>New patient</Button>
            <Button variant="secondary" onClick={() => router.push('/appointments/new')}>
              New appointment
            </Button>
          </div>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Patients</p>
            <p className="mt-2 text-3xl font-semibold">{stats.totalPatients}</p>
            <p className="mt-1 text-xs text-gray-500">Total patients assigned to you</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-gray-500">Upcoming appointments</p>
            <p className="mt-2 text-3xl font-semibold">{stats.upcomingAppointments}</p>
            <p className="mt-1 text-xs text-gray-500">Next 7 days</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-gray-500">System status</p>
            <p className="mt-2 text-base font-medium text-green-700">Online</p>
            <p className="mt-1 text-xs text-gray-500">Backend health: OK</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Quick navigation</h2>
          <p className="mt-1 text-sm text-gray-600">Jump directly to the main sections of your workspace.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => router.push('/patients')}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md"
           >
              <span className="text-sm font-semibold text-slate-900">Patients</span>
              <span className="mt-2 text-xs text-slate-600">
                View and manage your patient list and open their medical records.
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/appointments')}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-slate-900">Appointments</span>
              <span className="mt-2 text-xs text-slate-600">
                Review upcoming appointments and access visit details.
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/patients')}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-slate-900">Medical history</span>
              <span className="mt-2 text-xs text-slate-600">
                Open a patient and review their SOAP notes and prescriptions.
              </span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
