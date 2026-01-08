// src/utils/dateUtils.ts
import { format } from 'date-fns';
import { CalendarEvent } from '@/types';

/**
 * 특정 날짜에 해당하는 실제 이벤트들을 필터링합니다.
 */
export const getEventsForDate = (events: CalendarEvent[], targetDate: Date): CalendarEvent[] => {
  const dateStr = format(targetDate, 'yyyy-MM-dd');
  return events.filter((event) => event.date === dateStr);
};