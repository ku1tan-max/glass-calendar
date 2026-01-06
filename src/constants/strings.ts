// src/constants/strings.ts

export const STRINGS = {
  APP_TITLE: "Glass Calendar",
  
  // 상단 바
  TOPBAR: {
    FOCUS: "집중 모드", // 혹은 "정신 수양"
    TODO: "할 일 추가", // 혹은 "하명 하기"
    MEMO: "메모장",     // 혹은 "비 망 록"
  },

  // 윈도우 제어 (툴팁이나 확인창 등에 사용)
  WINDOW: {
    CLOSE_CONFIRM: "정말 떠나시겠습니까? 아직 할 일이 산더미입니다만.",
    MINIMIZE: "잠시 숨기",
    SETTINGS: "환경 설정",
    CLOSE: "종료", // [해결] TopBar.tsx에서 참조하는 CLOSE 키 추가
  },

  // 인사말 / 상태 메시지 (랜덤 출력용 배열로 확장 가능)
  GREETING: {
    DEFAULT: "오늘은 법도를 어긴 놈이 없군.",
    MORNING: "일어나시오, 용사여.",
    NIGHT: "아직도 안 자고 무엇을 하느냐.",
  },

  // 버튼 텍스트
  BUTTON: {
    CONFIRM: "실행",
    CANCEL: "취소",
  }
} as const;