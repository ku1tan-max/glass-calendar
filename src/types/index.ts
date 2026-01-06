// src/types/index.ts

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;           // YYYY-MM-DD
  time?: string;          // HH:mm (선택적 속성 유지)
  categoryId: string;     // 커스텀 카테고리 연동을 위한 ID
  category: string;       // 표시용 카테고리 이름 (기존 로직 호환)
  color: string;          // 표시용 색상 (기존 로직 호환)
  isCompleted: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

// 기본 카테고리 데이터 정의
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_red', name: '긴급', color: '#ef4444' },
  { id: 'cat_blue', name: '일반', color: '#3b82f6' },
  { id: 'cat_green', name: '성공', color: '#10b981' },
];