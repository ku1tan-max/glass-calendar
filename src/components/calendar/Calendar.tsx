"use client";

import React, { useState } from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, subMonths, addMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEventsContext } from '@/context/EventsContext'; // 명칭 유지
import AddEventModal from './AddEventModal';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events, getCategoryColor, selectedDate, setSelectedDate } = useEventsContext();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="h-full flex flex-col glass-effect rounded-[2.5rem] bg-white/10 overflow-hidden shadow-2xl border border-white/20">
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

      <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">{day}</div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 overflow-y-auto custom-scrollbar">
        {calendarDays.map((day) => {
          // 날짜 비교 오류 수정: e.date가 문자열일 경우와 Date 객체일 경우를 모두 고려
          const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
          
          return (
            <div
              key={day.toString()}
              onClick={() => {
                setSelectedDate(day);
                setIsModalOpen(true);
              }}
              className={`min-h-[100px] p-2 border-b border-r border-white/5 transition-all cursor-pointer hover:bg-white/20
                ${!isSameMonth(day, monthStart) ? 'opacity-20' : 'opacity-100'}
                ${isSameDay(day, new Date()) ? 'bg-white/30' : ''}`}
            >
              <span className={`text-xs font-bold ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-slate-600'}`}>
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div 
                    key={event.id}
                    className="text-[9px] px-1.5 py-0.5 rounded-md text-white truncate font-medium"
                    style={{ backgroundColor: getCategoryColor(event.categoryId) }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;