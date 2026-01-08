"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format, addYears } from 'date-fns'; // [보완] addYears 추가
import { Clock, Tag, X, Calendar as CalendarIcon, AlignLeft } from 'lucide-react';
import { DEFAULT_CATEGORIES, RecurrenceType } from '@/types';
import RecurrencePicker from './RecurrencePicker';

/* --- 1. SidebarAddForm: 빠른 입력을 위한 간결한 폼 (변동 없음) --- */
export const SidebarAddForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CATEGORIES[1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time,
      categoryId: selectedCat.id,
      category: selectedCat.name,
      color: selectedCat.color,
      isCompleted: false,
    });

    if (onSuccess) onSuccess();
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-1">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="새로운 할 일..."
        className="w-full bg-white border border-slate-200 p-4 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
      />
      <div className="flex gap-3">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 bg-white border border-slate-200 p-3 rounded-xl text-sm font-bold text-slate-700 focus:outline-none"
        />
        <div className="flex items-center gap-2 px-3 bg-white border border-slate-200 rounded-xl">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`w-5 h-5 rounded-full transition-all ${selectedCat.id === cat.id ? 'scale-125 ring-2 ring-slate-400' : 'opacity-40'}`}
              style={{ backgroundColor: cat.color }}
            />
          ))}
        </div>
      </div>
      <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all">
        빠른 추가
      </button>
    </form>
  );
};

/* --- 2. DetailedAddForm: 종료일 설정 로직이 통합된 상세 폼 --- */
export const DetailedAddForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CATEGORIES[1]);
  const [desc, setDesc] = useState('');
  
  // [보완] 반복 설정 및 종료일 상태
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none');
  const [endDate, setEndDate] = useState(format(addYears(selectedDate, 1), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      endDate: recurrence !== 'none' ? endDate : undefined, // [지시 반영] 반복일 때만 종료일 포함
      time,
      categoryId: selectedCat.id,
      category: selectedCat.name,
      color: selectedCat.color,
      isCompleted: false,
      description: desc,
      recurrence: recurrence
    });

    if (onSuccess) onSuccess();
    setTitle('');
    setRecurrence('none');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="일정 제목을 입력하세요"
        className="w-full bg-white border-b-2 border-slate-100 p-2 text-xl font-black text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <CalendarIcon size={12} /> 일자
          </label>
          <div className="p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 border border-slate-100">
            {format(selectedDate, 'yyyy년 MM월 dd일')}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Clock size={12} /> 시각
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs font-bold text-slate-700 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* 반복 설정 컴포넌트 */}
      <RecurrencePicker value={recurrence} onChange={setRecurrence} />

      {/* [지시 반영] 반복 설정 시에만 나타나는 종료일 입력 섹션 */}
      {recurrence !== 'none' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
            <CalendarIcon size={12} /> 반복 종료일
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs font-bold text-slate-700 focus:border-blue-500 outline-none shadow-sm"
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <AlignLeft size={12} /> 상세 설명
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="메모를 입력하세요"
          className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs min-h-[80px] outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Tag size={12} /> 카테고리
        </span>
        <div className="flex gap-3">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`w-6 h-6 rounded-full transition-all ${selectedCat.id === cat.id ? 'scale-125 ring-2 ring-slate-300 shadow-sm' : 'opacity-30 hover:opacity-100'}`}
              style={{ backgroundColor: cat.color }}
            />
          ))}
        </div>
      </div>

      <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
        일정 등록하기
      </button>
    </form>
  );
};

/* --- 3. AddEventModal: 컨테이너 --- */
const AddEventModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[480px] max-w-[95vw] bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter text-left">일정 상세 등록</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <X size={24} />
          </button>
        </div>
        <DetailedAddForm onSuccess={onClose} />
      </div>
    </div>
  );
};

export default AddEventModal;