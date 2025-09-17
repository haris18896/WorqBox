import {
  AuthUser,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from "../auth";

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordFormData) => Promise<void>;
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
  clearError: () => void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  setFieldError: (field: keyof T, error: string) => void;
  handleSubmit: () => void;
  resetForm: () => void;
}
