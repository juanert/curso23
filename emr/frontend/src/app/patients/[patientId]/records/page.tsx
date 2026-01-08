"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { listRecordsForPatient, MedicalRecord } from '@/lib/api/medicalRecord.api';
import { Button } from '@/components/atoms/Button';

export default function PatientRecordsPage() {
  const params = useParams<{ patientId: string }>();
  const patientId = params.patientId;
  const router = useRouter();

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await listRecordsForPatient(patientId);
        if (isMounted) setRecords(res);
      } catch (err) {
        if (isMounted) setError('Failed to load medical history');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [patientId]);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Medical history</h1>
          <Button onClick={() => router.push(`/patients/${patientId}/records/new`)}>New consultation</Button>
        </header>

        {loading ? (
          <p className="text-gray-600">Loading history...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : records.length === 0 ? (
          <p className="text-gray-600">No medical records yet.</p>
        ) : (
          <ol className="relative border-l border-gray-300">
            {records.map((r) => (
              <li key={r._id} className="ml-4 mb-6">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-blue-600 bg-white" />
                <time className="text-xs text-gray-500">
                  {new Date(r.visitDate).toLocaleString()}
                </time>
                <h3 className="text-sm font-semibold">
                  {r.assessment}
                </h3>
                <p className="mt-1 text-xs text-gray-600 line-clamp-2">{r.plan}</p>
                <Button
                  variant="ghost"
                  className="mt-1 px-0 text-xs text-blue-600"
                  onClick={() => router.push(`/patients/${patientId}/records/${r._id}`)}
                >
                  View details
                </Button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
