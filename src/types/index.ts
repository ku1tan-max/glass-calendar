// src/types/index.ts

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm (필수 속성으로 확정하여 오류 방지)
  categoryId: string;     // 카테고리 ID (색상 조회용)
  category: string;       // 카테고리 이름
  color: string;          // 카테고리 색상 (직접 참조용)
  isCompleted: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

// 기본 카테고리 데이터 (id와 color를 일치시켜 직관성 확보)
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_red', name: '긴급', color: '#ef4444' },
  { id: 'cat_blue', name: '일반', color: '#3b82f6' },
  { id: 'cat_green', name: '성공', color: '#10b981' },
];