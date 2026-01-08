// src/components/settings/SettingsModal.tsx
"use client";

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { X, RefreshCcw, Info, Settings } from 'lucide-react';

const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen, appVersion, resetAllData } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <GlassWrapper className="w-full max-w-md bg-white/60 p-8 shadow-2xl relative">
        {/* 닫기 버튼 */}
        <button 
          onClick={() => setIsSettingsOpen(false)}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col gap-8">
          <header className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 text-white rounded-2xl">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">시스템 설정</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Configuration</p>
            </div>
          </header>

          <div className="space-y-6">
            {/* 초기화 섹션 */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">위험 구역</label>
              <button 
                onClick={resetAllData}
                className="w-full py-4 px-6 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between group hover:bg-red-500 transition-all duration-300"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-red-600 group-hover:text-white transition-colors">시스템 초기화</span>
                  <span className="text-[10px] text-red-400 group-hover:text-red-100 transition-colors">모든 데이터 영구 삭제</span>
                </div>
                <RefreshCcw size={18} className="text-red-400 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
              </button>
            </div>

            {/* 정보 섹션 */}
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">프로그램 정보</label>
              <div className="p-5 bg-white/40 border border-white/60 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-600">
                  <Info size={16} />
                  <span className="text-xs font-bold">현재 버전</span>
                </div>
                <span className="text-xs font-mono font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                  v{appVersion}
                </span>
              </div>
            </div>
          </div>

          <footer className="pt-4 border-t border-white/40 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Glass Calendar &copy; 2026. All rights reserved.
            </p>
          </footer>
        </div>
      </GlassWrapper>
    </div>
  );
};

export default SettingsModal;