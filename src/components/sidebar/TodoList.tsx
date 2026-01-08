// src/components/sidebar/TodoList.tsx
"use client";

import React from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { CheckCircle2, Circle, ShieldAlert } from 'lucide-react';
import { getEventsForDate } from '@/utils/dateUtils';

const TodoList = () => {
  const { events, selectedDate, toggleEvent } = useEventsContext();
  
  // 단순해진 필터링 로직 (진짜 데이터만 반환)
  const filteredTasks = getEventsForDate(events, selectedDate);

  return (
    <div className="flex-1 overflow-y-auto mt-2 pr-2 custom-scrollbar">
      <h3 className="text-sm font-black mb-4 px-2 flex justify-between items-center text-slate-500 uppercase tracking-wider">
        <span>{format(selectedDate, 'MM.dd')} 법도 집행</span>
        <span className="text-[10px]">{filteredTasks.length}건</span>
      </h3>
      
      <div className="flex flex-col">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((todo) => (
            <div 
              key={todo.id} 
              // 단순해진 클릭 핸들러 (ID만 전달)
              onClick={() => toggleEvent(todo.id)}
              className="flex items-center gap-4 py-4 px-2 cursor-pointer group transition-all border-b border-white/5 last:border-0 hover:bg-white/5 rounded-xl animate-in fade-in slide-in-from-left duration-300"
            >
              {todo.isCompleted ? (
                <CheckCircle2 size={18} className="text-green-500/60" />
              ) : (
                <Circle size={18} className="text-slate-400 group-hover:text-slate-600" />
              )}
              
              <div className="flex flex-col gap-0.5">
                <span className={`text-sm font-medium transition-all ${
                  todo.isCompleted ? 'line-through text-slate-400 opacity-50' : 'text-slate-700'
                }`}>
                  {todo.title}
                </span>
                {todo.time && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {todo.time}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-10 py-12 flex flex-col items-center justify-center opacity-30">
            <ShieldAlert size={32} className="mb-2" />
            <p className="text-xs font-bold text-center leading-relaxed">집행할 법도가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;