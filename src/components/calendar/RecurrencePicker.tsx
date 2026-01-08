// src/components/calendar/RecurrencePicker.tsx

"use client";

import React from 'react';
import { RecurrenceType } from '@/types';
import { Repeat } from 'lucide-react';

interface RecurrencePickerProps {
  value: RecurrenceType;
  onChange: (value: RecurrenceType) => void;
}

const RecurrencePicker: React.FC<RecurrencePickerProps> = ({ value, onChange }) => {
  const options: { label: string; val: RecurrenceType }[] = [
    { label: '안함', val: 'none' },
    { label: '매일', val: 'daily' },
    { label: '매주', val: 'weekly' },
    { label: '매월', val: 'monthly' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 ml-1">
        <Repeat size={12} /> 반복 설정
      </label>
      <div className="flex gap-2 p-1 bg-slate-50 border border-slate-100 rounded-2xl">
        {options.map((opt) => (
          <button
            key={opt.val}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${
              value === opt.val
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrencePicker;