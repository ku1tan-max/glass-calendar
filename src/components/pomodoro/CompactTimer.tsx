"use client";

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoro } from '@/hooks/usePomodoro';

const CompactTimer = () => {
  // [명칭 통일] 전역 상태와 일치시킨 변수명 사용
  const { 
    timerTime, 
    isTimerRunning, 
    pomodoroMode, 
    toggleTimer, 
    resetTimer 
  } = usePomodoro();

  // 초 단위를 MM:SS로 변환
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isWork = pomodoroMode === 'work';

  return (
    <div className="p-4 rounded-[1.5rem] bg-white/40 border border-white/60 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${isWork ? 'text-rose-500' : 'text-emerald-500'}`}>
          {isWork ? 'Focus' : 'Break'}
        </span>
        <button 
          onClick={resetTimer}
          className="text-slate-300 hover:text-slate-500 transition-colors"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-3xl font-black font-mono tracking-tighter text-slate-800">
          {formatTime(timerTime)}
        </div>

        <button
          onClick={toggleTimer}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            isTimerRunning 
            ? 'bg-slate-100 text-slate-600' 
            : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
          }`}
        >
          {isTimerRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
};

export default CompactTimer;