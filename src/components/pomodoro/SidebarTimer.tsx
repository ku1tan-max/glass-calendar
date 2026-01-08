"use client";

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoro } from '@/hooks/usePomodoro';

const SidebarTimer = () => {
  const { timeLeft, mode, isActive, toggleTimer, resetTimer } = usePomodoro();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 모드별 포인트 컬러
  const modeColor = mode === 'work' ? 'text-rose-500' : 'text-emerald-500';

  return (
    <div className="mx-4 mb-6 p-4 rounded-2xl bg-white/50 border border-white/80 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-black uppercase tracking-widest ${modeColor}`}>
          {mode === 'work' ? 'Focus' : 'Break'}
        </span>
        <button onClick={resetTimer} className="text-slate-400 hover:text-slate-600 transition-colors">
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-2xl font-black font-mono tracking-tighter text-slate-800">
          {formatTime(timeLeft)}
        </div>

        <button
          onClick={toggleTimer}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
            isActive 
            ? 'bg-slate-100 text-slate-600' 
            : 'bg-blue-600 text-white shadow-md shadow-blue-100'
          }`}
        >
          {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
};

export default SidebarTimer;