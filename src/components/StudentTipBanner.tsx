import React, { useState } from 'react';
import { Lightbulb, ChevronRight, X } from 'lucide-react';

const TIPS = [
  {
    title: 'Dica de Ouro: Metas Pequenas',
    description: 'Em vez de "Aprender Programação", defina "Fazer 3 exercícios de variáveis hoje". O cérebro adora pequenas vitórias!',
  },
  {
    title: 'Técnica Pomodoro para Iniciantes',
    description: 'Estude focado por 25 minutos e descanse 5 minutos. Isso evita o cansaço mental precoce.',
  },
  {
    title: 'Consistência vence a intensidade',
    description: '30 minutos de estudo todos os dias geram mais retenção de aprendizado do que 5 horas uma única vez na semana.',
  },
  {
    title: 'Explique para fixar',
    description: 'Tente explicar em voz alta o que você acabou de ler como se estivesse ensinando para alguém iniciante.',
  },
];

export const StudentTipBanner: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const currentTip = TIPS[currentTipIndex];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-6 relative transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Guia do Estudante Iniciante
              </span>
              <span className="text-[11px] text-amber-700/80 font-mono tabular-nums">
                ({currentTipIndex + 1}/{TIPS.length})
              </span>
            </div>
            <h4 className="text-sm font-bold text-amber-950 mt-0.5">
              {currentTip.title}
            </h4>
            <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
              {currentTip.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={nextTip}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
            title="Próxima dica"
          >
            <span>Próxima</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="p-1 text-amber-800/60 hover:text-amber-950 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
            title="Dispensar dica"
            aria-label="Dispensar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
