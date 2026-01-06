"use client";

import React from 'react';
import { Timer, CheckSquare, StickyNote, Minus, Square, X } from 'lucide-react';

interface TopBarProps {
  activePanel: string | null;
  onPanelOpen: (type: 'pomodoro' | 'todo' | 'memo') => void;
}

const TopBar: React.FC<TopBarProps> = ({ activePanel, onPanelOpen }) => {
  return (
    <div className="w-full h-12 glass-effect bg-white/20 backdrop-blur-md border-b border-white/30 flex items-center justify-between px-6 z-[100]">
      {/* 좌측: 제어 버튼들 */}
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPanelOpen('pomodoro')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'pomodoro' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <Timer size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">Focus</span>
        </button>
        
        <div className="w-[1px] h-4 bg-slate-800/10 mx-2" />

        <button 
          onClick={() => onPanelOpen('todo')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'todo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <CheckSquare size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">Todo Add</span>
        </button>

        <button 
          onClick={() => onPanelOpen('memo')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'memo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <StickyNote size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">Memo</span>
        </button>
      </div>

      {/* 우측: 시스템 아이콘 */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-slate-400 hover:text-slate-900"><Minus size={16} /></button>
        <button className="p-2 text-slate-400 hover:text-slate-900"><Square size={14} /></button>
        <button className="p-2 text-slate-400 hover:text-red-500"><X size={18} /></button>
      </div>
    </div>
  );
};

export default TopBar;