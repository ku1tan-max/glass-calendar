import { useState, useCallback, useEffect } from 'react';
import { CalendarEvent } from '@/types';

/**
 * useEvents: 앱 전체의 일정 및 할 일을 중앙 집중 관리하는 커스텀 훅
 * (로컬 스토리지 연동 기능이 추가된 최종 버전)
 */
export const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. [불러오기] 컴포넌트가 처음 뜰 때 로컬 스토리지에서 데이터를 가져옴
  useEffect(() => {
    const savedEvents = localStorage.getItem('glass-calendar-events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error("데이터 파싱 오류:", error);
      }
    }
    setIsInitialized(true); 
  }, []);

  // 2. [저장하기] 데이터가 바뀔 때마다 로컬 스토리지에 자동 저장
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('glass-calendar-events', JSON.stringify(events));
    }
  }, [events, isInitialized]);

  // --- 기존 로직 유지 ---
  
  const addEvent = useCallback((newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const toggleEvent = useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
      )
    );
  }, []);

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