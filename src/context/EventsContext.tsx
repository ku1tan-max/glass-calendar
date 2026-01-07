"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CalendarEvent, Category, DEFAULT_CATEGORIES } from '@/types';

interface EventsContextType {
  events: CalendarEvent[];
  categories: Category[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addEvent: (newEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  toggleEvent: (id: string) => void;
  
  // 카테고리 관련 함수
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getCategoryColor: (categoryId: string) => string;

  // 타이머 및 메모 상태
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
  timerTime: number; 
  setTimerTime: (val: number | ((prev: number) => number)) => void;
  pinnedMemo: string | null;
  setPinnedMemo: (memo: string | null) => void;

  // [추가] 모달 상태 및 제어 함수
  isEventModalOpen: boolean;
  setIsEventModalOpen: (isOpen: boolean) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(25 * 60);
  const [pinnedMemo, setPinnedMemo] = useState<string | null>(null);

  // [추가] 모달 전역 상태 선언
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // 로컬 스토리지 로드
  useEffect(() => {
    const savedEvents = localStorage.getItem('glass-calendar-events');
    const savedCategories = localStorage.getItem('glass-calendar-categories');
    const savedPinnedMemo = localStorage.getItem('glass-pinned-memo');

    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedPinnedMemo) setPinnedMemo(savedPinnedMemo);
  }, []);

  // 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('glass-calendar-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('glass-calendar-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (pinnedMemo) localStorage.setItem('glass-pinned-memo', pinnedMemo);
    else localStorage.removeItem('glass-pinned-memo');
  }, [pinnedMemo]);

  const addEvent = useCallback((newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const toggleEvent = useCallback((id: string) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
  }, []);

  const addCategory = (category: Category) => setCategories(prev => [...prev, category]);
  const deleteCategory = (id: string) => setCategories(prev => prev.filter(c => c.id !== id));
  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || '#94A3B8';
  };

  return (
    <EventsContext.Provider value={{
      events, categories, selectedDate, setSelectedDate,
      addEvent, deleteEvent, toggleEvent,
      addCategory, deleteCategory, getCategoryColor,
      isTimerRunning, setIsTimerRunning, timerTime, setTimerTime,
      pinnedMemo, setPinnedMemo,
      // [추가] Provider에 값 전달
      isEventModalOpen,
      setIsEventModalOpen,
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