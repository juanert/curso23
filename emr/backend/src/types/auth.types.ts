export interface RegisterDoctorDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}
