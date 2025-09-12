import {
  AuthUser,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from "../auth";

export interface AuthService {
  login(credentials: LoginFormData): Promise<AuthUser>;
  register(userData: RegisterFormData): Promise<AuthUser>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthUser>;
  forgotPassword(data: ForgotPasswordFormData): Promise<void>;
  resetPassword(data: ResetPasswordFormData): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resendVerificationEmail(): Promise<void>;
}

export interface TokenStorage {
  getAccessToken(): Promise<string | null>;
  setAccessToken(token: string): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  clearTokens(): Promise<void>;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
