// src/components/memo/MemoPad.tsx
"use client";

import React, { useState } from 'react';
import { useMemos } from './useMemos';
import { Memo } from '@/types';
import GlassWrapper from '@/components/layout/GlassWrapper';
import MemoItem from './MemoItem';
import { PencilLine, Plus, ChevronLeft, Save } from 'lucide-react';

export const MemoPad = () => {
  const { memos, addMemo, updateMemo, deleteMemo, togglePin } = useMemos();
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [activeMemo, setActiveMemo] = useState<Memo | null>(null);
  const [tempContent, setTempContent] = useState('');

  // 편집 시작
  const handleSelect = (memo: Memo) => {
    setActiveMemo(memo);
    setTempContent(memo.content);
    setView('edit');
  };

  // 새 메모 시작
  const handleNew = () => {
    setActiveMemo(null);
    setTempContent('');
    setView('edit');
  };

  // 저장 로직
  const handleSave = () => {
    if (!tempContent.trim()) {
      setView('list');
      return;
    }
    if (activeMemo) {
      updateMemo(activeMemo.id, tempContent);
    } else {
      addMemo(tempContent);
    }
    setView('list');
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700">
          <PencilLine size={16} className="text-slate-400" /> 
          {view === 'list' ? '기록 저장소' : '기록 집행'}
        </h3>
        {view === 'list' ? (
          <button onClick={handleNew} className="p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all">
            <Plus size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setView('list')} className="p-2 bg-white/40 text-slate-400 rounded-xl hover:text-slate-600">
              <ChevronLeft size={16} />
            </button>
            <button onClick={handleSave} className="p-2 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-900">
              <Save size={16} />
            </button>
          </div>
        )}
      </div>
      
      <GlassWrapper className="flex-1 bg-white/10 p-4 overflow-hidden shadow-inner">
        {view === 'list' ? (
          <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-1">
            {memos.length > 0 ? (
              memos
                .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)) // 핀 고정 상단 배치
                .map(m => (
                  <MemoItem 
                    key={m.id} 
                    memo={m} 
                    onSelect={handleSelect} 
                    onDelete={deleteMemo} 
                    onPin={togglePin} 
                  />
                ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-slate-400 font-bold italic">
                저장된 기록이 없습니다.
              </div>
            )}
          </div>
        ) : (
          <textarea
            autoFocus
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="기록을 남기십시오..."
            className="w-full h-full bg-transparent resize-none focus:outline-none text-slate-700 leading-relaxed custom-scrollbar p-2"
          />
        )}
      </GlassWrapper>
    </div>
  );
};

export default MemoPad;