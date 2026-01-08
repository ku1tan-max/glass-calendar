// src/context/EventsContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CalendarEvent, Category, DEFAULT_CATEGORIES, Memo } from '@/types';
import { addDays, addWeeks, addMonths, addYears, isBefore, isAfter, isSameDay, parseISO, format } from 'date-fns';

interface EventsContextType {
  events: CalendarEvent[];
  categories: Category[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEvent: (newEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  toggleEvent: (id: string) => void;
  
  // 카테고리 관련
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getCategoryColor: (categoryId: string) => string;

  // 타이머 및 포모도로 상태
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
  timerTime: number; 
  setTimerTime: React.Dispatch<React.SetStateAction<number>>;
  pomodoroMode: 'work' | 'shortBreak' | 'longBreak';
  setPomodoroMode: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
  sessionsCompleted: number;
  setSessionsCompleted: React.Dispatch<React.SetStateAction<number>>;

  // 메모 전역 상태
  memos: Memo[];
  addMemo: (content: string) => void;
  updateMemo: (id: string, content: string) => void;
  deleteMemo: (id: string) => void;
  togglePin: (id: string) => void;

  // 모달 제어
  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const savedEvents = localStorage.getItem('glass-calendar-events');
    const savedMemos = localStorage.getItem('glass-calendar-memos');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedMemos) setMemos(JSON.parse(savedMemos));
  }, []);

  // 데이터 변경 시 저장
  useEffect(() => {
    localStorage.setItem('glass-calendar-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('glass-calendar-memos', JSON.stringify(memos));
  }, [memos]);

  /**
   * [선제적 인스턴스화] 반복 일정 생성 로직
   */
  const addEvent = useCallback((newEvent: CalendarEvent) => {
    const { recurrence, date, endDate } = newEvent;

    if (!recurrence || recurrence === 'none') {
      setEvents((prev) => [...prev, newEvent]);
      return;
    }

    const generated: CalendarEvent[] = [];
    const startDate = parseISO(date);
    let targetEndDate = endDate ? parseISO(endDate) : addYears(startDate, 1);
    const limitDate = addYears(startDate, 2); // 최대 2년 제한

    if (isAfter(targetEndDate, limitDate)) targetEndDate = limitDate;

    let current = startDate;
    const baseId = newEvent.id;

    while (isBefore(current, targetEndDate) || isSameDay(current, targetEndDate)) {
      const dateStr = format(current, 'yyyy-MM-dd');
      generated.push({
        ...newEvent,
        id: `${baseId}-${dateStr}`, // 고유 날짜 포함 ID
        date: dateStr,
      });

      if (recurrence === 'daily') current = addDays(current, 1);
      else if (recurrence === 'weekly') current = addWeeks(current, 1);
      else if (recurrence === 'monthly') current = addMonths(current, 1);
      else break;
    }

    setEvents((prev) => [...prev, ...generated]);
  }, []);

  const toggleEvent = useCallback((id: string) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // 메모 관리 함수들
  const addMemo = useCallback((content: string) => {
    const newMemo: Memo = { 
      id: crypto.randomUUID(), 
      content, 
      updatedAt: new Date().toISOString(), 
      isPinned: false 
    };
    setMemos(prev => [newMemo, ...prev]);
  }, []);

  const updateMemo = useCallback((id: string, content: string) => {
    setMemos(prev => prev.map(m => m.id === id ? { ...m, content, updatedAt: new Date().toISOString() } : m));
  }, []);

  const deleteMemo = useCallback((id: string) => {
    setMemos(prev => prev.filter(m => m.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setMemos(prev => prev.map(m => m.id === id ? { ...m, isPinned: !m.isPinned } : m));
  }, []);

  const getCategoryColor = (categoryId: string) => categories.find(c => c.id === categoryId)?.color || '#94A3B8';

  return (
    <EventsContext.Provider value={{
      events, categories, selectedDate, setSelectedDate, addEvent, deleteEvent, toggleEvent,
      getCategoryColor, isTimerRunning, setIsTimerRunning, timerTime, setTimerTime,
      pomodoroMode, setPomodoroMode, sessionsCompleted, setSessionsCompleted,
      memos, addMemo, updateMemo, deleteMemo, togglePin,
      isEventModalOpen, setIsEventModalOpen,
      addCategory: (c) => setCategories(p => [...p, c]),
      deleteCategory: (id) => setCategories(p => p.filter(c => c.id !== id))
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