"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import { format } from 'date-fns';
import { Clock, Tag } from 'lucide-react';

interface AddEventFormProps {
  onSuccess: () => void;
}

const COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#a855f7' },
];

const AddEventForm: React.FC<AddEventFormProps> = ({ onSuccess }) => {
  const { addEvent, selectedDate } = useEventsContext();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [color, setColor] = useState(COLORS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addEvent({
      id: crypto.randomUUID(),
      title,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time,
      category: 'General',
      color,
      isCompleted: false,
    });

    // 저장 성공 후 부모(SlidePanel)에게 닫기 신호를 보냄
    onSuccess();
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
          className="w-full bg-white/30 border border-white/40 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
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
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setColor(c.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c.value ? 'border-slate-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c.value }}
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

export default AddEventForm;