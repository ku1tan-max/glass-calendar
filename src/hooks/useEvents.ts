import { useState, useCallback } from 'react';
import { CalendarEvent } from '@/types';

/**
 * useEvents: 앱 전체의 일정 및 할 일을 중앙 집중 관리하는 커스텀 훅
 */
export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 1. 일정 추가
  const addEvent = useCallback((newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  // 2. 일정 삭제
  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  // 3. 완료 여부 토글 (투두 리스트 체크용)
  const toggleEvent = useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
      )
    );
  }, []);

  // 4. 특정 날짜의 일정 필터링
  const getEventsByDate = useCallback((date: string) => {
    return events.filter((event) => event.date === date);
  }, [events]);

  return {
    events,
    addEvent,
    deleteEvent,
    toggleEvent,
    getEventsByDate,
  };
};