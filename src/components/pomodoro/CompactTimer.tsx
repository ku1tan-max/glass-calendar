'use client';

import React, { useState, useEffect } from 'react';

// CompactTimer: 집중 시간을 관리하는 소형 타이머 컴포넌트
const CompactTimer = () => {
  const [seconds, setSeconds] = useState(1500); // 초기값 25분
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center">
      <div className="text-2xl font-mono text-white mb-2">{formatTime(seconds)}</div>
      <div className="flex gap-2">
        <button 
          onClick={() => setIsActive(!isActive)}
          className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200 hover:bg-blue-500/30"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(1500); }}
          className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/50 hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CompactTimer;