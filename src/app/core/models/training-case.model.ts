export type TrainingCaseCategory =
  | 'OSINT'
  | 'BLUE_TEAM'
  | 'RED_TEAM'
  | 'SECURITY_ENGINEERING'
  | 'INCIDENT_RESPONSE';

export type TrainingCaseDifficulty =
  | 'EASY'
  | 'MEDIUM'
  | 'HARD';

export interface TrainingCaseSummary {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  category: TrainingCaseCategory;
  difficulty: TrainingCaseDifficulty;
  estimatedMinutes: number;
  points: number;
  icon: string | null;
  imageUrl: string | null;
  accentColor: string | null;
}

export interface TrainingCaseDetail
  extends TrainingCaseSummary {
  description: string;
  environmentName: string | null;
  roleName: string | null;
  objective: string | null;
}