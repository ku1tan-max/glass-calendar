"use client";

import React from 'react';
import { Timer, CheckSquare, StickyNote } from 'lucide-react';
import { STRINGS } from '@/constants/strings';

interface TopBarProps {
  activePanel: string | null;
  onPanelOpen: (type: 'pomodoro' | 'todo' | 'memo') => void;
}

const TopBar: React.FC<TopBarProps> = ({ activePanel, onPanelOpen }) => {
  return (
    // [기반 시스템] WebkitAppRegion: 'drag' 설정을 통해 프레임리스 창 이동 보장
    <div className="w-full h-12 glass-effect bg-white/20 backdrop-blur-md border-b border-white/30 flex items-center justify-between px-4 z-[100] select-none" style={{ WebkitAppRegion: 'drag' } as any}>
      
      {/* [Phase 1 복구] 좌측: 애플 스타일 3색 창 제어 버튼 (no-drag 영역) */}
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] cursor-pointer hover:brightness-90 transition-all" title={STRINGS.WINDOW.CLOSE} />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] cursor-pointer hover:brightness-90 transition-all" title={STRINGS.WINDOW.MINIMIZE} />
        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] cursor-pointer hover:brightness-90 transition-all" title={STRINGS.WINDOW.SETTINGS} />
      </div>

      {/* 우측: 기능 버튼 영역 (STRINGS 모듈 적용) */}
      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button 
          onClick={() => onPanelOpen('pomodoro')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'pomodoro' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <Timer size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.FOCUS}</span>
        </button>

        <button 
          onClick={() => onPanelOpen('todo')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'todo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <CheckSquare size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.TODO}</span>
        </button>

        <button 
          onClick={() => onPanelOpen('memo')}
          className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
            activePanel === 'memo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'
          }`}
        >
          <StickyNote size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.MEMO}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;