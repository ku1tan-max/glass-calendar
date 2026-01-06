"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CalendarEvent } from '@/types';

interface EventsContextType {
  // --- 기존 캘린더 프로퍼티 ---
  events: CalendarEvent[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEvent: (newEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  toggleEvent: (id: string) => void;
  getEventsByDate: (date: string) => CalendarEvent[];

  // --- 추가된 타이머 및 메모 상태 ---
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
  timerTime: number; 
  setTimerTime: (val: number | ((prev: number) => number)) => void;
  pinnedMemo: string | null;
  setPinnedMemo: (memo: string | null) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. 기존 상태들
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isInitialized, setIsInitialized] = useState(false);

  // 2. 추가된 상태들 (타이머, 메모)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60); // 기본 25분
  const [pinnedMemo, setPinnedMemo] = useState<string | null>(null);

  // 로컬 스토리지 데이터 로드 (기존 로직)
  useEffect(() => {
    const savedEvents = localStorage.getItem('glass-calendar-events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // 데이터 변경 시 로컬 스토리지 업데이트 (기존 로직)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('glass-calendar-events', JSON.stringify(events));
    }
  }, [events, isInitialized]);

  // --- 기존 함수들 유지 ---
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

  return (
    <EventsContext.Provider value={{
      events,
      selectedDate,
      setSelectedDate,
      addEvent,
      deleteEvent,
      toggleEvent,
      getEventsByDate,
      // 새롭게 추가된 값들 전달
      isTimerRunning,
      setIsTimerRunning,
      timerTime,
      setTimerTime,
      pinnedMemo,
      setPinnedMemo
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
};