"use client";

import React from 'react';
import GlassWrapper from './GlassWrapper';

const ImageBanner = () => {
  return (
    <div className="w-full h-48 mb-6 animate-in fade-in duration-700">
      <GlassWrapper className="w-full h-full p-0 overflow-hidden border-white/30">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" 
          alt="Banner"
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
        />
        {/* 배너 위 텍스트 (옵션) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end p-6">
          <p className="text-white text-sm font-bold tracking-widest uppercase opacity-60">Eternal Glass View</p>
        </div>
      </GlassWrapper>
    </div>
  );
};

export default ImageBanner;