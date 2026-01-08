"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listPatients, Patient } from '@/lib/api/patient.api';
import { Button } from '@/components/atoms/Button';

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (searchValue?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await listPatients({ search: searchValue, page: 1, pageSize: 20 });
      setPatients(res.items);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load(search || undefined);
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <Button onClick={() => router.push('/patients/new')}>New patient</Button>
        </header>

        <form onSubmit={handleSearch} className="mb-4 flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or MRN..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        {loading ? (
          <p className="text-gray-600">Loading patients...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : patients.length === 0 ? (
          <p className="text-gray-600">No patients found.</p>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">DOB</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {patients.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-2">
                      {p.lastName}, {p.firstName}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="ghost" onClick={() => router.push(`/patients/${p._id}`)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
