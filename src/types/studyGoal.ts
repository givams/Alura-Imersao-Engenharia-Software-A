export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // formato YYYY-MM-DD
  status: GoalStatus;
  createdAt: string; // ISO string
  updatedAt?: string; // ISO string
}

export type GoalFormData = {
  title: string;
  description: string;
  deadline: string;
  status: GoalStatus;
};

export interface GoalStats {
  total: number;
  naoIniciado: number;
  emAndamento: number;
  concluido: number;
  percentualConcluido: number;
}

export type StatusFilterOption = 'todos' | GoalStatus;
export type SortOption = 'prazo_asc' | 'prazo_desc' | 'recentes' | 'alfabetica';
