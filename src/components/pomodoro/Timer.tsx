"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import GlassWrapper from '@/components/layout/GlassWrapper';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setShowModal(true);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft]);

  return (
    <>
      <GlassWrapper className="relative p-8 overflow-hidden border-white/30 bg-white/5">
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Deep Work Status</p>
          </div>
          <h2 className="text-7xl font-black tracking-tighter tabular-nums mb-6 drop-shadow-sm">
            {formatTime(timeLeft)}
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                isActive ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-slate-800 text-white shadow-lg'
              }`}
            >
              {isActive ? '집중 중단' : '집행 시작'}
            </button>
            <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="glass-button">
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </GlassWrapper>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <GlassWrapper className="max-w-md w-full p-10 text-center border-white/40 shadow-2xl">
            <h3 className="text-2xl font-black mb-4">법도 위반이다! 쉬는 시간이다!</h3>
            <button 
              onClick={() => { setShowModal(false); setTimeLeft(25 * 60); }}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold"
            >
              명심하겠습니다
            </button>
          </GlassWrapper>
        </div>
      )}
    </>
  );
};

export default Timer;