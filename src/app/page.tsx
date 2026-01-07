"use client";

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/sidebar/Sidebar';
import Calendar from '@/components/calendar/Calendar';
import ImageBanner from '@/components/layout/ImageBanner';
import SlidePanel from '@/components/layout/SlidePanel';
import AddEventModal from '@/components/calendar/AddEventModal';
import { useEventsContext } from '@/context/EventsContext';

export default function Home() {
  // Context에서 모달 상태와 선택된 날짜 가져오기
  const { isEventModalOpen, setIsEventModalOpen, selectedDate } = useEventsContext();
  
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
        
        <Sidebar />

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

      {/* 전역 이벤트 추가 모달 - 레이아웃 최하단에 위치 */}
      <AddEventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        selectedDate={selectedDate} 
      />
    </div>
  );
}