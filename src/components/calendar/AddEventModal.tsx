"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { Clock, Tag, X } from 'lucide-react';
import { DEFAULT_CATEGORIES } from '@/types';

/* --- 1. AddEventForm: 실제 입력 폼 (SlidePanel 등에서 사용) --- */
interface AddEventFormProps {
  onSuccess?: () => void;
}

export const AddEventForm: React.FC<AddEventFormProps> = ({ onSuccess }) => {
  const { addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CATEGORIES[1]); // 기본 '일반' 선택

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // [10. 자가 점검] CalendarEvent 인터페이스 규격에 맞춰 모든 필수 필드 전달
    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: time,             // [해결] time 변수를 명시적으로 할당
      categoryId: selectedCat.id,
      category: selectedCat.name,
      color: selectedCat.color,
      isCompleted: false,
    });

    if (onSuccess) onSuccess();
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-tighter">할 일 제목</label>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="무엇을 집행할 것인가?"
          className="w-full bg-white/30 border border-white/40 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-tighter flex items-center gap-1">
          <Clock size={12} /> 집행 시간
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-white/30 border border-white/40 p-4 rounded-2xl focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-tighter flex items-center gap-1">
          <Tag size={12} /> 인장 색상
        </label>
        <div className="flex gap-3 p-2">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${selectedCat.id === cat.id ? 'border-slate-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: cat.color }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black shadow-xl hover:bg-slate-700 active:scale-95 transition-all mt-4"
      >
        법도에 추가
      </button>
    </form>
  );
};

/* --- 2. AddEventModal: 팝업 래퍼 (Calendar 등에서 사용) --- */
interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null; 
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // [해결] isOpen Props 기반 렌더링 제어

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-[400px] glass-effect bg-white/40 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">일정 하명</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>
        <AddEventForm onSuccess={onClose} />
      </div>
    </div>
  );
};

export default AddEventModal;