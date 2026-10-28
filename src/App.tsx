/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  StudyGoal,
  GoalFormData,
  GoalStatus,
  GoalStats,
  StatusFilterOption,
  SortOption,
} from './types/studyGoal';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { GoalStatsBar } from './components/GoalStatsBar';
import { GoalFilters } from './components/GoalFilters';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { StudentTipBanner } from './components/StudentTipBanner';
import { CheckCircle2, Plus } from 'lucide-react';

export default function App() {
  // Lista de objetivos de estudo gerenciados e persistidos no localStorage
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Estados dos modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<StudyGoal | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<StudyGoal | null>(null);

  // Filtros e ordenação
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('todos');
  const [sortBy, setSortBy] = useState<SortOption>('prazo_asc');

  // Feedback de notificação suave (toast)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carrega os dados do localStorage na montagem do componente
  useEffect(() => {
    const savedGoals = storageService.getGoals();
    if (savedGoals.length > 0) {
      setGoals(savedGoals);
    } else {
      // Se for a primeira vez e não houver dados, inicializamos com os exemplos acolhedores
      const initial = storageService.loadSampleGoals();
      setGoals(initial);
    }
    setIsLoaded(true);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Estatísticas calculadas
  const stats: GoalStats = useMemo(() => {
    const total = goals.length;
    const naoIniciado = goals.filter((g) => g.status === 'nao_iniciado').length;
    const emAndamento = goals.filter((g) => g.status === 'em_andamento').length;
    const concluido = goals.filter((g) => g.status === 'concluido').length;
    const percentualConcluido =
      total === 0 ? 0 : Math.round((concluido / total) * 100);

    return {
      total,
      naoIniciado,
      emAndamento,
      concluido,
      percentualConcluido,
    };
  }, [goals]);

  // Abertura do modal de criação
  const handleOpenCreateModal = () => {
    setGoalToEdit(null);
    setIsFormModalOpen(true);
  };

  // Abertura do modal de edição
  const handleOpenEditModal = (goal: StudyGoal) => {
    setGoalToEdit(goal);
    setIsFormModalOpen(true);
  };

  // Submissão do formulário (Criação ou Edição)
  const handleSubmitForm = (formData: GoalFormData) => {
    if (goalToEdit) {
      const updated = storageService.updateGoal(goalToEdit.id, formData);
      if (updated) {
        setGoals((prev) =>
          prev.map((g) => (g.id === goalToEdit.id ? updated : g))
        );
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      const newGoal = storageService.addGoal(formData);
      setGoals((prev) => [newGoal, ...prev]);
      showToast('Novo objetivo de estudo cadastrado!');
    }
    setIsFormModalOpen(false);
    setGoalToEdit(null);
  };

  // Alteração rápida de status pelo card
  const handleUpdateStatus = (id: string, newStatus: GoalStatus) => {
    const updated = storageService.updateGoal(id, { status: newStatus });
    if (updated) {
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
      const statusLabels = {
        nao_iniciado: 'A Iniciar',
        em_andamento: 'Em Andamento',
        concluido: 'Concluído 🎉',
      };
      showToast(`Status alterado para: ${statusLabels[newStatus]}`);
    }
  };

  // Solicitação de exclusão (abre confirmação)
  const handleRequestDelete = (goal: StudyGoal) => {
    setGoalToDelete(goal);
    setIsDeleteModalOpen(true);
  };

  // Confirmação efetiva da exclusão
  const handleConfirmDelete = (id: string) => {
    const success = storageService.deleteGoal(id);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      showToast('Objetivo excluído com sucesso.');
    }
    setIsDeleteModalOpen(false);
    setGoalToDelete(null);
  };

  // Carregar exemplos práticos
  const handleLoadSamples = () => {
    const samples = storageService.loadSampleGoals();
    setGoals(samples);
    showToast('Exemplos de estudos carregados!');
  };

  // Filtragem e ordenação dos objetivos
  const filteredGoals = useMemo(() => {
    return goals
      .filter((goal) => {
        // Filtro por texto
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchTitle = goal.title.toLowerCase().includes(query);
          const matchDesc = goal.description.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        // Filtro por status
        if (statusFilter !== 'todos') {
          if (goal.status !== statusFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'prazo_asc') {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return a.deadline.localeCompare(b.deadline);
        }
        if (sortBy === 'prazo_desc') {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return b.deadline.localeCompare(a.deadline);
        }
        if (sortBy === 'recentes') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'alfabetica') {
          return a.title.localeCompare(b.title, 'pt-BR');
        }
        return 0;
      });
  }, [goals, searchQuery, statusFilter, sortBy]);

  const hasAnyGoals = goals.length > 0;
  const isFiltered = hasAnyGoals && filteredGoals.length === 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center text-slate-500 text-sm">
          Carregando seus objetivos de estudo...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        totalGoals={stats.total}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Banner acolhedor de dicas para iniciantes */}
        <StudentTipBanner />

        {/* Quantidade e Progresso dos Objetivos */}
        <GoalStatsBar
          stats={stats}
          selectedFilter={statusFilter}
          onSelectFilter={(status) => setStatusFilter(status)}
        />

        {/* Controles de Busca e Filtros */}
        {hasAnyGoals && (
          <GoalFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            totalFiltered={filteredGoals.length}
          />
        )}

        {/* Listagem de Objetivos em Cards */}
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleOpenEditModal}
                onRequestDelete={handleRequestDelete}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            isFiltered={isFiltered}
            onOpenCreateModal={handleOpenCreateModal}
            onClearFilters={() => {
              setSearchQuery('');
              setStatusFilter('todos');
            }}
            onLoadSamples={goals.length === 0 ? handleLoadSamples : undefined}
          />
        )}

        {/* Ação rápida flutuante no mobile */}
        <div className="sm:hidden fixed bottom-6 right-6 z-20">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-300 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Cadastrar novo objetivo"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </main>

      {/* Footer simples e acolhedor */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <strong className="font-semibold text-slate-700">StudyFlow</strong> —
            Organização simples para quem está começando a aprender.
          </div>
          <div>
            Os dados ficam salvos com segurança no armazenamento do seu navegador (localStorage).
          </div>
        </div>
      </footer>

      {/* Modal de Criação / Edição */}
      <GoalFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setGoalToEdit(null);
        }}
        onSubmit={handleSubmitForm}
        goalToEdit={goalToEdit}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        goal={goalToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setGoalToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast de notificação amigável */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
