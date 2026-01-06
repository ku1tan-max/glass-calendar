"use client";

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/sidebar/Sidebar';
import Calendar from '@/components/calendar/Calendar';
import ImageBanner from '@/components/layout/ImageBanner';
import SlidePanel from '@/components/layout/SlidePanel';

export default function Home() {
  const [activePanel, setActivePanel] = useState<'pomodoro' | 'todo' | 'memo' | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handlePanelToggle = (type: 'pomodoro' | 'todo' | 'memo') => {
    setActivePanel(prev => prev === type ? null : type);
  };

  return (
    // 전체 배경
    <div className="relative h-screen w-full flex flex-col overflow-hidden text-slate-900 bg-gradient-to-br from-[#fce7f3] via-[#e0e7ff] to-[#dcfce7]">
      
      <TopBar 
        activePanel={activePanel} 
        onPanelOpen={handlePanelToggle} 
      />

      <div className="flex flex-1 p-6 gap-6 overflow-hidden relative">
        
        <Sidebar 
        />

        <SlidePanel 
          isOpen={!!activePanel} 
          type={activePanel} 
          onClose={() => setActivePanel(null)} 
        />

        {/* 메인 영역: min-w-0을 주어야 자식인 Calendar가 부모를 뚫고 나가지 않습니다. */}
        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <div className="mb-6">
            <ImageBanner />
          </div>
          <div className="flex-1 min-h-0">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}