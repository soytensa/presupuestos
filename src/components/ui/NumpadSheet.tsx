'use client';

import React from 'react';
import { Delete, Check, X } from 'lucide-react';

interface NumpadSheetProps {
  isOpen: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onChange: (value: string) => void;
}

export function NumpadSheet({ isOpen, title, value, onClose, onChange }: NumpadSheetProps) {
  if (!isOpen) return null;

  const handleNumber = (num: string) => {
    let newValue = value;
    if (value === '0' && num !== ',') {
      newValue = num;
    } else {
      if (num === ',') {
        if (!value.includes('.')) {
          newValue = value + '.';
        }
      } else {
        const parts = value.split('.');
        if (parts[1] && parts[1].length >= 2) return;
        newValue = value + num;
      }
    }
    onChange(newValue);
  };

  const handleDelete = () => {
    if (value.length <= 1) {
      onChange('0');
    } else {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0e1a]/80 backdrop-blur-3xl border-t border-primary/20 rounded-t-[32px] p-8 pb-14 z-50 animate-in slide-in-from-bottom-full duration-500 shadow-[0_-10px_40px_rgba(125,211,252,0.1)]">
        
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest ml-1">{title}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{value.replace('.', ',')}</span>
              <span className="text-xl text-surface-variant font-bold uppercase tracking-widest">m</span>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-surface-variant transition-colors mb-2">
            <X size={20} />
          </button>
        </div>

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="h-20 flex items-center justify-center text-4xl font-bold bg-white/5 rounded-[24px] hover:bg-white/10 active:bg-primary active:text-black active:scale-95 transition-all text-white border border-white/5"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleNumber(',')}
            className="h-20 flex items-center justify-center text-5xl font-black bg-white/5 rounded-[24px] hover:bg-white/10 active:bg-primary active:text-black active:scale-95 transition-all text-surface-variant border border-white/5"
          >
            ,
          </button>
          <button
            onClick={() => handleNumber('0')}
            className="h-20 flex items-center justify-center text-4xl font-bold bg-white/5 rounded-[24px] hover:bg-white/10 active:bg-primary active:text-black active:scale-95 transition-all text-white border border-white/5"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-20 flex items-center justify-center bg-white/5 border border-white/5 text-surface-variant rounded-[24px] hover:bg-white/10 active:text-red-400 active:scale-95 transition-all"
          >
            <Delete size={32} />
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-10 w-full h-20 glacier-btn flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
          <span className="font-bold uppercase tracking-widest text-sm">Confirmar</span>
          <Check strokeWidth={4} size={28} />
        </button>
      </div>
    </>
  );
}
