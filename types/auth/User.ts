export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
