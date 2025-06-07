import { useMemo } from 'react';

/**
 * Hook personalizado para formatar datas de forma consistente
 * 
 * @param date - Data a ser formatada (padrão: data atual)
 * @returns Objeto com as partes da data formatada
 */
export function useFormattedDate(date: Date = new Date()) {
  return useMemo(() => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    
    return { day, month, year, formatted };
  }, [date]);
}
