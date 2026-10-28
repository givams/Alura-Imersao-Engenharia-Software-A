import React from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { StatusFilterOption, SortOption } from '../types/studyGoal';

interface GoalFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilterOption;
  onStatusFilterChange: (status: StatusFilterOption) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  totalFiltered: number;
}

export const GoalFilters: React.FC<GoalFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  totalFiltered,
}) => {
  const hasActiveFilters = searchQuery.trim() !== '' || statusFilter !== 'todos';

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Barra de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título ou descrição..."
            className="w-full pl-10 pr-9 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Seletor de Ordenação */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-600 shrink-0">
            Ordenar:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="prazo_asc">Prazo mais próximo</option>
            <option value="prazo_desc">Prazo mais distante</option>
            <option value="recentes">Mais recentes</option>
            <option value="alfabetica">Ordem alfabética (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Abas Segmentadas de Filtro de Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl">
          <button
            type="button"
            onClick={() => onStatusFilterChange('todos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              statusFilter === 'todos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('nao_iniciado')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              statusFilter === 'nao_iniciado'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Não iniciados
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('em_andamento')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              statusFilter === 'em_andamento'
                ? 'bg-white text-blue-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Em andamento
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange('concluido')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              statusFilter === 'concluido'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Concluídos
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>
            Exibindo <strong className="text-slate-700 font-mono tabular-nums">{totalFiltered}</strong> {totalFiltered === 1 ? 'objetivo' : 'objetivos'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onStatusFilterChange('todos');
              }}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 underline cursor-pointer ml-1"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
