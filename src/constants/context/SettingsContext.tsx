// src/context/SettingsContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SettingsContextType {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  resetAllData: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const resetAllData = useCallback(() => {
    if (confirm("모든 데이터를 초기화하시겠습니까?")) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);
  return (
    <SettingsContext.Provider value={{ isSettingsOpen, setIsSettingsOpen, resetAllData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};