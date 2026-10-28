import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { StudyGoal } from '../types/studyGoal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  goal: StudyGoal | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  goal,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 id="delete-dialog-title" className="text-base font-bold text-slate-900">
                Confirmar exclusão de objetivo
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Tem certeza de que deseja excluir permanentemente o objetivo:{' '}
                <strong className="text-slate-900 font-semibold block mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  "{goal.title}"
                </strong>
              </p>
              <p className="mt-2 text-xs text-rose-600 font-medium">
                Esta ação não poderá ser desfeita.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onConfirm(goal.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm shadow-rose-100 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Sim, excluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
