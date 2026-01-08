import { apiFetch } from './httpClient';

export interface DashboardStats {
  totalPatients: number;
  upcomingAppointments: number;
}

export interface DashboardOverview {
  doctor: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  stats: DashboardStats;
  serverTime: string;
}

export function getDashboardOverview(): Promise<DashboardOverview> {
  return apiFetch<DashboardOverview>('/dashboard/overview');
}
