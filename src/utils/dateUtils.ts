export function formatDatePtBR(dateString: string): string {
  if (!dateString) return 'Sem prazo definido';
  try {
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
}

export interface DeadlineInfo {
  text: string;
  isOverdue: boolean;
  isToday: boolean;
  daysRemaining: number;
}

export function getDeadlineInfo(dateString: string, isCompleted: boolean): DeadlineInfo {
  if (!dateString) {
    return { text: 'Sem data', isOverdue: false, isToday: false, daysRemaining: 0 };
  }

  if (isCompleted) {
    return {
      text: `Prazo: ${formatDatePtBR(dateString)}`,
      isOverdue: false,
      isToday: false,
      daysRemaining: 0,
    };
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const target = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      text: overdueDays === 1 ? 'Atrasado há 1 dia' : `Atrasado há ${overdueDays} dias`,
      isOverdue: true,
      isToday: false,
      daysRemaining: diffDays,
    };
  }

  if (diffDays === 0) {
    return {
      text: 'Prazo vence hoje!',
      isOverdue: false,
      isToday: true,
      daysRemaining: 0,
    };
  }

  if (diffDays === 1) {
    return {
      text: 'Vence amanhã',
      isOverdue: false,
      isToday: false,
      daysRemaining: 1,
    };
  }

  return {
    text: `Faltam ${diffDays} dias`,
    isOverdue: false,
    isToday: false,
    daysRemaining: diffDays,
  };
}
