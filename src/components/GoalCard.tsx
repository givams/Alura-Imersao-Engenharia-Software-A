import React from 'react';
import {
  Calendar,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { StudyGoal, GoalStatus } from '../types/studyGoal';
import { formatDatePtBR, getDeadlineInfo } from '../utils/dateUtils';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onRequestDelete: (goal: StudyGoal) => void;
  onUpdateStatus: (id: string, newStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onUpdateStatus,
}) => {
  const isCompleted = goal.status === 'concluido';
  const deadlineInfo = getDeadlineInfo(goal.deadline, isCompleted);

  // Status visual cues with accessible dual-coding (icon + text + color)
  const statusConfig = {
    nao_iniciado: {
      label: 'Não iniciado',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: Clock,
      nextStatus: 'em_andamento' as GoalStatus,
      nextActionText: 'Começar agora',
    },
    em_andamento: {
      label: 'Em andamento',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: PlayCircle,
      nextStatus: 'concluido' as GoalStatus,
      nextActionText: 'Concluir',
    },
    concluido: {
      label: 'Concluído',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: CheckCircle2,
      nextStatus: 'em_andamento' as GoalStatus,
      nextActionText: 'Reabrir',
    },
  }[goal.status];

  const StatusIcon = statusConfig.icon;

  return (
    <article
      className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-100 bg-emerald-50/20'
          : deadlineInfo.isOverdue
          ? 'border-rose-200'
          : 'border-slate-200/90'
      }`}
    >
      <div>
        {/* Top line: Status indicator & Deadline info */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
          {/* Status Indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-medium ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}
          >
            <StatusIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{statusConfig.label}</span>
          </div>

          {/* Prazo com indicador amigável de urgência */}
          <div
            className={`flex items-center gap-1.5 font-medium ${
              isCompleted
                ? 'text-slate-400'
                : deadlineInfo.isOverdue
                ? 'text-rose-600 font-semibold'
                : deadlineInfo.isToday
                ? 'text-amber-600 font-semibold'
                : 'text-slate-500'
            }`}
          >
            {deadlineInfo.isOverdue ? (
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            )}
            <span title={`Data limite: ${formatDatePtBR(goal.deadline)}`}>
              {formatDatePtBR(goal.deadline)}
              {goal.deadline && !isCompleted && (
                <span className="text-[11px] opacity-85 ml-1">
                  ({deadlineInfo.text})
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base font-bold leading-snug break-words ${
            isCompleted ? 'text-slate-600 line-through' : 'text-slate-900'
          }`}
        >
          {goal.title}
        </h3>

        {/* Descrição */}
        {goal.description ? (
          <p
            className={`mt-2 text-sm leading-relaxed whitespace-pre-line break-words ${
              isCompleted ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {goal.description}
          </p>
        ) : (
          <p className="mt-2 text-xs italic text-slate-400">
            Nenhuma descrição adicional informada.
          </p>
        )}
      </div>

      {/* Rodapé do Card com Ações */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Ação Rápida de Avanço de Status */}
        <button
          type="button"
          onClick={() => onUpdateStatus(goal.id, statusConfig.nextStatus)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            isCompleted
              ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              : goal.status === 'nao_iniciado'
              ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
          }`}
        >
          {isCompleted ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{statusConfig.nextActionText}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{statusConfig.nextActionText}</span>
            </>
          )}
        </button>

        {/* Ações de Edição e Exclusão */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            title="Editar este objetivo"
            aria-label={`Editar objetivo ${goal.title}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Excluir este objetivo"
            aria-label={`Excluir objetivo ${goal.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
