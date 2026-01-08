"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { Clock, Tag, X, Calendar as CalendarIcon } from 'lucide-react';
import { DEFAULT_CATEGORIES } from '@/types';

/* --- 1. AddEventForm: 더 밝고 깨끗한 입력 폼 --- */
interface AddEventFormProps {
  onSuccess?: () => void;
}

export const AddEventForm: React.FC<AddEventFormProps> = ({ onSuccess }) => {
  const { addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CATEGORIES[1]);
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: time,
      categoryId: selectedCat.id,
      category: selectedCat.name,
      color: selectedCat.color,
      isCompleted: false,
      description: desc
    });

    if (onSuccess) onSuccess();
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">집행 제목</label>
        <input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="무엇을 집행할 것인가?"
          // 배경을 더 하얗게 (bg-white), 보더를 더 진하게 수정
          className="w-full bg-white border border-slate-200 p-4 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
            <CalendarIcon size={12} /> 일자
          </label>
          {/* 읽기 전용 박스도 더 하얗게 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600">
            {format(selectedDate, 'MM월 dd일')}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
            <Clock size={12} /> 시각
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
          <Tag size={12} /> 인장
        </label>
        <div className="flex gap-4 p-2 bg-slate-50/50 rounded-2xl border border-slate-100">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${selectedCat.id === cat.id ? 'border-slate-800 scale-110 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'}`}
              style={{ backgroundColor: cat.color }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all mt-4 tracking-widest"
      >
        법도에 추가
      </button>
    </form>
  );
};

/* --- 2. AddEventModal: 블러를 줄이고 화이트 톤을 강조한 모달 --- */
interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null; 
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center animate-in fade-in duration-200">
      {/* 배경 오버레이: 블러를 backdrop-blur-sm(4px)으로 낮춤, 어두운 정도 조절 */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* 모달 본체: 투명도를 줄이고 순수 화이트(bg-white)에 가깝게 설정 */}
      <div className="relative w-[420px] max-w-[95vw] bg-white border border-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in zoom-in-95 slide-in-from-top-4 duration-300">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">New Order</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">일정 하명</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
          >
            <X size={24} />
          </button>
        </div>
        
        <AddEventForm onSuccess={onClose} />
      </div>
    </div>
  );
};

export default AddEventModal;