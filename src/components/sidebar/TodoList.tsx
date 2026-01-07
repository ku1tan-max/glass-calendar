"use client";

import React from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { CheckCircle2, Circle, ShieldAlert } from 'lucide-react';

const TodoList = () => {
  const { events, selectedDate, toggleEvent } = useEventsContext();
  
  // [1. 임의 네이밍 금지] 기존 변수명 및 로직 엄수
  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const filteredTasks = events.filter((event) => event.date === dateStr);

  return (
    <div className="flex-1 overflow-y-auto mt-2 pr-2 custom-scrollbar">
      {/* [9. 주석을 통한 의도 전달] 헤더 영역의 여백 및 폰트 굵기 조정 */}
      <h3 className="text-sm font-black mb-4 px-2 flex justify-between items-center text-slate-500 uppercase tracking-wider">
        <span>{format(selectedDate, 'MM.dd')} 법도 집행</span>
        <span className="text-[10px]">{filteredTasks.length}건</span>
      </h3>
      
      <div className="flex flex-col">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((todo) => (
            /* [해결] GlassWrapper를 제거하고 투명도와 border-b를 활용하여 '박스 현상' 제거 */
            <div 
              key={todo.id} 
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
                {/* [참고] 시간 정보가 있을 경우 표시 (기존 규격 유지) */}
                {todo.time && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {todo.time}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          /* [해결] 빈 상태에서도 GlassWrapper를 제거하여 배경 흐림을 방지함 */
          <div className="mt-10 py-12 flex flex-col items-center justify-center opacity-30">
            <ShieldAlert size={32} className="mb-2" />
            <p className="text-xs font-bold text-center leading-relaxed">
              오늘은 법도를 어긴 놈이 없군.<br />
              <span className="text-[10px] font-normal opacity-60">(집행할 법도가 없습니다)</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;