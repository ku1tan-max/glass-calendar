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

  // [참조 무결성] 데이터 변경 시 localStorage 즉시 동기화
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('glass-calendar-memos', JSON.stringify(memos));
    }
  }, [memos, isInitialized]);

  // 메모 추가
  const addMemo = useCallback((content: string) => {
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      content,
      updatedAt: new Date().toISOString(),
      isPinned: false
    };
    setMemos(prev => [newMemo, ...prev]);
  }, []);

  // [수정 요구사항 반영] 메모 내용 수정 시 전체 객체 상태 업데이트
  const updateMemo = useCallback((id: string, content: string) => {
    setMemos(prev => prev.map(m => 
      m.id === id ? { ...m, content, updatedAt: new Date().toISOString() } : m
    ));
  }, []);

  // 메모 삭제
  const deleteMemo = useCallback((id: string) => {
    setMemos(prev => prev.filter(m => m.id !== id));
  }, []);

  // 핀 상태 토글
  const togglePin = useCallback((id: string) => {
    setMemos(prev => prev.map(m => 
      m.id === id ? { ...m, isPinned: !m.isPinned } : m
    ));
  }, []);

  return { memos, addMemo, updateMemo, deleteMemo, togglePin };
};