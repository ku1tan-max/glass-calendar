"use client";

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/sidebar/Sidebar';
import Calendar from '@/components/calendar/Calendar';
import ImageBanner from '@/components/layout/ImageBanner';
import SlidePanel from '@/components/layout/SlidePanel';

export default function Home() {
  // 1. 패널 관리 상태
  const [activePanel, setActivePanel] = useState<'pomodoro' | 'todo' | 'memo' | null>(null);
  
  // 2. [추가] 사이드바에 전달할 집중 모드 상태 정의
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handlePanelToggle = (type: 'pomodoro' | 'todo' | 'memo') => {
    setActivePanel(prev => prev === type ? null : type);
  };

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden text-slate-900 bg-gradient-to-br from-[#fce7f3] via-[#e0e7ff] to-[#dcfce7]">
      {/* 1. 상단 바 */}
      <TopBar 
        activePanel={activePanel} 
        onPanelOpen={handlePanelToggle} 
      />

      <div className="flex flex-1 p-6 gap-6 overflow-hidden relative">
        
        {/* 2. 사이드바: 이제 isFocusMode 상태를 정상적으로 전달합니다. */}
        <Sidebar 
          isFocusMode={isFocusMode} 
          onFocusModeToggle={() => setIsFocusMode(!isFocusMode)} 
        />

        {/* 3. 슬라이드 패널 */}
        <SlidePanel 
          isOpen={!!activePanel} 
          type={activePanel} 
          onClose={() => setActivePanel(null)} 
        />

        {/* 4. 메인 영역 */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ImageBanner />
          <div className="flex-1 min-h-0">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}