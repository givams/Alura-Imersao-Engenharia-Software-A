import React from 'react';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  totalGoals: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, totalGoals }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              StudyFlow
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500">
              Planejador de Estudos
            </span>
          </div>
        </div>

        {/* Central message / subtle motivation */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Dê o próximo passo no seu aprendizado, um dia de cada vez</span>
        </div>

        {/* Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm shadow-indigo-100 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
