// src/components/calendar/AddEventModal.tsx
"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format, addYears } from 'date-fns';
import { X, Clock, Repeat, Calendar as CalendarIcon } from 'lucide-react';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { RecurrenceType, DEFAULT_CATEGORIES } from '@/types';

const AddEventModal = () => {
  const { isEventModalOpen, setIsEventModalOpen, addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none');
  const [endDate, setEndDate] = useState(format(addYears(new Date(), 1), 'yyyy-MM-dd'));
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CATEGORIES[1]);

  if (!isEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      endDate: recurrence !== 'none' ? endDate : undefined,
      time,
      categoryId: selectedCat.id,
      category: selectedCat.name,
      color: selectedCat.color,
      isCompleted: false,
      recurrence
    });

    setIsEventModalOpen(false);
    setTitle('');
    setRecurrence('none');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <GlassWrapper className="w-full max-w-lg bg-white/70 p-8 shadow-2xl relative">
        <button onClick={() => setIsEventModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <header>
            <h2 className="text-xl font-black text-slate-800">새 법도 등록</h2>
            <p className="text-xs text-slate-400 font-bold">{format(selectedDate, 'yyyy년 MM월 dd일')} 집행 예정</p>
          </header>

          <input
            autoFocus
            type="text"
            placeholder="집행할 법도 명칭"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/50 border border-slate-200 p-4 rounded-2xl text-lg font-bold focus:outline-none focus:border-blue-500 transition-all shadow-inner"
          />

          <div className="grid grid-cols-2 gap-4">
             <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
                  <Clock size={12} /> 집행 시각
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/50 border border-slate-200 p-4 rounded-2xl text-sm font-bold focus:outline-none"
                />
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
                  <Repeat size={12} /> 반복 주기
                </label>
                <select 
                  value={recurrence} 
                  onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
                  className="w-full bg-white/50 border border-slate-200 p-4 rounded-2xl text-sm font-bold focus:outline-none appearance-none"
                >
                  <option value="none">반복 안함</option>
                  <option value="daily">매일</option>
                  <option value="weekly">매주</option>
                  <option value="monthly">매월</option>
                </select>
             </div>
          </div>

          {recurrence !== 'none' && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
                <CalendarIcon size={12} /> 반복 종료일
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 p-4 rounded-2xl text-sm font-bold focus:outline-none"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">인장 선택 (카테고리)</label>
            <div className="flex gap-2">
              {DEFAULT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold text-xs ${
                    selectedCat.id === cat.id ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
            법도에 추가
          </button>
        </form>
      </GlassWrapper>
    </div>
  );
};

export default AddEventModal;