"use client";

import React from 'react';
import { Timer, CheckSquare, StickyNote } from 'lucide-react';
import { STRINGS } from '@/constants/strings';

interface TopBarProps {
  activePanel: string | null;
  onPanelOpen: (type: 'pomodoro' | 'todo' | 'memo') => void;
}

const TopBar: React.FC<TopBarProps> = ({ activePanel, onPanelOpen }) => {
  // --- [9. 주석] Electron IPC 전송 함수 정의 ---
  const handleControl = (command: string) => {
    // nodeIntegration: true 환경에서 전역 require 사용 가능 여부 체크
    if (typeof window !== 'undefined' && (window as any).require) {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send(command);
    }
  };

  return (
    <div className="w-full h-12 glass-effect bg-white/20 backdrop-blur-md border-b border-white/30 flex items-center justify-between px-4 z-[100] select-none" style={{ WebkitAppRegion: 'drag' } as any}>
      
      {/* 좌측: 애플 스타일 3색 버튼 (no-drag 영역 설정 필수) */}
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
        {/* 빨강: 종료 */}
        <div 
          onClick={() => handleControl('window-close')}
          className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] cursor-pointer hover:brightness-90 transition-all" 
          title={STRINGS.WINDOW.CLOSE} 
        />
        {/* 노랑: 최소화 */}
        <div 
          onClick={() => handleControl('window-minimize')}
          className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] cursor-pointer hover:brightness-90 transition-all" 
          title={STRINGS.WINDOW.MINIMIZE} 
        />
        {/* 초록: 설정/전환 */}
        <div 
          onClick={() => handleControl('window-settings')}
          className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] cursor-pointer hover:brightness-90 transition-all" 
          title={STRINGS.WINDOW.SETTINGS} 
        />
      </div>

      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button onClick={() => onPanelOpen('pomodoro')} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${activePanel === 'pomodoro' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'}`}>
          <Timer size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.FOCUS}</span>
        </button>

        <button onClick={() => onPanelOpen('todo')} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${activePanel === 'todo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'}`}>
          <CheckSquare size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.TODO}</span>
        </button>

        <button onClick={() => onPanelOpen('memo')} className={`p-2 rounded-lg transition-all flex items-center gap-2 ${activePanel === 'memo' ? 'bg-white/40 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/10'}`}>
          <StickyNote size={18} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{STRINGS.TOPBAR.MEMO}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;