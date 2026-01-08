"use client";

import { useEffect, useCallback } from 'react';
import { useEventsContext } from '@/context/EventsContext';

export const usePomodoro = () => {
  const { 
    timerTime, setTimerTime, 
    isTimerRunning, setIsTimerRunning,
    pomodoroMode, setPomodoroMode,
    sessionsCompleted, setSessionsCompleted 
  } = useEventsContext();

  const CONFIG = { 
    work: 25 * 60, 
    short: 5 * 60, 
    long: 15 * 60,
    interval: 4 
  };

  /**
   * [보완] 시스템 알림 발송 (꼬임 방지를 위해 단순화 유지)
   */
  const sendNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }, []);

  /**
   * 모드 전환 로직
   */
  const switchMode = useCallback(() => {
    if (pomodoroMode === 'work') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);

      if (nextCount % CONFIG.interval === 0) {
        setPomodoroMode('longBreak');
        setTimerTime(CONFIG.long);
        sendNotification('집행 완료', '긴 휴식을 시작합니다.');
      } else {
        setPomodoroMode('shortBreak');
        setTimerTime(CONFIG.short);
        sendNotification('집행 완료', '짧은 휴식을 시작합니다.');
      }
    } else {
      setPomodoroMode('work');
      setTimerTime(CONFIG.work);
      sendNotification('휴식 종료', '다시 집중할 시간입니다.');
    }
    setIsTimerRunning(false);
  }, [pomodoroMode, sessionsCompleted, setTimerTime, setIsTimerRunning, setPomodoroMode, setSessionsCompleted, sendNotification]);

  /**
   * 타이머 핵심 엔진
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      switchMode();
    }
    
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerRunning, timerTime, switchMode, setTimerTime]);

  return {
    // [명칭 엄수] Context의 변수명을 그대로 UI에 전달
    timerTime,
    isTimerRunning,
    pomodoroMode,
    sessionsCompleted,
    toggleTimer: () => setIsTimerRunning(!isTimerRunning),
    resetTimer: () => {
      setIsTimerRunning(false);
      setPomodoroMode('work');
      setTimerTime(CONFIG.work);
      setSessionsCompleted(0);
    },
    // 진행률 계산 로직 (UI에서 사용)
    percent: (timerTime / (pomodoroMode === 'work' ? CONFIG.work : pomodoroMode === 'shortBreak' ? CONFIG.short : CONFIG.long)) * 100
  };
};