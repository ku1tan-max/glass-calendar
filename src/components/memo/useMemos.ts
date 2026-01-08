// src/components/memo/useMemos.ts
"use client";

import { useEventsContext } from '@/context/EventsContext';

export const useMemos = () => {
  const { memos, addMemo, updateMemo, deleteMemo, togglePin } = useEventsContext();

  return {
    memos,
    addMemo,
    updateMemo,
    deleteMemo,
    togglePin
  };
};