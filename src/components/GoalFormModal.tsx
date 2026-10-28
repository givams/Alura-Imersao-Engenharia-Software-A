import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, Target, HelpCircle, Check } from 'lucide-react';
import { StudyGoal, GoalFormData, GoalStatus } from '../types/studyGoal';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  goalToEdit: StudyGoal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  goalToEdit,
}) => {
  const isEditing = Boolean(goalToEdit);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');

  // Validation State
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});
  const [touched, setTouched] = useState<{ title?: boolean }>({});

  // Reset or fill form when modal opens or goalToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (goalToEdit) {
        setTitle(goalToEdit.title);
        setDescription(goalToEdit.description || '');
        setDeadline(goalToEdit.deadline || '');
        setStatus(goalToEdit.status);
      } else {
        // Default: 7 days from today
        const defaultDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        setTitle('');
        setDescription('');
        setDeadline(defaultDeadline);
        setStatus('nao_iniciado');
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, goalToEdit]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Por favor, informe o título do seu objetivo de estudo.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres para ser claro.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true });

    if (!validate()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline,
      status: status,
    });
  };

  // Quick title suggestions for beginner inspiration
  const applySuggestion = (suggestedTitle: string, suggestedDesc: string) => {
    setTitle(suggestedTitle);
    setDescription(suggestedDesc);
    setErrors(prev => ({ ...prev, title: undefined }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-headline" className="text-base font-bold text-slate-900">
                {isEditing ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Atualize os dados da sua meta de aprendizado.'
                  : 'Defina o que você quer aprender com passos simples e claros.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar formulário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Campo Título */}
          <div>
            <label htmlFor="goal-title" className="block text-xs font-semibold text-slate-700 mb-1">
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (touched.title) {
                  if (e.target.value.trim().length >= 3) {
                    setErrors(prev => ({ ...prev, title: undefined }));
                  }
                }
              }}
              onBlur={() => {
                setTouched(prev => ({ ...prev, title: true }));
                validate();
              }}
              placeholder="Ex.: Aprender a estruturar tabelas em HTML"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.title && touched.title
                  ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-500'
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.title && touched.title ? (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.title}</p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-500">
                Seja direto e específico no que você deseja conquistar.
              </p>
            )}
          </div>

          {/* Sugestões Rápidas (Aparecem apenas na criação) */}
          {!isEditing && (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ideias para começar (clique para preencher):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    applySuggestion(
                      'Praticar algoritmos básicos por 30 minutos',
                      'Resolver 3 exercícios de lógica condicional para treinar raciocínio lógico.'
                    )
                  }
                  className="text-[11px] bg-white border border-indigo-200 text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100/60 transition-colors text-left cursor-pointer"
                >
                  ⚡ 30 min de Lógica
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applySuggestion(
                      'Ler capítulo 2 de banco de dados relacional',
                      'Anotar conceitos de chaves primárias e estrangeiras em um resumo.'
                    )
                  }
                  className="text-[11px] bg-white border border-indigo-200 text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100/60 transition-colors text-left cursor-pointer"
                >
                  📖 Leitura de Banco de Dados
                </button>
                <button
                  type="button"
                  onClick={() =>
                    applySuggestion(
                      'Construir formulário acessível em React',
                      'Implementar validações de inputs e acessibilidade via leitor de tela.'
                    )
                  }
                  className="text-[11px] bg-white border border-indigo-200 text-indigo-800 px-2 py-1 rounded-md hover:bg-indigo-100/60 transition-colors text-left cursor-pointer"
                >
                  💻 Prática de Front-end
                </button>
              </div>
            </div>
          )}

          {/* Campo Descrição */}
          <div>
            <label htmlFor="goal-desc" className="block text-xs font-semibold text-slate-700 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="goal-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva materiais de estudo, tópicos a cobrir ou o que considerar concluído..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Grid de Prazo e Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prazo */}
            <div>
              <label htmlFor="goal-deadline" className="block text-xs font-semibold text-slate-700 mb-1">
                Prazo Estimado
              </label>
              <div className="relative">
                <input
                  id="goal-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 cursor-pointer"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Definir uma data ajuda a manter a disciplina diária.
              </p>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="goal-status" className="block text-xs font-semibold text-slate-700 mb-1">
                Status Atual
              </label>
              <select
                id="goal-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 cursor-pointer"
              >
                <option value="nao_iniciado">🕒 Não iniciado</option>
                <option value="em_andamento">⏳ Em andamento</option>
                <option value="concluido">✅ Concluído</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                Você pode atualizar conforme for avançando.
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm shadow-indigo-100 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
