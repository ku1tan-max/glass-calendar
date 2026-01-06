"use client";

import React from 'react';

interface GlassWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const GlassWrapper: React.FC<GlassWrapperProps> = ({ children, className = "" }) => {
    return (
        /* 기본 텍스트 색상을 Slate-900으로 지정 */
        <div className={`glass-effect rounded-[2.5rem] text-slate-900 transition-all duration-300 ${className}`}>
        {children}
    </div>
  );
};

export default GlassWrapper;