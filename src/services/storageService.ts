import { StudyGoal, GoalFormData } from '../types/studyGoal';

const STORAGE_KEY = 'studyflow_goals_v1';

// Exemplos iniciais acolhedores focados em estudantes iniciantes
export const INITIAL_SAMPLE_GOALS: StudyGoal[] = [
  {
    id: 'goal-ex-1',
    title: 'Dominar a sintaxe básica de JavaScript',
    description: 'Estudar variáveis, funções, laços de repetição (loops) e condicionais com exercícios práticos.',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'goal-ex-2',
    title: 'Compreender o conceito de Flexbox e Grid no CSS',
    description: 'Criar uma página responsiva de teste para fixar o alinhamento de elementos e espaçamentos.',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'goal-ex-3',
    title: 'Montar cronograma semanal de 45 minutos diários',
    description: 'Definir horário fixo das 19h às 19h45 para criar consistência no hábito de estudo.',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Serviço responsável por gerenciar a persistência dos objetivos de estudo no localStorage.
 */
export const storageService = {
  /**
   * Obtém todos os objetivos salvos. Retorna array vazio se não houver dados.
   */
  getGoals(): StudyGoal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista inteira de objetivos no localStorage.
   */
  saveGoals(goals: StudyGoal[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Adiciona um novo objetivo de estudo e persiste no localStorage.
   */
  addGoal(goalData: GoalFormData): StudyGoal {
    const newGoal: StudyGoal = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `goal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: goalData.title.trim(),
      description: goalData.description.trim(),
      deadline: goalData.deadline,
      status: goalData.status,
      createdAt: new Date().toISOString(),
    };

    const currentGoals = this.getGoals();
    const updatedGoals = [newGoal, ...currentGoals];
    this.saveGoals(updatedGoals);
    return newGoal;
  },

  /**
   * Atualiza um objetivo existente por ID.
   */
  updateGoal(id: string, updates: Partial<GoalFormData>): StudyGoal | null {
    const currentGoals = this.getGoals();
    const index = currentGoals.findIndex(g => g.id === id);
    if (index === -1) return null;

    const existingGoal = currentGoals[index];
    const updatedGoal: StudyGoal = {
      ...existingGoal,
      ...updates,
      title: updates.title !== undefined ? updates.title.trim() : existingGoal.title,
      description: updates.description !== undefined ? updates.description.trim() : existingGoal.description,
      updatedAt: new Date().toISOString(),
    };

    currentGoals[index] = updatedGoal;
    this.saveGoals(currentGoals);
    return updatedGoal;
  },

  /**
   * Remove um objetivo por ID.
   */
  deleteGoal(id: string): boolean {
    const currentGoals = this.getGoals();
    const filtered = currentGoals.filter(g => g.id !== id);
    if (filtered.length === currentGoals.length) {
      return false;
    }
    this.saveGoals(filtered);
    return true;
  },

  /**
   * Carrega os dados de exemplo caso o estudante deseje experimentar a aplicação.
   */
  loadSampleGoals(): StudyGoal[] {
    this.saveGoals(INITIAL_SAMPLE_GOALS);
    return INITIAL_SAMPLE_GOALS;
  },

  /**
   * Limpa todos os dados salvos no localStorage.
   */
  clearAllGoals(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }
};
