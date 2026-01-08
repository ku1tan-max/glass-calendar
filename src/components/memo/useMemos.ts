// src/components/memo/useMemos.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Memo } from '@/types';

export const useMemos = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('glass-calendar-memos');
    if (saved) setMemos(JSON.parse(saved));
    setIsInitialized(true);
  }, []);

  // 데이터 변경 시 저장
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('glass-calendar-memos', JSON.stringify(memos));
    }
  }, [memos, isInitialized]);

  const addMemo = useCallback((content: string) => {
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      content,
      updatedAt: new Date().toISOString(),
      isPinned: false
    };
    setMemos(prev => [newMemo, ...prev]);
    return newMemo;
  }, []);

  const updateMemo = useCallback((id: string, content: string) => {
    setMemos(prev => prev.map(m => 
      m.id === id ? { ...m, content, updatedAt: new Date().toISOString() } : m
    ));
  }, []);

  const deleteMemo = useCallback((id: string) => {
    setMemos(prev => prev.filter(m => m.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setMemos(prev => prev.map(m => 
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    ));
  }, []);

  return { memos, addMemo, updateMemo, deleteMemo, togglePin };
};