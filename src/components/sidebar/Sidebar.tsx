"use client";

import React from 'react';
import { Pin, Clock } from 'lucide-react';
import GlassWrapper from '@/components/layout/GlassWrapper';
import TodoList from './TodoList';
import { useEventsContext } from '@/context/EventsContext';

const Sidebar: React.FC = () => {
  const { isTimerRunning, timerTime, pinnedMemo } = useEventsContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <aside className="w-80 flex flex-col h-full z-10 shrink-0">
      {/* [수정] bg-white/25 중복 제거: GlassWrapper의 glass-effect가 이미 해당 배경색을 globals.css에서 적용하고 있음 */}
      <GlassWrapper className="flex flex-col h-full p-6 border-white/30 overflow-hidden shadow-2xl">
        
        {/* Pinned Section */}
        {(isTimerRunning || pinnedMemo) && (
          <div className="mb-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Pin size={10} /> Pinned
            </span>
            <div className="flex flex-col gap-2">
              {isTimerRunning && (
                <div className="flex items-center justify-between bg-slate-900/5 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-600" />
                    <span className="text-xs font-bold text-slate-700">Focus Session</span>
                  </div>
                  <span className="text-sm font-black tabular-nums">{formatTime(timerTime)}</span>
                </div>
              )}
              {pinnedMemo && (
                <div className="bg-white/20 p-3 rounded-xl border border-white/20 shadow-sm">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">"{pinnedMemo}"</p>
                </div>
              )}
            </div>
            <div className="h-[1px] bg-slate-900/5 my-2" />
          </div>
        )}

        <div className="mb-4 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Task Overview</span>
          <h2 className="text-2xl font-black text-slate-900">Today</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <TodoList />
        </div>
      </GlassWrapper>
    </aside>
  );
};

export default Sidebar;