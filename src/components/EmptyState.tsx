import React from 'react';
import { BookOpen, Plus, SearchX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onOpenCreateModal: () => void;
  onClearFilters?: () => void;
  onLoadSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onOpenCreateModal,
  onClearFilters,
  onLoadSamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-md mx-auto my-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Nenhum objetivo encontrado
        </h3>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          Não encontramos objetivos com o termo ou filtro selecionado. Tente alterar sua pesquisa.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 text-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        Nenhum objetivo cadastrado ainda
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
        Começar uma rotina de estudos é mais fácil quando dividimos o aprendizado em metas pequenas e alcançáveis.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Cadastrar Primeiro Objetivo</span>
        </button>

        {onLoadSamples && (
          <button
            type="button"
            onClick={onLoadSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Carregar Exemplos de Estudo</span>
          </button>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-left">
        <div className="p-2">
          <span className="block text-xs font-bold text-slate-800">1. Cadastre</span>
          <span className="text-[11px] text-slate-500">Defina o que quer aprender hoje.</span>
        </div>
        <div className="p-2">
          <span className="block text-xs font-bold text-slate-800">2. Acompanhe</span>
          <span className="text-[11px] text-slate-500">Mude o status com um clique.</span>
        </div>
        <div className="p-2">
          <span className="block text-xs font-bold text-slate-800">3. Conquiste</span>
          <span className="text-[11px] text-slate-500">Veja seu progresso crescer.</span>
        </div>
      </div>
    </div>
  );
};
