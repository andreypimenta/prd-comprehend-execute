// Following PRD user types structure
export interface UserProfile {
  id: string;
  userId: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  symptoms?: string[];
  healthGoals?: string[];
  exerciseFrequency?: number;
  sleepQuality?: number;
  stressLevel?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    recommendations: boolean;
    reminders: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
    analytics: boolean;
  };
}

export interface UserStats {
  totalRecommendations: number;
  completedAssessments: number;
  avgConfidenceScore: number;
  lastActivityAt: Date;
  joinedAt: Date;
}

export interface CompleteUserData {
  user: import('./auth').User;
  profile?: UserProfile;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UpdateUserProfileData {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  symptoms?: string[];
  healthGoals?: string[];
  exerciseFrequency?: number;
  sleepQuality?: number;
  stressLevel?: number;
}

export interface CreateUserProfileData extends UpdateUserProfileData {
  userId: string;
}