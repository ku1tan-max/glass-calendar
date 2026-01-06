// src/components/ui/CustomColorPicker.tsx
"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface CustomColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const PALETTE = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#64748B', // Slate
];

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ selectedColor, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {PALETTE.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onSelect(color)}
          className={`w-6 h-6 rounded-full transition-all hover:scale-110 flex items-center justify-center
            ${selectedColor === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''}`}
          style={{ backgroundColor: color }}
        >
          {selectedColor === color && <Check size={12} className="text-white" strokeWidth={3} />}
        </button>
      ))}
    </div>
  );
};

export default CustomColorPicker;