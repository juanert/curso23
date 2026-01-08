"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPatient, Patient } from '@/lib/api/patient.api';
import { Button } from '@/components/atoms/Button';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams<{ patientId: string }>();
  const patientId = params.patientId;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const p = await getPatient(patientId);
        if (isMounted) setPatient(p);
      } catch (err) {
        if (isMounted) setError('Failed to load patient');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [patientId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-gray-600">Loading patient...</p>
      </main>
    );
  }

  if (error || !patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-lg bg-white p-8 shadow">
          <p className="mb-4 text-red-600">{error || 'Patient not found'}</p>
          <Button onClick={() => router.push('/patients')}>Back to patients</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="mt-4 text-2xl font-semibold">
          {patient.firstName} {patient.lastName}
        </h1>
        <p className="text-sm text-gray-600">DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</p>

        {/* Placeholder for future tabs: overview, medical history, appointments, etc. */}
      </div>
    </main>
  );
}
