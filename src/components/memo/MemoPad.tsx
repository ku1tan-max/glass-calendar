// src/components/memo/MemoPad.tsx
"use client";

import React, { useState } from 'react';
import { useMemos } from './useMemos';
import { useEventsContext } from '@/context/EventsContext';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { PencilLine, Plus, ChevronLeft, Save, Pin } from 'lucide-react';

export const MemoPad = () => {
  const { memos, addMemo, updateMemo, deleteMemo } = useMemos();
  const { pinnedMemo, setPinnedMemo } = useEventsContext(); // [기존 명칭 유지]
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState('');

  const handleSave = () => {
    if (activeMemoId) updateMemo(activeMemoId, tempContent);
    else addMemo(tempContent);
    setView('list');
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700">
          <PencilLine size={16} className="text-slate-400" /> 오늘의 기록
        </h3>
        <button 
          onClick={() => { setView('edit'); setActiveMemoId(null); setTempContent(''); }}
          className="p-2 bg-blue-600 text-white rounded-xl shadow-lg"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <GlassWrapper className="flex-1 bg-white/10 p-4 overflow-hidden">
        {view === 'list' ? (
          <div className="flex flex-col gap-3 h-full overflow-y-auto">
            {memos.map(m => (
              <div 
                key={m.id} 
                className="p-4 bg-white/40 rounded-2xl border border-white/20 relative group"
                onClick={() => { setView('edit'); setActiveMemoId(m.id); setTempContent(m.content); }}
              >
                <p className="text-sm text-slate-700 line-clamp-2">{m.content}</p>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    // [지시 반영] 100자 제한하여 사이드바 고정
                    setPinnedMemo(m.content.substring(0, 100)); 
                  }}
                  className={`absolute top-2 right-2 p-1 rounded-md ${pinnedMemo === m.content.substring(0, 100) ? 'text-blue-600' : 'text-slate-300'}`}
                >
                  <Pin size={12} fill={pinnedMemo === m.content.substring(0, 100) ? "currentColor" : "none"} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col gap-4">
             <textarea
                autoFocus
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                className="flex-1 bg-transparent resize-none focus:outline-none text-slate-700"
              />
              <button onClick={handleSave} className="w-full py-3 bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2">
                <Save size={16} /> 저장
              </button>
          </div>
        )}
      </GlassWrapper>
    </div>
  );
};