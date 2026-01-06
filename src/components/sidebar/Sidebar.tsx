"use client";

import React, { useState } from 'react';
import { Timer as TimerIcon, CheckSquare, StickyNote, Pin, Clock } from 'lucide-react';
import GlassWrapper from '@/components/layout/GlassWrapper';
import TodoList from './TodoList';
import MemoPad from '../memo/MemoPad';
import { useEventsContext } from '@/context/EventsContext';

// Props 타입 정의 (Home에서 전달받는 포커스 토글 기능 유지)
interface SidebarProps {
  onFocusModeToggle: () => void;
  isFocusMode: boolean;
}

type Tab = 'todo' | 'memo';

const Sidebar: React.FC<SidebarProps> = ({ onFocusModeToggle, isFocusMode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('todo');
  const { isTimerRunning, timerTime, pinnedMemo } = useEventsContext();

  // 초 단위를 MM:SS 포맷으로 변경
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <aside className="w-80 flex flex-col h-full z-10 shrink-0">
      <GlassWrapper className="flex flex-col h-full p-6 bg-white/25 border-white/30 overflow-hidden">
        
        {/* 2. Pinned Section: 타이머 작동 중이거나 고정 메모 존재 시 등장 */}
        {(isTimerRunning || pinnedMemo) && (
          <div className="mb-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Pin size={10} /> Pinned
            </span>
            
            <div className="flex flex-col gap-2">
              {/* 타이머 고정 표시 */}
              {isTimerRunning && (
                <div className="flex items-center justify-between bg-slate-900/5 p-3 rounded-xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-600" />
                    <span className="text-xs font-bold text-slate-700">Focus Session</span>
                  </div>
                  <span className="text-sm font-black tabular-nums">{formatTime(timerTime)}</span>
                </div>
              )}

              {/* 메모 고정 표시 */}
              {pinnedMemo && (
                <div className="bg-white/30 p-3 rounded-xl border border-white/40 shadow-sm">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
                    "{pinnedMemo}"
                  </p>
                </div>
              )}
            </div>
            <div className="h-[1px] bg-slate-900/5 my-2" />
          </div>
        )}

        {/* 3. 섹션 타이틀 */}
        <div className="mb-4 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {activeTab === 'todo' ? 'Task Overview' : 'Quick Notes'}
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            {activeTab === 'todo' ? 'Today' : 'Memo'}
          </h2>
        </div>

        {/* 4. 메인 콘텐츠 (스크롤 가능 영역) */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {activeTab === 'todo' ? <TodoList /> : <MemoPad />}
        </div>
        
      </GlassWrapper>
    </aside>
  );
};

export default Sidebar;