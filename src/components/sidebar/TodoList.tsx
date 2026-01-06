"use client";

import React from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { CheckCircle2, Circle, ShieldAlert } from 'lucide-react';

const TodoList = () => {
  const { events, selectedDate, toggleEvent } = useEventsContext();
  
  // 선택된 날짜 포맷팅
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  // 검열(필터링) 수행
  const filteredTasks = events.filter((event) => event.date === dateStr);

  return (
    <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
      <h3 className="text-lg font-bold mb-4 px-2 flex justify-between items-center">
        <span>{format(selectedDate, 'MM.dd')} 법도 집행</span>
        <span className="text-xs font-medium text-slate-400">{filteredTasks.length}건</span>
      </h3>
      
      <div className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((todo) => (
            <div 
              key={todo.id} 
              onClick={() => toggleEvent(todo.id)}
              className="cursor-pointer group animate-in fade-in slide-in-from-left duration-300"
            >
              <GlassWrapper className={`p-4 rounded-2xl flex items-center gap-3 transition-all ${todo.isCompleted ? 'bg-white/5' : 'bg-white/10 hover:bg-white/20'}`}>
                {todo.isCompleted ? (
                  <CheckCircle2 size={20} className="text-green-400" />
                ) : (
                  <Circle size={20} className="text-white/50 group-hover:text-white" />
                )}
                <span className={`text-sm font-medium ${todo.isCompleted ? 'line-through opacity-40' : 'text-slate-800'}`}>
                  {todo.title}
                </span>
              </GlassWrapper>
            </div>
          ))
        ) : (
          <GlassWrapper className="mt-10 py-12 flex flex-col items-center justify-center border-dashed border-white/10 bg-transparent">
            <ShieldAlert size={40} className="text-white/20 mb-4" />
            <p className="text-center text-white/40 text-sm font-bold leading-relaxed">
              오늘은 법도를 어긴 놈이 없군.<br />
              <span className="text-xs font-normal opacity-60">(할 일이 없습니다)</span>
            </p>
          </GlassWrapper>
        )}
      </div>
    </div>
  );
};

export default TodoList;