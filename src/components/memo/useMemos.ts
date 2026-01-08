"use client";

import { useState, useEffect } from 'react';

export const useMemos = () => {
  const [memo, setMemo] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedMemo = localStorage.getItem('glass-calendar-memo');
    if (savedMemo) setMemo(savedMemo);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('glass-calendar-memo', memo);
    }
  }, [memo, isInitialized]);

  return { memo, setMemo };
};