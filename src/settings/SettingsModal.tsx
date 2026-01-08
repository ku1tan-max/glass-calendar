import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SettingsModal: 앱의 환경설정을 변경하는 팝업창
const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[500px] bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="hover:text-white/60">✕</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Glass Intensity</span>
            <input type="range" className="accent-blue-500" />
          </div>
          <div className="flex justify-between items-center">
            <span>Show Week Numbers</span>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;