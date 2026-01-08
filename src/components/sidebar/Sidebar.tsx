// src/components/sidebar/Sidebar.tsx
"use client";

import React from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { Pin, MessageSquareQuote, Calendar, CheckSquare, Settings } from 'lucide-react';
import CompactTimer from '@/components/pomodoro/CompactTimer';
import TodoList from './TodoList';
import { useSettings } from '@/context/SettingsContext';

const Sidebar = () => {
  const { memos } = useEventsContext();
  const { setIsSettingsOpen } = useSettings();
  
  // 고정된 메모 필터링 및 정렬
  const pinnedMemos = memos
    .filter(m => m.isPinned)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <aside className="w-80 h-screen flex flex-col bg-white/10 backdrop-blur-md border-r border-white/20 p-6 overflow-hidden">
      {/* 1. 상단 로고/타이틀 영역 */}
      <div className="text-xl font-bold mb-8 px-2 text-white/90 tracking-tight">
        Glass Calendar
      </div>

      {/* 2. 내비게이션 메뉴 영역 */}
      <nav className="space-y-2 mb-8">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/20 text-white shadow-sm transition-all">
          <Calendar size={18} />
          <span className="font-medium">Calendar</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
          <CheckSquare size={18} />
          <span className="font-medium">Tasks</span>
        </button>
      </nav>

      {/* 3. 위젯 영역: 타이머 및 고정 메모 */}
      <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar flex-1">
        <section>
          <CompactTimer />
        </section>

        {pinnedMemos.length > 0 && (
          <section className="animate-in fade-in slide-in-from-right duration-500">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Pin size={14} className="text-blue-400 fill-current" />
              <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">
                고정된 지침
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              {pinnedMemos.slice(0, 1).map(memo => (
                <div 
                  key={memo.id}
                  className="group relative p-4 bg-white/10 border border-white/20 rounded-[1.5rem] backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <MessageSquareQuote size={16} className="absolute -top-2 -left-1 text-blue-300/50" />
                  <p className="text-xs text-white/80 leading-relaxed font-medium">
                    {memo.content.length > 80 ? `${memo.content.substring(0, 80)}...` : memo.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. 할 일 목록 (플렉스 성장형) */}
        <section className="flex-1 min-h-0">
          <TodoList />
        </section>
      </div>

      {/* 5. 하단 설정 영역 */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white transition-colors"
        >
          <Settings size={18} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;