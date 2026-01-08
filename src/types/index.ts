// src/types/index.ts

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;           // 시작일 (YYYY-MM-DD)
  endDate?: string;       // [New] 반복 종료일 (YYYY-MM-DD)
  time: string;           
  categoryId: string;     
  category: string;       
  color: string;          
  isCompleted: boolean;
  description?: string;
  recurrence?: RecurrenceType; 
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_red', name: '긴급', color: '#ef4444' },
  { id: 'cat_blue', name: '일반', color: '#3b82f6' },
  { id: 'cat_green', name: '성공', color: '#10b981' },
];

export interface Memo {
  id: string;
  content: string;
  updatedAt: string; // ISO String
  isPinned: boolean;
}