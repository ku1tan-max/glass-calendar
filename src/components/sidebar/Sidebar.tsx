"use client";

import React from 'react';
import { Pin, Clock } from 'lucide-react';
import GlassWrapper from '@/components/layout/GlassWrapper';
import TodoList from './TodoList';
import { useEventsContext } from '@/context/EventsContext';

// [1. 임의 네이밍 금지] 기존 SidebarProps 명칭 유지
interface SidebarProps {
  // 지시사항에 따라 미사용 Props(onFocusModeToggle, isFocusMode) 제거
}

const Sidebar: React.FC<SidebarProps> = () => {
  // [3. 추측 코딩 금지] 기존 컨텍스트 명칭(useEventsContext) 엄수
  const { isTimerRunning, timerTime, pinnedMemo } = useEventsContext();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <aside className="w-80 flex flex-col h-full z-10 shrink-0">
      {/* [9. 주석을 통한 의도 전달] 
        흰색 네모 박스 추적 결과: GlassWrapper 내부의 glass-effect가 이미 bg-white/25를 포함하므로,
        중복된 bg-white/25를 제거하여 불투명도 겹침 현상을 해결함.
      */}
      <GlassWrapper className="flex flex-col h-full p-6 border-white/30 overflow-hidden shadow-2xl">
        
        {/* Pinned Section: 상태가 있을 때만 등장 (애니메이션 포함) */}
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
                <div className="bg-white/10 p-3 rounded-xl border border-white/20 shadow-sm">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
                    "{pinnedMemo}"
                  </p>
                </div>
              )}
            </div>
            <div className="h-[1px] bg-slate-900/5 my-2" />
          </div>
        )}

        {/* 섹션 타이틀: Today 고정 */}
        <div className="mb-4 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Task Overview
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Today
          </h2>
        </div>

        {/* 메인 콘텐츠: TodoList 단일 렌더링 (Tab 전환 기능 삭제) */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <TodoList />
        </div>
        
      </GlassWrapper>
    </aside>
  );
};

export default Sidebar;