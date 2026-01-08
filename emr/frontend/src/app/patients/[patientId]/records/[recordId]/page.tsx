"use client";

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRecord, MedicalRecord } from '@/lib/api/medicalRecord.api';
import { Button } from '@/components/atoms/Button';
import {
  createPrescription,
  listPrescriptionsForRecord,
  MedicationItem,
  Prescription,
} from '@/lib/api/prescription.api';

export default function MedicalRecordDetailPage() {
  const params = useParams<{ patientId: string; recordId: string }>();
  const { patientId, recordId } = params;
  const router = useRouter();

  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [prescLoading, setPrescLoading] = useState(true);
  const [prescError, setPrescError] = useState<string | null>(null);

  const [medicationName, setMedicationName] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');
  const [medicationFrequency, setMedicationFrequency] = useState('');
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [submittingPrescription, setSubmittingPrescription] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const r = await getRecord(recordId);
        if (isMounted) setRecord(r);
      } catch (err) {
        if (isMounted) setError('Failed to load record');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [recordId]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await listPrescriptionsForRecord(recordId);
        if (isMounted) setPrescriptions(data);
      } catch (err) {
        if (isMounted) setPrescError('Failed to load prescriptions');
      } finally {
        if (isMounted) setPrescLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [recordId]);

  const handleCreatePrescription = async (e: FormEvent) => {
    e.preventDefault();
    if (!record) return;

    const medication: MedicationItem = {
      name: medicationName.trim(),
      dosage: medicationDosage.trim(),
      frequency: medicationFrequency.trim(),
    };

    if (!medication.name || !medication.dosage || !medication.frequency) {
      setPrescError('Please fill in medication name, dosage and frequency');
      return;
    }

    setSubmittingPrescription(true);
    setPrescError(null);
    try {
      const created = await createPrescription({
        recordId,
        patientId,
        medications: [medication],
        notes: prescriptionNotes.trim() || undefined,
      });
      setPrescriptions((prev) => [created, ...prev]);
      setMedicationName('');
      setMedicationDosage('');
      setMedicationFrequency('');
      setPrescriptionNotes('');
    } catch (err) {
      setPrescError('Failed to create prescription');
    } finally {
      setSubmittingPrescription(false);
    }
  };

  const handleOpenPdf = (p: Prescription) => {
    if (!p.pdfUrl) return;
    try {
      window.open(p.pdfUrl, '_blank');
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-gray-600">Loading record...</p>
      </main>
    );
  }

  if (error || !record) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-lg bg-white p-8 shadow">
          <p className="mb-4 text-red-600">{error || 'Record not found'}</p>
          <Button onClick={() => router.push(`/patients/${patientId}/records`)}>Back to history</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="mt-4 text-2xl font-semibold">Consultation details</h1>
        <p className="mt-1 text-sm text-gray-600">
          {new Date(record.visitDate).toLocaleString()}
        </p>

        <section className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow">
          <div>
            <h2 className="text-sm font-semibold">Subjective</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{record.subjective}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Objective</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{record.objective}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Assessment</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{record.assessment}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Plan</h2>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{record.plan}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-[2fr,3fr]">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-base font-semibold">New prescription</h2>
            <p className="mt-1 text-xs text-gray-500">
              Add a simple prescription linked to this consultation.
            </p>
            {prescError && (
              <p className="mt-2 text-xs text-red-600">{prescError}</p>
            )}
            <form onSubmit={handleCreatePrescription} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Medication name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  placeholder="e.g. Amoxicillin"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Dosage</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={medicationDosage}
                    onChange={(e) => setMedicationDosage(e.target.value)}
                    placeholder="500 mg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Frequency</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={medicationFrequency}
                    onChange={(e) => setMedicationFrequency(e.target.value)}
                    placeholder="every 8 hours"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Notes (optional)</label>
                <textarea
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows={3}
                  value={prescriptionNotes}
                  onChange={(e) => setPrescriptionNotes(e.target.value)}
                  placeholder="Additional instructions for the patient"
                />
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={submittingPrescription}>
                  {submittingPrescription ? 'Saving...' : 'Save prescription'}
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Prescriptions</h2>
              {prescLoading && (
                <span className="text-xs text-gray-500">Loading...</span>
              )}
            </div>
            {!prescLoading && prescriptions.length === 0 && !prescError && (
              <p className="mt-3 text-sm text-gray-500">No prescriptions for this consultation yet.</p>
            )}
            <ul className="mt-4 space-y-3">
              {prescriptions.map((p) => (
                <li
                  key={p._id}
                  className="flex items-start justify-between rounded-md border border-gray-200 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {p.medications[0]?.name}{' '}
                      <span className="font-normal text-gray-600">{p.medications[0]?.dosage}</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      {p.medications[0]?.frequency}
                    </p>
                    {p.notes && (
                      <p className="mt-1 text-xs text-gray-500">{p.notes}</p>
                    )}
                    <p className="mt-1 text-[11px] text-gray-400">
                      {new Date(p.prescribedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-2 flex flex-col items-end gap-2">
                    {p.pdfUrl ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleOpenPdf(p)}
                      >
                        Open PDF
                      </Button>
                    ) : (
                      <span className="text-[11px] text-gray-400">PDF not available</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
