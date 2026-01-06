"use client";

import React from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { CheckCircle2, Circle, ShieldAlert } from 'lucide-react';

const TodoList = () => {
  const { events, selectedDate, toggleEvent } = useEventsContext();
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const filteredTasks = events.filter((event) => event.date === dateStr);

  return (
    <div className="flex-1 overflow-y-auto mt-2 pr-2 custom-scrollbar">
      <div className="flex flex-col">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((todo) => (
            <div 
              key={todo.id} 
              onClick={() => toggleEvent(todo.id)}
              className="flex items-center gap-4 py-4 px-2 cursor-pointer group transition-all border-b border-white/5 last:border-0 hover:bg-white/5 rounded-xl"
            >
              {todo.isCompleted ? (
                <CheckCircle2 size={18} className="text-green-500/60" />
              ) : (
                <Circle size={18} className="text-slate-400 group-hover:text-slate-600" />
              )}
              <span className={`text-sm font-medium transition-all ${
                todo.isCompleted ? 'line-through text-slate-400 opacity-50' : 'text-slate-700'
              }`}>
                {todo.title}
              </span>
              <span className="ml-auto text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {todo.time}
              </span>
            </div>
          ))
        ) : (
          <div className="mt-10 py-12 flex flex-col items-center justify-center opacity-30">
            <ShieldAlert size={32} className="mb-2" />
            <p className="text-xs font-bold">오늘은 법도를 어긴 놈이 없군.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;