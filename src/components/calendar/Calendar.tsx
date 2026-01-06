"use client";

import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventsContext } from '@/context/EventsContext'; // 컨텍스트 임포트
import GlassWrapper from '@/components/layout/GlassWrapper';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // 전역 상태에서 데이터와 제어 함수 가져오기
  const { events, selectedDate, setSelectedDate } = useEventsContext();

  // 헤더 렌더링 (월 이동)
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900">{format(currentMonth, 'MMMM')}</h2>
        <p className="text-slate-500 font-medium">{format(currentMonth, 'yyyy')}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="glass-button w-10 h-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="glass-button w-10 h-10">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // 요일 표시
  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day) => (
          <div key={day} className="text-center font-bold text-slate-400 text-xs uppercase tracking-widest">{day}</div>
        ))}
      </div>
    );
  };

  // 날짜 그리드 표시
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="flex-1 grid grid-cols-7 gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {calendarDays.map((day, idx) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayEvents = events.filter(e => e.date === dateStr);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(day)} // 전역 날짜 변경
              className={`group relative min-h-[100px] p-3 rounded-[1.5rem] cursor-pointer transition-all duration-300 flex flex-col justify-between border
                ${!isCurrentMonth ? 'opacity-20' : 'opacity-100'}
                ${isSelected 
                  ? 'bg-white/40 border-white/60 shadow-lg scale-[1.02] z-10' 
                  : 'bg-white/5 border-white/10 hover:bg-white/20 hover:border-white/30'}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                  {format(day, 'd')}
                </span>
                {isToday && (
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                )}
              </div>
              
              {/* 일정 인디케이터 */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {dayEvents.slice(0, 3).map((event) => (
                  <div 
                    key={event.id}
                    className="h-1 w-full rounded-full"
                    style={{ backgroundColor: event.color || '#cbd5e1' }}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[10px] text-slate-400 font-bold">+{dayEvents.length - 3}</span>
                )}
              </div>

              {/* 선택 시 강조 효과 (글래스 글로우) */}
              {isSelected && (
                <div className="absolute inset-0 rounded-[1.5rem] bg-white/10 blur-[10px] -z-10" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="flex-1 flex flex-col h-full overflow-hidden">
      <GlassWrapper className="flex-1 flex flex-col h-full overflow-hidden border-white/20 p-8">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </GlassWrapper>
    </section>
  );
};

export default Calendar;