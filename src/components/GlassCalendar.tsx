"use client";

import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  CheckSquare, 
  StickyNote, 
  Calendar as CalendarIcon, 
  Settings, 
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function GlassCalendar() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [blurAmount, setBlurAmount] = useState(20);
  const [bgImage, setBgImage] = useState<string | null>(null);

  // 1. 메모리 해제 로직 보완 (Unmount 시 대응)
  useEffect(() => {
    return () => {
      if (bgImage) URL.revokeObjectURL(bgImage);
    };
  }, [bgImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (bgImage) URL.revokeObjectURL(bgImage);
      setBgImage(URL.createObjectURL(file));
    }
  };

  const todos = ["Next.js 레이아웃 완성하기", "글래스모피즘 디자인 적용", "포모도로 기능 테스트"];

  return (
    <div className="relative flex h-screen w-full overflow-hidden font-sans text-slate-800">
      
      {/* 배경 레이어 */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-700"
        style={{
          background: bgImage ? `url(${bgImage}) center/cover no-repeat` : 'linear-gradient(135deg, #fce7f3 0%, #e0e7ff 50%, #dcfce7 100%)',
          filter: `blur(${blurAmount}px)`,
          transform: 'scale(1.1)'
        }}
      />

      {/* 좌측 사이드바 */}
      <aside className="w-80 m-6 flex flex-col gap-6 z-10">
        <div className="glass-effect rounded-[2.5rem] p-6 flex flex-col h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
          <div className="grid grid-cols-3 gap-3 mb-10">
            <button 
              onClick={() => setIsFocusMode(!isFocusMode)} 
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${isFocusMode ? 'bg-white/40 shadow-inner' : 'bg-white/10 hover:bg-white/20'}`}
            >
              <Timer size={24} />
              <span className="text-[10px] mt-1 font-bold">포모도로</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
              <CheckSquare size={24} />
              <span className="text-[10px] mt-1 font-bold">투두</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
              <StickyNote size={24} />
              <span className="text-[10px] mt-1 font-bold">메모</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 px-2">Today's Tasks</h3>
            <div className="flex flex-col gap-3">
              {todos.map((todo, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-white/10">
                  <div className="w-5 h-5 border-2 border-slate-400 rounded-full" />
                  <span className="text-sm font-medium">{todo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* 우측 메인 영역 */}
      <main className="flex-1 m-6 ml-0 flex flex-col gap-6 transition-all duration-500 z-10">
        
        {/* 집중 모드 섹션 */}
        {isFocusMode && (
          <section className="glass-effect rounded-[2.5rem] p-8 bg-white/10 backdrop-blur-xl border border-white/20 animate-in slide-in-from-top fade-in duration-500">
            <div className="flex flex-col items-center justify-center py-6">
              <h2 className="text-6xl font-black mb-2 tracking-tighter">25:00</h2>
              <p className="text-slate-600 font-bold uppercase text-xs tracking-widest">Deep Work Session</p>
              <div className="flex gap-4 mt-6">
                <button className="px-8 py-2 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors">Start</button>
                <button onClick={() => setIsFocusMode(false)} className="px-8 py-2 bg-white/30 rounded-full font-bold hover:bg-white/40 transition-colors">Cancel</button>
              </div>
            </div>
          </section>
        )}

        {/* 캘린더 영역 */}
        <section className="flex-1 glass-effect rounded-[2.5rem] p-10 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black tracking-tight">January 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-white/20 rounded-xl hover:bg-white/40 transition-all"><ChevronLeft size={20} /></button>
              <button className="p-2 bg-white/20 rounded-xl hover:bg-white/40 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
          
          {/* 요일 헤더 (고정) */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center font-bold text-slate-500 text-xs uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* 날짜 그리드 (스크롤) */}
          <div className="flex-1 grid grid-cols-7 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/25 transition-all cursor-pointer min-h-[110px] flex flex-col justify-between group">
                <span className="font-bold text-lg">{i + 1}</span>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-0 group-hover:w-1/3 h-full bg-slate-400 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 설정 및 업로드 버튼 */}
      <div className="fixed bottom-10 right-10 group z-20">
        <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-2xl p-4 rounded-3xl w-52 shadow-2xl border border-white">
            <label className="text-[10px] font-black block mb-3 uppercase tracking-tighter text-slate-500">Background Blur</label>
            <input 
              type="range" min="0" max="40" value={blurAmount} 
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>
          <label className="flex items-center justify-center p-4 bg-white/80 backdrop-blur-2xl rounded-2xl cursor-pointer shadow-xl border border-white hover:bg-white transition-colors">
            <Upload size={20} className="mr-2 text-slate-700" />
            <span className="text-sm font-bold text-slate-700">Upload BG</span>
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </div>
        <button className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:rotate-90 transition-transform duration-500">
          <Settings size={28} />
        </button>
      </div>
    </div>
  );
}