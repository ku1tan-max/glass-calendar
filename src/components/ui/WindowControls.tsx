// src/components/ui/WindowControls.tsx
"use client";

import React from 'react';
import { Settings, Minus, X } from 'lucide-react';
import { STRINGS } from '@/constants/strings';

interface WindowControlsProps {
  onOpenSettings?: () => void;
}

const WindowControls: React.FC<WindowControlsProps> = ({ onOpenSettings }) => {
  
  // Electron IPC 통신 함수 (예시)
  const handleClose = () => {
    console.log(STRINGS.WINDOW.CLOSE_CONFIRM);
    // if (window.electronAPI) window.electronAPI.close();
  };

  const handleMinimize = () => {
    // if (window.electronAPI) window.electronAPI.minimize();
  };

  const handleSettings = () => {
    if (onOpenSettings) {
      onOpenSettings();
    } else {
      console.log("설정 창 열기");
    }
  };

  return (
    <div className="flex items-center gap-2 group">
      {/* 1. 종료 (Red) */}
      <button 
        onClick={handleClose}
        className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] 
                   flex items-center justify-center shadow-inner
                   hover:brightness-90 active:scale-95 transition-all duration-200"
        aria-label="Close"
      >
        <X size={8} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
      </button>

      {/* 2. 최소화 (Yellow) */}
      <button 
        onClick={handleMinimize}
        className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]
                   flex items-center justify-center shadow-inner
                   hover:brightness-90 active:scale-95 transition-all duration-200"
        aria-label="Minimize"
      >
        <Minus size={8} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
      </button>

      {/* 3. 설정 (Green) - 전체화면 대신 설정창 호출로 변경 */}
      <button 
        onClick={handleSettings}
        className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]
                   flex items-center justify-center shadow-inner
                   hover:brightness-90 active:scale-95 transition-all duration-200"
        aria-label="Settings"
      >
        <Settings size={8} className="text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowControls;