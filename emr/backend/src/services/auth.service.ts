import { UserModel, UserRole } from '../models/user.model';
import { RegisterDoctorDTO, LoginDTO, AuthTokens } from '../types/auth.types';
import { hashPassword, comparePassword } from '../utils/password.util';
import { signAccessToken } from '../utils/jwt.util';
import { AppError } from '../middlewares/error.middleware';

export class AuthService {
  async registerDoctor(payload: RegisterDoctorDTO) {
    const existing = await UserModel.findOne({ email: payload.email });
    if (existing) {
      throw new AppError('Email already in use', 400, 'EMAIL_TAKEN');
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await UserModel.create({
      email: payload.email,
      passwordHash,
      role: UserRole.Doctor,
      firstName: payload.firstName,
      lastName: payload.lastName,
      specialization: payload.specialization,
      licenseNumber: payload.licenseNumber,
      status: 'active',
    });

    return user;
  }

  async login(credentials: LoginDTO): Promise<AuthTokens & { user: any }> {
    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const isValid = await comparePassword(credentials.password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    if (user.status !== 'active') {
      throw new AppError('User is not active', 403, 'USER_INACTIVE');
    }

    const accessToken = signAccessToken({ sub: user._id.toString(), role: user.role });

    user.lastLoginAt = new Date();
    await user.save();

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId).select('-passwordHash');
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return user;
  }
}

export const authService = new AuthService();
