// src/components/ui/WindowControls.tsx
"use client";

import React from 'react';
import { X, Minus, Settings } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

const WindowControls = () => {
  const { setIsSettingsOpen } = useSettings();

  const handleClose = () => {
    if (confirm("프로그램을 종료하시겠습니까?")) {
      window.close();
    }
  };

  return (
    <div className="flex items-center gap-1.5 px-4">
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/40 border border-white/60 text-slate-400 hover:text-slate-800 transition-all active:scale-90"
      >
        <Settings size={14} />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/40 border border-white/60 text-slate-400 hover:bg-white/80 transition-all">
        <Minus size={14} />
      </button>
      <button 
        onClick={handleClose}
        className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50/40 border border-red-100/60 text-red-400 hover:bg-red-500 hover:text-white transition-all"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default WindowControls;