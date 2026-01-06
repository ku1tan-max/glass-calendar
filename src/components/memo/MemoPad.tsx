"use client";

import React from 'react';
import { useMemos } from './useMemos';
import { useEventsContext } from '@/context/EventsContext';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { PencilLine, Pin } from 'lucide-react';

export const MemoPad = () => {
  const { memo, setMemo } = useMemos();
  const { pinnedMemo, setPinnedMemo } = useEventsContext();

  // 메모 고정/해제 로직
  const togglePin = () => {
    // 이미 고정된 메모와 현재 내용이 같으면 해제, 다르면 현재 내용을 고정
    if (pinnedMemo === memo) {
      setPinnedMemo(null);
    } else {
      setPinnedMemo(memo);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 상단 헤더 영역 */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700">
          <PencilLine size={16} className="text-slate-400" /> 
          오늘의 기록
        </h3>
        
        {/* 고정 버튼 */}
        <button 
          onClick={togglePin}
          title={pinnedMemo === memo ? "고정 해제" : "사이드바 상단에 고정"}
          className={`p-2 rounded-lg transition-all duration-300 ${
            pinnedMemo === memo 
              ? 'bg-slate-800 text-white shadow-lg scale-110' 
              : 'bg-white/40 text-slate-400 hover:text-slate-600 hover:bg-white/60'
          }`}
        >
          <Pin size={14} className={pinnedMemo === memo ? "fill-current" : ""} />
        </button>
      </div>
      
      {/* 메모장 입력 영역 */}
      <GlassWrapper className="flex-1 bg-white/10 border-white/20 p-0 overflow-hidden shadow-inner">
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요."
          className="w-full h-full bg-transparent p-6 resize-none focus:outline-none text-slate-700 leading-relaxed placeholder:text-slate-400/50 custom-scrollbar"
        />
      </GlassWrapper>
    </div>
  );
};

export default MemoPad;