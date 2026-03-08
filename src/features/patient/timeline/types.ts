export type SeverityLevel = 'emergency' | 'routine' | 'normal';

export interface DiagnosisCategory {
  id: string;
  label: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  severity: SeverityLevel;
  categoryId: string;
  relatedConditions?: string[];
  clinicalDocument?: string;
}

export interface TimelineFilters {
  severityLevels: SeverityLevel[];
  categoryIds: string[];
  dateRange: { from: Date | undefined; to: Date | undefined };
}
