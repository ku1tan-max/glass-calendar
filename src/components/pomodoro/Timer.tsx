"use client";

import React from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';
import { usePomodoro } from '@/hooks/usePomodoro';

const Timer = () => {
  // 전역 상태와 연동된 훅 사용
  const { timeLeft, mode, isActive, sessionsCompleted, toggleTimer, resetTimer, percent } = usePomodoro();

  // 초 단위 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 모드별 UI 설정
  const modeConfig = {
    work: { label: '집중 모드', icon: <Target size={16} className="text-rose-500" />, bgColor: 'bg-rose-50' },
    shortBreak: { label: '짧은 휴식', icon: <Coffee size={16} className="text-blue-500" />, bgColor: 'bg-blue-50' },
    longBreak: { label: '긴 휴식', icon: <Coffee size={16} className="text-emerald-500" />, bgColor: 'bg-emerald-50' },
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/50">
      
      {/* 1. 모드 표시 배지 */}
      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/80 shadow-sm ${modeConfig[mode].bgColor} transition-colors duration-500`}>
        {modeConfig[mode].icon}
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {modeConfig[mode].label}
        </span>
      </div>

      {/* 2. 메인 타이머 및 프로그레스 링 영역 */}
      <div className="relative flex items-center justify-center">
        {/* 원형 프로그레스 배경 (SVG) */}
        <svg className="w-64 h-64 transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={754}
            strokeDashoffset={754 - (754 * percent) / 100}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-linear ${
              mode === 'work' ? 'text-blue-500' : 'text-emerald-500'
            }`}
          />
        </svg>

        {/* 중앙 타이머 숫자 */}
        <div className="absolute flex flex-col items-center">
          <span className="text-6xl font-black font-mono tracking-tighter text-slate-800">
            {formatTime(timeLeft)}
          </span>
          {/* 하단 사이클 점 */}
          <div className="flex gap-1.5 mt-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i < (sessionsCompleted % 4) 
                  ? 'bg-blue-500 scale-110 shadow-sm shadow-blue-200' 
                  : 'bg-slate-200'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. 컨트롤 섹션 */}
      <div className="flex items-center gap-6">
        {/* 초기화 버튼 */}
        <button
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 transition-all active:scale-90"
          title="초기화"
        >
          <RotateCcw size={22} />
        </button>
        
        {/* 재생/일시정지 메인 버튼 */}
        <button
          onClick={toggleTimer}
          className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
            isActive 
            ? 'bg-white border border-slate-100 text-slate-800 shadow-slate-200' 
            : 'bg-blue-600 text-white shadow-blue-300 hover:bg-blue-700'
          }`}
        >
          {isActive 
            ? <Pause size={32} fill="currentColor" /> 
            : <Play size={32} fill="currentColor" className="ml-1" />
          }
        </button>

        {/* 정보 표시 더미 (대칭용) */}
        <div className="flex flex-col items-center justify-center w-[54px]">
           <span className="text-[10px] font-black text-slate-300 uppercase leading-none">Total</span>
           <span className="text-lg font-black text-slate-700">{sessionsCompleted}</span>
        </div>
      </div>

      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        Be focused, Stay law.
      </p>
    </div>
  );
};

export default Timer;