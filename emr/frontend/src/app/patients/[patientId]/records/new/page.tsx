"use client";

import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createRecord } from '@/lib/api/medicalRecord.api';
import { Button } from '@/components/atoms/Button';

export default function NewMedicalRecordPage() {
  const params = useParams<{ patientId: string }>();
  const patientId = params.patientId;
  const router = useRouter();

  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createRecord({
        patientId,
        subjective,
        objective,
        assessment,
        plan,
      });
      router.push(`/patients/${patientId}/records`);
    } catch (err) {
      setError('Failed to save consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">New consultation</h1>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow">
          <div>
            <label className="mb-1 block text-sm font-medium">Subjective</label>
            <textarea
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              className="h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Objective</label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Assessment</label>
            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Plan</label>
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => router.push(`/patients/${patientId}/records`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save record'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
