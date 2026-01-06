"use client";

import React from 'react';
import { useMemos } from './useMemos';
import { useEventsContext } from '@/context/EventsContext'; // 올바른 훅 가져오기
import GlassWrapper from '@/components/layout/GlassWrapper';
import { PencilLine, Pin } from 'lucide-react';

export const MemoPad = () => {
  const { memo, setMemo } = useMemos();
  const { pinnedMemo, setPinnedMemo } = useEventsContext(); // useEventsContext 사용

  const togglePin = () => {
    if (pinnedMemo === memo) {
      setPinnedMemo(null);
    } else {
      setPinnedMemo(memo);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700">
          <PencilLine size={16} className="text-slate-400" /> 
          오늘의 기록
        </h3>
        <button 
          onClick={togglePin}
          className={`p-2 rounded-lg transition-all duration-300 ${
            pinnedMemo === memo 
              ? 'bg-slate-800 text-white shadow-lg' 
              : 'bg-white/40 text-slate-400 hover:text-slate-600'
          }`}
        >
          <Pin size={14} className={pinnedMemo === memo ? "fill-current" : ""} />
        </button>
      </div>
      
      <GlassWrapper className="flex-1 bg-white/10 p-0 overflow-hidden shadow-inner">
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요."
          className="w-full h-full bg-transparent p-6 resize-none focus:outline-none text-slate-700 leading-relaxed custom-scrollbar"
        />
      </GlassWrapper>
    </div>
  );
};

export default MemoPad;