"use client";

import React from 'react';
import GlassWrapper from './GlassWrapper';
import Timer from '@/components/pomodoro/Timer';
import { MemoPad } from '@/components/memo';
// [수정] AddEventModal 대신 AddEventForm이라는 이름으로 가져옵니다.
import { AddEventForm } from '@/components/calendar/AddEventModal';
import { X } from 'lucide-react';


interface SlidePanelProps {
  isOpen: boolean;
  type: 'pomodoro' | 'todo' | 'memo' | null;
  onClose: () => void;
}

const SlidePanel: React.FC<SlidePanelProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const config = {
    pomodoro: { title: 'Focus Timer', component: <Timer /> },
    // 이제 위에서 AddEventForm으로 가져왔기 때문에 오류가 사라집니다.
todo: { title: 'New Task', component: <AddEventForm onSuccess={onClose} /> }, 
    memo: { title: 'Daily Memo', component: <MemoPad /> }
  };

  return (
    <div className="absolute left-[360px] top-6 bottom-6 z-40 w-96 animate-in slide-in-from-left-4 fade-in duration-300">
      <GlassWrapper className="h-full border-white/40 shadow-2xl p-0 flex flex-col overflow-hidden bg-white/40 backdrop-blur-2xl">
        <div className="p-5 border-b border-white/20 flex justify-between items-center bg-white/10">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-600">
            {config[type].title}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {config[type].component}
        </div>
      </GlassWrapper>
    </div>
  );
};

export default SlidePanel;