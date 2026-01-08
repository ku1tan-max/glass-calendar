"use client";

import { useEffect, useCallback } from 'react';
import { useEventsContext, PomodoroMode } from '@/context/EventsContext';

export const usePomodoro = () => {
  const { 
    timerTime, setTimerTime, 
    isTimerRunning, setIsTimerRunning,
    pomodoroMode, setPomodoroMode,
    sessionsCompleted, setSessionsCompleted 
  } = useEventsContext();

  // 설정값 (초 단위)
  const CONFIG = { 
    work: 25 * 60, 
    short: 5 * 60, 
    long: 15 * 60,
    interval: 4 // 4회차마다 긴 휴식
  };

  /**
   * [보완] 시스템 알림 발송 함수
   */
  const sendNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }, []);

  /**
   * [보완] 알림 권한 요청 (앱 실행 시 최초 1회)
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  /**
   * 모드 전환 로직 (작업 <-> 휴식)
   */
  const switchMode = useCallback(() => {
    if (pomodoroMode === 'work') {
      const nextCount = sessionsCompleted + 1;
      setSessionsCompleted(nextCount);

      if (nextCount % CONFIG.interval === 0) {
        setPomodoroMode('longBreak');
        setTimerTime(CONFIG.long);
        sendNotification('집행 완료! 긴 휴식', '대단합니다! 15분간 충분히 휴식하세요.');
      } else {
        setPomodoroMode('shortBreak');
        setTimerTime(CONFIG.short);
        sendNotification('집행 완료! 짧은 휴식', '5분간 숨을 돌리세요.');
      }
    } else {
      setPomodoroMode('work');
      setTimerTime(CONFIG.work);
      sendNotification('휴식 종료! 다시 집중', '새로운 집중 세션을 시작합니다.');
    }
    setIsTimerRunning(false); // 전환 시 타이머는 일단 정지
  }, [pomodoroMode, sessionsCompleted, setTimerTime, setIsTimerRunning, setPomodoroMode, setSessionsCompleted, sendNotification]);

  /**
   * 1초마다 카운트다운 실행
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(prev => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      switchMode();
    }
    
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerRunning, timerTime, switchMode, setTimerTime]);

  return {
    timeLeft: timerTime,
    mode: pomodoroMode,
    isActive: isTimerRunning,
    sessionsCompleted,
    toggleTimer: () => setIsTimerRunning(!isTimerRunning),
    resetTimer: () => {
      setIsTimerRunning(false);
      setPomodoroMode('work');
      setTimerTime(CONFIG.work);
      setSessionsCompleted(0);
    },
    // UI 프로그레스 바 계산용 (현재 시간 / 전체 시간)
    percent: (timerTime / (pomodoroMode === 'work' ? CONFIG.work : pomodoroMode === 'short' ? CONFIG.short : CONFIG.long)) * 100
  };
};