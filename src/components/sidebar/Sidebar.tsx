// src/components/sidebar/Sidebar.tsx
"use client";

import React from 'react';
import { useMemos } from '@/components/memo/useMemos';
import { Pin, MessageSquareQuote } from 'lucide-react';
import SidebarTimer from '@/components/pomodoro/Timer';
import TodoList from './TodoList';

const Sidebar = () => {
  const { memos } = useMemos();
  
  // [지시 반영] 고정된 메모 필터링 (최신순)
  const pinnedMemos = memos.filter(m => m.isPinned).sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <aside className="w-80 h-full flex flex-col gap-6 p-6 overflow-hidden">
      {/* 1. 타이머 섹션 */}
      <section>
        <SidebarTimer />
      </section>

      {/* 2. [New] 고정 메모 섹션 (지시 반영) */}
      {pinnedMemos.length > 0 && (
        <section className="animate-in fade-in slide-in-from-right duration-500">
          <div className="flex items-center gap-2 mb-3 px-2">
            <Pin size={14} className="text-blue-500 fill-current" />
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">고정된 법도 지침</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {pinnedMemos.slice(0, 2).map(memo => (
              <div 
                key={memo.id}
                className="group relative p-4 bg-white/40 border border-white/60 rounded-[1.5rem] shadow-sm backdrop-blur-sm transition-all hover:bg-white/60"
              >
                <MessageSquareQuote size={16} className="absolute -top-2 -left-1 text-blue-200" />
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {/* [지시 반영] 최대 100자 제한 로직 */}
                  {memo.content.length > 100 
                    ? `${memo.content.substring(0, 100)}...` 
                    : memo.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. 할 일 목록 섹션 */}
      <section className="flex-1 flex flex-col min-h-0">
        <TodoList />
      </section>
    </aside>
  );
};

export default Sidebar;