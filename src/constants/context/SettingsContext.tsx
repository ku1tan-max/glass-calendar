// src/context/SettingsContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SettingsContextType {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  appVersion: string;
  resetAllData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const appVersion = "1.0.0-beta.1";

  /**
   * [핵심 기능] 시스템 초기화
   * 로컬 스토리지의 모든 데이터를 삭제하고 페이지를 새로고침하여 초기 상태로 복구합니다.
   */
  const resetAllData = useCallback(() => {
    if (confirm("모든 법도 기록과 메모가 영구적으로 삭제됩니다. 계속하시겠습니까?")) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ 
      isSettingsOpen, 
      setIsSettingsOpen, 
      appVersion, 
      resetAllData 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};