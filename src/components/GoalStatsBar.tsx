import React from 'react';
import { Layers, Clock, PlayCircle, CheckCircle2 } from 'lucide-react';
import { GoalStats } from '../types/studyGoal';

interface GoalStatsBarProps {
  stats: GoalStats;
  selectedFilter: string;
  onSelectFilter: (status: any) => void;
}

export const GoalStatsBar: React.FC<GoalStatsBarProps> = ({
  stats,
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Resumo de Aprendizado
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhe o volume e a evolução dos seus objetivos em andamento.
          </p>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-700">Progresso Geral</span>
            <div className="text-xs text-slate-500 font-mono tabular-nums">
              {stats.concluido} de {stats.total} concluídos ({stats.percentualConcluido}%)
            </div>
          </div>
          <div className="w-24 sm:w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${stats.percentualConcluido}%` }}
              role="progressbar"
              aria-valuenow={stats.percentualConcluido}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Grid de Cards de Contagem */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
        {/* Total */}
        <button
          type="button"
          onClick={() => onSelectFilter('todos')}
          className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'todos'
              ? 'bg-indigo-50/60 border-indigo-200 ring-1 ring-indigo-300'
              : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/70'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-100/80 flex items-center justify-center text-indigo-700 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-medium text-slate-500">Total cadastrados</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.total}
            </span>
          </div>
        </button>

        {/* Não Iniciados */}
        <button
          type="button"
          onClick={() => onSelectFilter('nao_iniciado')}
          className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'nao_iniciado'
              ? 'bg-amber-50/60 border-amber-200 ring-1 ring-amber-300'
              : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/70'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-amber-100/80 flex items-center justify-center text-amber-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-medium text-slate-500">Não iniciados</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.naoIniciado}
            </span>
          </div>
        </button>

        {/* Em Andamento */}
        <button
          type="button"
          onClick={() => onSelectFilter('em_andamento')}
          className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'em_andamento'
              ? 'bg-blue-50/60 border-blue-200 ring-1 ring-blue-300'
              : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/70'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-700 shrink-0">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-medium text-slate-500">Em andamento</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.emAndamento}
            </span>
          </div>
        </button>

        {/* Concluídos */}
        <button
          type="button"
          onClick={() => onSelectFilter('concluido')}
          className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
            selectedFilter === 'concluido'
              ? 'bg-emerald-50/60 border-emerald-200 ring-1 ring-emerald-300'
              : 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/70'
          }`}
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-medium text-slate-500">Concluídos</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {stats.concluido}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
