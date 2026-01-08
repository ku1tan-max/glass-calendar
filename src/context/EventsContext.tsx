"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CalendarEvent, Category, DEFAULT_CATEGORIES } from '@/types';
import { format } from 'date-fns';

// 포모도로 모드 타입 정의
export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

interface EventsContextType {
  events: CalendarEvent[];
  categories: Category[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEvent: (newEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  toggleEvent: (id: string, date?: Date) => void; // date 인자 유지
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getCategoryColor: (categoryId: string) => string;
  
  // [기존 변수명 엄수]
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
  timerTime: number; 
  setTimerTime: React.Dispatch<React.SetStateAction<number>>;
  pinnedMemo: string | null;
  setPinnedMemo: (memo: string | null) => void;
  
  // [포모도로 연동 추가]
  pomodoroMode: PomodoroMode;
  setPomodoroMode: (mode: PomodoroMode) => void;
  sessionsCompleted: number;
  setSessionsCompleted: React.Dispatch<React.SetStateAction<number>>;

  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // [기존 변수명 유지]
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60);
  const [pinnedMemo, setPinnedMemo] = useState<string | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // [추가 상태]
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // 1. LocalStorage 로드
  useEffect(() => {
    const savedEvents = localStorage.getItem('glass-calendar-events');
    const savedCategories = localStorage.getItem('glass-calendar-categories');
    const savedPinnedMemo = localStorage.getItem('glass-pinned-memo');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedPinnedMemo) setPinnedMemo(savedPinnedMemo);
  }, []);

  // 2. 데이터 변경 시 저장
  useEffect(() => {
    localStorage.setItem('glass-calendar-events', JSON.stringify(events));
  }, [events]);

  const addEvent = useCallback((newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  /**
   * [검수 지시 사항] 가상 일정 인스턴스화 및 ID 절삭 로직 유지
   */
  const toggleEvent = useCallback((id: string, date?: Date) => {
    setEvents((prev) => {
      const existingIndex = prev.findIndex((e) => e.id === id);

      if (existingIndex !== -1) {
        // 실존 데이터: 상태 반전
        return prev.map((e, i) => i === existingIndex ? { ...e, isCompleted: !e.isCompleted } : e);
      }

      // 가상 데이터: 실제 데이터로 변환
      if (!date) return prev;
      const dateStr = format(date, 'yyyy-MM-dd');
      const lastDashIndex = id.lastIndexOf(`-${dateStr}`);
      if (lastDashIndex === -1) return prev;
      
      const originalId = id.substring(0, lastDashIndex);
      const template = prev.find(t => t.id === originalId);

      if (!template) return prev;

      const newInstance: CalendarEvent = {
        ...template,
        id: id,
        date: dateStr,
        isCompleted: true, 
        recurrence: 'none'
      };

      return [...prev, newInstance];
    });
  }, []);

  const addCategory = (category: Category) => setCategories(prev => [...prev, category]);
  const deleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));
  const getCategoryColor = (categoryId: string) => categories.find(c => c.id === categoryId)?.color || '#94A3B8';

  return (
    <EventsContext.Provider value={{
      events, categories, selectedDate, setSelectedDate,
      addEvent, deleteEvent, toggleEvent,
      addCategory, deleteCategory, getCategoryColor,
      isTimerRunning, setIsTimerRunning, timerTime, setTimerTime,
      pinnedMemo, setPinnedMemo,
      pomodoroMode, setPomodoroMode,
      sessionsCompleted, setSessionsCompleted,
      isEventModalOpen, setIsEventModalOpen,
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) throw new Error("useEventsContext must be used within an EventsProvider");
  return context;
};