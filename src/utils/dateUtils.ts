// src/utils/dateUtils.ts
import { format } from 'date-fns';
import { CalendarEvent } from '@/types';

/**
 * [구조 재설계] 더 이상 가상 일정을 계산하지 않습니다.
 * 단순히 events 배열에서 해당 날짜와 일치하는 '진짜' 데이터만 반환합니다.
 */
export const getEventsForDate = (events: CalendarEvent[], targetDate: Date): CalendarEvent[] => {
  const dateStr = format(targetDate, 'yyyy-MM-dd');
  return events.filter((event) => event.date === dateStr);
};