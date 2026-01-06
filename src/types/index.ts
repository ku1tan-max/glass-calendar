/**
 * Glass Calendar 프로젝트의 핵심 데이터 규격 정의
 */

// 1. 캘린더 이벤트 및 할 일 통합 인터페이스
export interface CalendarEvent {
  id: string;             // 고유식별자 (UUID 등)
  title: string;          // 일정/할 일 제목
  date: string;           // 날짜 형식: YYYY-MM-DD
  time?: string;          // 시간 (선택사항, 예: 14:00)
  category: string;       // 카테고리 (Work, Personal, Study 등)
  color: string;          // UI에 표시될 색상 (Hex 코드 또는 Tailwind 클래스명)
  isCompleted: boolean;   // 완료 여부 (투두 리스트 연동용)
  description?: string;   // 상세 설명 (선택사항)
}

// 2. 포모도로 상태 타입 (추후 기능 구현 시 참조)
export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

// 3. 앱 테마 관련 타입 (설정 모달용)
export interface AppSettings {
  blurAmount: number;
  bgImage: string | null;
  focusMode: boolean;
}