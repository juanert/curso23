import { apiFetch } from './httpClient';
import type { User } from '@/types/user';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterDoctorPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  specialization?: string;
  licenseNumber?: string;
}

export async function login(payload: LoginPayload): Promise<User> {
  return apiFetch<User>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function registerDoctor(payload: RegisterDoctorPayload): Promise<User> {
  return apiFetch<User>('/auth/register-doctor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
