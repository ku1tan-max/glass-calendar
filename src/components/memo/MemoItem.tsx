"use client";

import React from 'react';
import { Memo } from '@/types';
import { Trash2, Pin } from 'lucide-react';
import { format } from 'date-fns';

interface MemoItemProps {
  memo: Memo;
  onSelect: (memo: Memo) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
}

const MemoItem: React.FC<MemoItemProps> = ({ memo, onSelect, onDelete, onPin }) => {
  return (
    <div 
      className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
        memo.isPinned ? 'bg-blue-50/50 border-blue-100' : 'bg-white/40 border-white/20'
      }`}
      onClick={() => onSelect(memo)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          {format(new Date(memo.updatedAt), 'MM.dd HH:mm')}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); onPin(memo.id); }}
            className={`p-1.5 rounded-md ${memo.isPinned ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Pin size={14} fill={memo.isPinned ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(memo.id); }}
            className="p-1.5 rounded-md text-slate-400 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
        {memo.content || "빈 메모"}
      </p>
    </div>
  );
};

export default MemoItem;