// src/components/memo/MemoPad.tsx
"use client";

import React, { useState } from 'react';
import { useEventsContext } from '@/context/EventsContext';
import GlassWrapper from '@/components/layout/GlassWrapper';
import { PencilLine, Plus, ChevronLeft, Save, Pin, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export const MemoPad = () => {
  const { memos, addMemo, updateMemo, deleteMemo, togglePin } = useEventsContext();
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [activeMemoId, setActiveMemoId] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState('');

  const handleEdit = (id: string, content: string) => {
    setActiveMemoId(id);
    setTempContent(content);
    setView('edit');
  };

  const handleSave = () => {
    if (!tempContent.trim()) { setView('list'); return; }
    if (activeMemoId) updateMemo(activeMemoId, tempContent);
    else addMemo(tempContent);
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
          <button 
            onClick={() => { setView('edit'); setActiveMemoId(null); setTempContent(''); }}
            className="p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={16} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setView('list')} 
              className="p-2 bg-white/40 text-slate-400 rounded-xl hover:text-slate-600 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleSave} 
              className="p-2 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-slate-900 transition-all active:scale-95"
            >
              <Save size={16} />
            </button>
          </div>
        )}
      </div>
      
      <GlassWrapper className="flex-1 bg-white/10 p-4 overflow-hidden shadow-inner">
        {view === 'list' ? (
          <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-1">
            {memos.length > 0 ? (
              [...memos]
                .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                .map((m) => (
                  <div 
                    key={m.id}
                    className={`group relative p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                      m.isPinned ? 'bg-blue-50/50 border-blue-100' : 'bg-white/40 border-white/20'
                    }`}
                    onClick={() => handleEdit(m.id, m.content)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {format(new Date(m.updatedAt), 'MM.dd HH:mm')}
                      </span>
                      <div className="flex gap-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); togglePin(m.id); }}
                          className={`p-1.5 rounded-md transition-all ${
                            m.isPinned 
                              ? 'text-blue-600 bg-blue-100 opacity-100' 
                              : 'text-slate-400 hover:bg-white/60 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <Pin size={14} fill={m.isPinned ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteMemo(m.id); }}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                      {m.content}
                    </p>
                  </div>
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