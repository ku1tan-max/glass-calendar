"use client";

import React, { useState } from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, subMonths, addMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventsContext } from '@/context/EventsContext';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // [수정] 전역 상태 사용 (지역 상태 isModalOpen 삭제)
  const { events, getCategoryColor, setSelectedDate, setIsEventModalOpen } = useEventsContext();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="h-full flex flex-col glass-effect rounded-[2.5rem] bg-white/10 overflow-hidden shadow-2xl border border-white/20">
      {/* 캘린더 헤더 */}
      <div className="p-8 flex justify-between items-center bg-white/5">
        <h2 className="text-2xl font-black text-slate-800">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-white/20 rounded-full transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 요일 표시 */}
      <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">{day}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="flex-1 grid grid-cols-7 overflow-y-auto custom-scrollbar">
        {calendarDays.map((day) => {
          const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
          
          return (
            <div
              key={day.toString()}
              onClick={() => {
                setSelectedDate(day); // 전역 날짜 업데이트
                setIsEventModalOpen(true); // [수정] 전역 모달 상태를 true로 변경
              }}
              className={`min-h-[100px] p-2 border-b border-r border-white/5 transition-all cursor-pointer hover:bg-white/20
                ${!isSameMonth(day, monthStart) ? 'opacity-20' : 'opacity-100'}
                ${isSameDay(day, new Date()) ? 'bg-white/30' : ''}`}
            >
              <span className={`text-xs font-bold ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-slate-600'}`}>
                {format(day, 'd')}
              </span>
              
              {/* 일정 리스트 */}
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div 
                    key={event.id}
                    className="text-[9px] px-1.5 py-0.5 rounded-md text-white truncate font-medium shadow-sm"
                    style={{ backgroundColor: event.color || getCategoryColor(event.categoryId) }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[8px] text-slate-400 pl-1">외 {dayEvents.length - 3}건</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* [삭제] <AddEventModal /> - 여기서 띄우지 않고 Home(page.tsx)에서 전역적으로 관리합니다. */}
    </div>
  );
};

export default Calendar;