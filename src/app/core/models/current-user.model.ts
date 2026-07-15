export type UserRole =
  | 'SUPER_ADMIN'
  | 'SOC_ANALYST'
  | 'BLUE_TEAM_ANALYST'
  | 'RED_TEAM_OPERATOR'
  | 'SECURITY_ENGINEER'
  | 'INCIDENT_RESPONDER';

export interface CurrentUser {
  id: number;
  displayName: string;
  username: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatarUrl: string | null;
  level: number;
  points: number;
  location: string;
  bio: string;
}