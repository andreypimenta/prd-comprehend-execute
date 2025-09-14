// Following PRD types structure
export interface User {
  id: string;
  authUserId: string;
  email: string;
  name?: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: 'oauth' | 'email' | 'credentials';
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface AuthUser {
  user: User;
  session: Session | null;
  accounts: Account[];
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  user?: User;
  session?: Session;
  error?: AuthError;
}

export interface OAuthProvider {
  id: string;
  name: string;
  icon?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<AuthResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: string) => Promise<AuthResponse>;
  refreshSession: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<AuthResponse>;
}